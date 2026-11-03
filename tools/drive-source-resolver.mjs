#!/usr/bin/env node
// Google Drive + Sheets metadata bridge. READ-ONLY. Requires a locally supplied
// OAuth token scoped to spreadsheets.readonly and drive.metadata.readonly.
// Does not download document bodies, change Google files or write to GitHub.
import process from "node:process";
import {
  parseRegistryRows, resolveRecord, compareRemote, toSourcePointer
} from "./drive-registry-core.mjs";
import { parseSelections, selectWorkflowSources, buildWorkflowHandoff } from "./drive-workflow-bridge.mjs";
import { assessChangeImpact } from "./drive-change-impact.mjs";
import { reconcileReviewQueue } from "./drive-review-queue.mjs";
import { parseOutputSourceIds, prepareOutputIntake } from "./drive-output-onboarding.mjs";

const FOLDER_MIME = "application/vnd.google-apps.folder";
const MAX_ROWS = 1000;
const DEFAULT_MAX_ITEMS = 1500;

function parseArgs(args) {
  const command = args[0];
  if (!["resolve", "audit", "discover", "handoff", "impact", "review", "onboard-output"].includes(command))
    throw new Error("USAGE: resolve|audit|discover|handoff|impact|review|onboard-output --sheet-id ID [--id DOCUMENT_ID | --type TYPE] [--workflow WORKFLOW_ID] [--select TYPE=DOCUMENT_ID]");
  const values = {};
  for (let i = 1; i < args.length; i += 2) {
    const flag = args[i];
    if (!flag?.startsWith("--") || !args[i + 1] || args[i + 1].startsWith("--"))
      throw new Error("INVALID_ARGUMENT_PAIR");
    const key = flag.slice(2);
    if (!["sheet-id", "id", "type", "root-folder-id", "max-items", "workflow", "select", "mode", "file-id", "document-id", "output-type", "allowed-folder-id", "source-ids"].includes(key) ||
        Object.hasOwn(values, key)) throw new Error("UNKNOWN_OR_DUPLICATE_FLAG: " + flag);
    values[key] = args[i + 1];
  }
  if (!values["sheet-id"]) throw new Error("MISSING_SHEET_ID");
  if (command === "resolve" && Boolean(values.id) === Boolean(values.type))
    throw new Error("RESOLVE_REQUIRES_ID_OR_TYPE");
  if (command === "discover" && !values["root-folder-id"])
    throw new Error("DISCOVER_REQUIRES_ROOT_FOLDER_ID");
  if (command === "handoff") {
    if (!values.workflow) throw new Error("HANDOFF_REQUIRES_WORKFLOW");
    if (values.id || values.type || values["root-folder-id"] || values["max-items"])
      throw new Error("HANDOFF_UNSUPPORTED_FLAG");
  } else if (values.workflow || values.select) {
    throw new Error("WORKFLOW_FLAGS_ONLY_FOR_HANDOFF");
  }
  if (["impact", "review"].includes(command) && (values.id || values.type))
    throw new Error("IMPACT_OR_REVIEW_DOES_NOT_ACCEPT_ID_OR_TYPE");
  if (values.mode && (!["review", "onboard-output"].includes(command) ||
      !["summary", "details"].includes(values.mode)))
    throw new Error("MODE_MUST_BE_SUMMARY_OR_DETAILS");
  if (command === "onboard-output") {
    if (!values["file-id"] || !values["document-id"] ||
        !values["root-folder-id"] || !values["allowed-folder-id"])
      throw new Error("ONBOARD_OUTPUT_REQUIRED_FIELDS");
    if (values.id || values.type || values.workflow || values.select || values["max-items"])
      throw new Error("ONBOARD_OUTPUT_UNSUPPORTED_FLAGS");
  } else if (values["file-id"] || values["document-id"] ||
      values["output-type"] || values["allowed-folder-id"] || values["source-ids"])
    throw new Error("ONBOARD_FLAGS_ONLY_FOR_ONBOARD_OUTPUT");
  if (!["impact","review","audit","discover","onboard-output"].includes(command) &&
      (values["root-folder-id"] || values["max-items"]))
    throw new Error("FOLDER_FLAGS_NOT_SUPPORTED");
  if (values["max-items"] && !values["root-folder-id"])
    throw new Error("MAX_ITEMS_REQUIRES_ROOT_FOLDER_ID");
  return { command, values };
}

function googleId(value, kind) {
  if (/^[A-Za-z0-9_-]{15,}$/.test(value)) return value;
  let url;
  try { url = new URL(value); }
  catch { throw new Error("INVALID_" + kind + "_ID"); }
  const acceptableHost = kind === "SHEET" ? "docs.google.com" : "drive.google.com";
  if (url.protocol !== "https:" || url.hostname !== acceptableHost)
    throw new Error("INVALID_" + kind + "_URL");
  const match = kind === "SHEET"
    ? url.pathname.match(/^\/spreadsheets\/d\/([A-Za-z0-9_-]+)/)
    : url.pathname.match(/^\/drive\/folders\/([A-Za-z0-9_-]+)/);
  if (!match) throw new Error("INVALID_" + kind + "_URL");
  return match[1];
}

async function getJson(url, token, allow404 = false) {
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    signal: AbortSignal.timeout(25000),
    redirect: "error",
    cache: "no-store"
  });
  if (allow404 && response.status === 404) return null;
  if (!response.ok) {
    // Do not print remote response bodies: provider error text can be sensitive.
    throw new Error("GOOGLE_API_HTTP_" + response.status);
  }
  return response.json();
}

async function loadRegistry(sheetId, token) {
  const base = "https://sheets.googleapis.com/v4/spreadsheets/" + encodeURIComponent(sheetId);
  const meta = await getJson(base + "?fields=sheets(properties(title,gridProperties(rowCount)))", token);
  const tab = (meta.sheets || []).find(s => s.properties?.title === "Documents");
  if (!tab) throw new Error("DOCUMENTS_TAB_NOT_FOUND");
  const capacity = tab.properties?.gridProperties?.rowCount;
  // Fail closed rather than silently ignoring rows beyond our bounded read.
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > MAX_ROWS)
    throw new Error("REGISTRY_ROW_CAPACITY_EXCEEDED");
  const range = encodeURIComponent("Documents!A1:P" + capacity);
  const url = base + "/values/" + range + "?valueRenderOption=UNFORMATTED_VALUE";
  const body = await getJson(url, token);
  return parseRegistryRows(body.values || []);
}

async function loadReviewQueue(sheetId, token) {
  const base = "https://sheets.googleapis.com/v4/spreadsheets/" + encodeURIComponent(sheetId);
  const meta = await getJson(base + "?fields=sheets(properties(title,gridProperties(rowCount)))", token);
  const tab = (meta.sheets || []).find(s => s.properties?.title === "Review Queue");
  if (!tab) throw new Error("REVIEW_QUEUE_TAB_NOT_FOUND");
  const capacity = tab.properties?.gridProperties?.rowCount;
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > MAX_ROWS)
    throw new Error("REVIEW_QUEUE_ROW_CAPACITY_EXCEEDED");
  const range = encodeURIComponent("Review Queue!A1:M" + capacity);
  const body = await getJson(base + "/values/" + range +
    "?valueRenderOption=UNFORMATTED_VALUE", token);
  return body.values || [];
}

async function fetchMetadata(fileId, token) {
  const url = new URL("https://www.googleapis.com/drive/v3/files/" +
    encodeURIComponent(fileId));
  url.searchParams.set("fields", "id,name,mimeType,modifiedTime,trashed,parents,webViewLink,version");
  url.searchParams.set("supportsAllDrives", "true");
  return getJson(url.toString(), token, true);
}

async function verifyOutputAncestry(remote, projectRootId, token) {
  // Traverse actual Drive parents, not filename or client-supplied folder paths.
  // The report folder and project root are independently checked by the pure
  // prepareOutputIntake gate; shortcuts and ambiguous parent chains are rejected.
  const ids = [];
  const seen = new Set([remote.id]);
  let current = remote;
  for (let depth = 0; depth < 32; depth++) {
    if (!Array.isArray(current.parents) || current.parents.length !== 1)
      throw new Error("OUTPUT_PARENT_CHAIN_MISSING_OR_AMBIGUOUS");
    const parentId = current.parents[0];
    if (seen.has(parentId)) throw new Error("CYCLIC_PARENT_CHAIN");
    seen.add(parentId);
    ids.push(parentId);
    if (parentId === projectRootId) return ids;
    const parent = await fetchMetadata(parentId, token);
    if (!parent || parent.trashed || parent.mimeType !== FOLDER_MIME)
      throw new Error("OUTPUT_PARENT_FOLDER_UNVERIFIED");
    current = parent;
  }
  throw new Error("OUTPUT_NOT_WITHIN_SCOPED_PROJECT_ROOT");
}

async function mapLimit(list, concurrency, callback) {
  const result = Array(list.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(list.length, concurrency) }, async () => {
    while (next < list.length) {
      const index = next++;
      try { result[index] = await callback(list[index]); }
      catch (error) {
        result[index] = { error: error.message || "UNKNOWN_METADATA_ERROR" };
      }
    }
  });
  await Promise.all(workers);
  return result;
}

async function inventory(rootFolderId, token, maxItems) {
  const folders = [rootFolderId];
  const visited = new Set();
  const files = [];
  while (folders.length) {
    const folder = folders.shift();
    if (visited.has(folder)) continue;
    visited.add(folder);
    let page = "";
    do {
      const url = new URL("https://www.googleapis.com/drive/v3/files");
      url.searchParams.set("q", "'" + folder + "' in parents and trashed = false");
      url.searchParams.set("fields", "nextPageToken,files(id,name,mimeType,modifiedTime,parents)");
      url.searchParams.set("pageSize", "1000");
      url.searchParams.set("supportsAllDrives", "true");
      url.searchParams.set("includeItemsFromAllDrives", "true");
      if (page) url.searchParams.set("pageToken", page);
      const payload = await getJson(url.toString(), token);
      for (const file of payload.files || []) {
        if (file.mimeType === FOLDER_MIME) folders.push(file.id);
        else files.push(file);
        if (files.length + folders.length + visited.size > maxItems)
          throw new Error("INVENTORY_LIMIT_REACHED_NO_COMPLETENESS_CLAIM");
      }
      page = payload.nextPageToken || "";
    } while (page);
  }
  return files.sort((a, b) => a.id.localeCompare(b.id));
}

function output(value) {
  process.stdout.write(JSON.stringify(value, null, 2) + "\n");
}

async function main() {
  const { command, values } = parseArgs(process.argv.slice(2));
  const token = process.env.GOOGLE_ACCESS_TOKEN;
  if (!token) throw new Error("GOOGLE_ACCESS_TOKEN_REQUIRED");
  const sheetId = googleId(values["sheet-id"], "SHEET");
  const records = await loadRegistry(sheetId, token);
  if (command === "onboard-output") {
    const fileId = values["file-id"];
    const projectRootId = googleId(values["root-folder-id"], "FOLDER");
    const allowedFolderId = googleId(values["allowed-folder-id"], "FOLDER");
    if (!/^[A-Za-z0-9_-]{15,}$/.test(fileId))
      throw new Error("INVALID_ONBOARD_FILE_ID");
    const remote = await fetchMetadata(fileId, token);
    if (!remote || remote.trashed) throw new Error("ONBOARD_FILE_UNAVAILABLE");
    const ancestry = await verifyOutputAncestry(remote, projectRootId, token);
    const candidate = prepareOutputIntake(records, remote, {
      documentId: values["document-id"],
      outputType: values["output-type"] || "REPORT",
      sourceIds: parseOutputSourceIds(values["source-ids"] || ""),
      projectRootId, allowedFolderId, ancestorIds: ancestry
    });
    if ((values.mode || "summary") === "summary") {
      output({
        operation: "onboard-output", status: candidate.status,
        metadata_and_folder_scope_validated: true,
        proposed_source_count: candidate.source_ids.length,
        registry_write_performed: false,
        content_reviewed: false,
        detail_available_with_mode: "details",
        message: "Candidate only. Human review required before private Registry insertion."
      });
    } else {
      output(candidate);
    }
    process.exitCode = 2; // Content review and source lineage remain outstanding.
    return;
  }
  if (command === "impact" || command === "review") {
    // Metadata-only change check: no edits or automatic review decisions.
    const observedPairs = await mapLimit(records, 4, async record => {
      try {
        const remote = await fetchMetadata(record.drive_file_id, token);
        return [record.document_id, remote];
      } catch {
        return [record.document_id, { error: "METADATA_CHECK_FAILED" }];
      }
    });
    const report = assessChangeImpact(records, Object.fromEntries(observedPairs));
    let unindexed = null;
    if (values["root-folder-id"]) {
      const rootId = googleId(values["root-folder-id"], "FOLDER");
      const maxItems = values["max-items"] === undefined
        ? DEFAULT_MAX_ITEMS : Number(values["max-items"]);
      if (!Number.isInteger(maxItems) || maxItems < 1 || maxItems > 5000)
        throw new Error("INVALID_MAX_ITEMS");
      const known = new Set(records.map(r => r.drive_file_id));
      known.add(sheetId);
      const observed = await inventory(rootId, token, maxItems);
      unindexed = observed.filter(file => !known.has(file.id)).map(file => ({
        drive_file_id: file.id, name: file.name,
        state: "NOT_REGISTERED_REVIEW_REQUIRED"
      }));
    }
    report.operation = command;
    report.unindexed_files = unindexed;
    report.inventory_performed = unindexed !== null;
    if (unindexed?.length && report.check_status === "NO_METADATA_CHANGE_SIGNAL")
      report.check_status = "REVIEW_REQUIRED";
    if (command === "impact") {
      output(report);
      if (report.check_status !== "NO_METADATA_CHANGE_SIGNAL") process.exitCode = 2;
      return;
    }
    // Review queue is the only review state. This command generates a
    // read-only preview; no queue row, status or source is ever written.
    const queueRows = await loadReviewQueue(sheetId, token);
    const preview = reconcileReviewQueue(report, queueRows, new Date().toISOString());
    if ((values.mode || "summary") === "summary") {
      output({
        operation: "review", status: preview.status, summary: preview.summary,
        queue_write_performed: false, document_write_performed: false,
        private_detail_available_with_mode: "details",
        message: "Summary only; review candidates and private file IDs are not printed."
      });
    } else {
      output(preview);
    }
    if (preview.status !== "NO_NEW_REVIEW_ITEMS") process.exitCode = 2;
    return;
  }
  if (command === "handoff") {
    const plan = selectWorkflowSources(records, values.workflow, parseSelections(values.select || ""));
    const checks = await mapLimit(plan.matched, 4, async item => {
      try {
        const remote = await fetchMetadata(item.record.drive_file_id, token);
        return [item.record.document_id, compareRemote(item.record, remote)];
      } catch {
        return [item.record.document_id, "METADATA_CHECK_FAILED"];
      }
    });
    const handoff = buildWorkflowHandoff(plan, Object.fromEntries(checks));
    output(handoff);
    if (handoff.status !== "POINTERS_READY_FOR_CONTENT_REVIEW") process.exitCode = 2;
    return;
  }
  if (command === "resolve") {
    const record = resolveRecord(records, { id: values.id, type: values.type });
    const remote = await fetchMetadata(record.drive_file_id, token);
    const state = compareRemote(record, remote);
    output({
      operation: "resolve", status: state === "METADATA_MATCH_ONLY" ? "FOUND_METADATA_ONLY" : "NEEDS_REVIEW",
      source: toSourcePointer(record, state),
      remote_metadata_checked: true,
      note: "Pointer only; document content, legal applicability and approval are not validated."
    });
    if (state !== "METADATA_MATCH_ONLY") process.exitCode = 2;
    return;
  }

  const checks = await mapLimit(records, 4, async record => {
    try {
      const remote = await fetchMetadata(record.drive_file_id, token);
      return { document_id: record.document_id, state: compareRemote(record, remote) };
    } catch {
      // Keep identity of every failed check; never silently omit the document.
      return { document_id: record.document_id, state: "METADATA_CHECK_FAILED" };
    }
  });
  const findings = checks.filter(item => item.state !== "METADATA_MATCH_ONLY");
  const incomplete = findings.some(item => item.state === "METADATA_CHECK_FAILED");
  let unindexed = null;
  if (values["root-folder-id"]) {
    const rootId = googleId(values["root-folder-id"], "FOLDER");
    const maxItems = values["max-items"] === undefined
      ? DEFAULT_MAX_ITEMS : Number(values["max-items"]);
    if (!Number.isInteger(maxItems) || maxItems < 1 || maxItems > 5000)
      throw new Error("INVALID_MAX_ITEMS");
    const known = new Set(records.map(r => r.drive_file_id));
    known.add(sheetId); // Registry must not report itself as an unindexed source.
    const discovered = await inventory(rootId, token, maxItems);
    unindexed = discovered.filter(item => !known.has(item.id)).map(item => ({
      drive_file_id: item.id, name: item.name, mime_type: item.mimeType,
      state: "NOT_REGISTERED_REVIEW_REQUIRED"
    }));
  }
  output({
    operation: command, status: incomplete ? "INCOMPLETE_METADATA_CHECK" :
      findings.length || unindexed?.length ? "NEEDS_REVIEW" : "METADATA_ONLY_CLEAN",
    indexed_documents: records.length, matched_metadata: checks.length - findings.length,
    findings, unindexed_files: unindexed, inventory_performed: unindexed !== null,
    note: "Inventory does not imply completeness of documents outside the selected root. No content or approval audit."
  });
  if (findings.length || unindexed?.length) process.exitCode = 2;
}

main().catch(error => {
  process.stderr.write(JSON.stringify({ error: error.code || error.message || "UNKNOWN_ERROR" }) + "\n");
  process.exitCode = 1;
});
