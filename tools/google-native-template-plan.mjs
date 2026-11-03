// Pure, Google-native template planning. No network, OAuth, persistence or approvals.
// Private project data and Google file IDs belong only in an authorized Drive Registry.
export class TemplatePlanError extends Error {
  constructor(code) { super(code); this.name = 'TemplatePlanError'; this.code = code; }
}
const fail = code => { throw new TemplatePlanError(code); };
const MIME = Object.freeze({
  GOOGLE_DOCS: 'application/vnd.google-apps.document',
  GOOGLE_SHEETS: 'application/vnd.google-apps.spreadsheet',
  GOOGLE_SLIDES: 'application/vnd.google-apps.presentation'
});
export const TEMPLATE_MASTER_COLUMNS = Object.freeze([
  'template_id', 'template_version', 'master_file_id', 'mime_type',
  'master_status', 'authority', 'source_document_id', 'project_scope',
  'observed_modified_time', 'reviewer_ref'
]);
const simpleId = v => typeof v === 'string' && /^[a-z][a-z0-9._-]{3,90}$/.test(v);
const versionOk = v => typeof v === 'string' && /^\d+\.\d+\.\d+$/.test(v);
const remoteId = v => typeof v === 'string' && /^[A-Za-z0-9_-]{15,}$/.test(v);
const object = v => v && typeof v === 'object' && !Array.isArray(v);
const isIso = v => typeof v === 'string' && !Number.isNaN(Date.parse(v)) && /(?:Z|[+-]\d\d:\d\d)$/.test(v);
const fieldName = v => typeof v === 'string' && /^[a-z][a-z0-9_]{1,48}$/.test(v);
const token = v => typeof v === 'string' && /^\{\{[A-Z][A-Z0-9_]*\}\}$/.test(v);
const a1Cell = v => typeof v === 'string' && /^[A-Z]{1,3}[1-9][0-9]{0,5}$/.test(v);
const validTypes = new Set(['text', 'date', 'integer', 'money']);

export function parseTemplateMasters(matrix) {
  if (!Array.isArray(matrix) || !Array.isArray(matrix[0]) ||
      TEMPLATE_MASTER_COLUMNS.some((c, i) => matrix[0][i] !== c) ||
      matrix[0].length !== TEMPLATE_MASTER_COLUMNS.length) fail('INVALID_TEMPLATE_MASTER_HEADER');
  const seen = new Set();
  return matrix.slice(1).filter(row => Array.isArray(row) && row.some(v => v !== ''))
    .map(row => {
      if (row.length > TEMPLATE_MASTER_COLUMNS.length) fail('INVALID_TEMPLATE_MASTER_ROW');
      const r = Object.fromEntries(TEMPLATE_MASTER_COLUMNS.map((key, i) => [key, String(row[i] ?? '').trim()]));
      if (!simpleId(r.template_id) || !versionOk(r.template_version) ||
          !remoteId(r.master_file_id) || !Object.values(MIME).includes(r.mime_type) ||
          !['READY', 'NEEDS_REVIEW', 'RETIRED'].includes(r.master_status) ||
          !['INTERNAL', 'OFFICIAL_FORMAT'].includes(r.authority) ||
          !r.project_scope || !isIso(r.observed_modified_time)) fail('INVALID_TEMPLATE_MASTER_ROW');
      if (r.authority === 'OFFICIAL_FORMAT' && (!r.source_document_id || !r.reviewer_ref))
        fail('OFFICIAL_TEMPLATE_PROVENANCE_REQUIRED');
      const key = r.template_id + '@' + r.template_version + ':' + r.project_scope;
      if (seen.has(key)) fail('DUPLICATE_TEMPLATE_MASTER');
      seen.add(key);
      return Object.freeze(r);
    });
}

export function validateTemplateCatalog(catalog) {
  if (!object(catalog) || catalog.schema_version !== 'google-native-v1' ||
      !Array.isArray(catalog.templates) || !catalog.templates.length) fail('INVALID_TEMPLATE_CATALOG');
  const seen = new Set();
  for (const t of catalog.templates) {
    if (!object(t) || !simpleId(t.id) || !versionOk(t.version) || !MIME[t.kind] ||
        !t.owner_skill || !t.source_contract || !object(t.fields)) fail('INVALID_TEMPLATE_SPEC');
    if (seen.has(t.id + '@' + t.version)) fail('DUPLICATE_TEMPLATE_SPEC');
    seen.add(t.id + '@' + t.version);
    for (const [key, def] of Object.entries(t.fields)) {
      if (!fieldName(key) || !object(def) || !validTypes.has(def.type) || typeof def.required !== 'boolean')
        fail('INVALID_TEMPLATE_FIELD');
    }
    if (t.kind === 'GOOGLE_DOCS' || t.kind === 'GOOGLE_SLIDES') {
      if (!object(t.text_bindings) ||
          Object.keys(t.text_bindings).length !== Object.keys(t.fields).length ||
          Object.entries(t.text_bindings).some(([key, value]) => !t.fields[key] || !token(value)))
        fail('INVALID_TEXT_BINDINGS');
      if (new Set(Object.values(t.text_bindings)).size !== Object.keys(t.text_bindings).length)
        fail('DUPLICATE_TEXT_PLACEHOLDER');
    } else {
      if (!object(t.cell_bindings) || !Array.isArray(t.table_bindings) ||
          Object.keys(t.cell_bindings).length !== Object.keys(t.fields).length)
        fail('INVALID_SHEETS_BINDINGS');
      const slots = new Set();
      for (const [key, dest] of Object.entries(t.cell_bindings)) {
        if (!t.fields[key] || !object(dest) || !dest.sheet || !a1Cell(dest.cell)) fail('INVALID_CELL_BINDING');
        const slot = dest.sheet + '!' + dest.cell;
        if (slots.has(slot)) fail('DUPLICATE_CELL_BINDING');
        slots.add(slot);
      }
      const tableNames = new Set();
      for (const table of t.table_bindings) {
        if (!object(table) || !fieldName(table.key) || !table.sheet || !a1Cell(table.start_cell) ||
            !Number.isInteger(table.max_rows) || table.max_rows < 1 || table.max_rows > 500 ||
            !Array.isArray(table.columns) || !table.columns.length || table.columns.length > 26 ||
            table.columns.some(col => !object(col) || !fieldName(col.key) || !validTypes.has(col.type) || typeof col.required !== 'boolean'))
          fail('INVALID_TABLE_BINDING');
        if (tableNames.has(table.key) || new Set(table.columns.map(c => c.key)).size !== table.columns.length)
          fail('DUPLICATE_TABLE_BINDING');
        tableNames.add(table.key);
      }
    }
  }
  return catalog;
}

function valueFor(value, type, required) {
  if (value == null || value === '') {
    if (required) fail('REQUIRED_VALUE_MISSING');
    return '';
  }
  if (typeof value !== 'string' || value.length > 15000 || value.includes('{{') || value.includes('}}'))
    fail('UNSAFE_OR_INVALID_FIELD_VALUE');
  if (type === 'text') return value;
  if (type === 'date') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
        Number.isNaN(Date.parse(value + 'T00:00:00Z')) ||
        new Date(value + 'T00:00:00Z').toISOString().slice(0, 10) !== value) fail('INVALID_DATE');
    return value;
  }
  if (!/^(0|[1-9][0-9]*)$/.test(value) || BigInt(value) > 999999999999999n) fail('INVALID_INTEGER');
  return value;
}

export function prepareTemplate({catalog, masterRows, templateId, version, projectScope,
  sourceDocumentIds = [], values, masterMetadata}) {
  validateTemplateCatalog(catalog);
  if (!simpleId(templateId) || !versionOk(version) || typeof projectScope !== 'string' || !projectScope)
    fail('INVALID_TEMPLATE_SELECTION');
  const spec = catalog.templates.find(t => t.id === templateId && t.version === version);
  if (!spec) fail('TEMPLATE_NOT_IN_CATALOG');
  const candidates = parseTemplateMasters(masterRows).filter(m => m.template_id === templateId &&
    m.template_version === version && (m.project_scope === projectScope || m.project_scope === 'GLOBAL'));
  if (candidates.length !== 1) fail(candidates.length ? 'AMBIGUOUS_TEMPLATE_SCOPE' : 'MASTER_NOT_REGISTERED');
  const master = candidates[0];
  if (master.master_status !== 'READY') fail('MASTER_NOT_READY');
  if (master.mime_type !== MIME[spec.kind]) fail('MASTER_MIME_MISMATCH');
  if (!object(masterMetadata) || masterMetadata.id !== master.master_file_id ||
      (masterMetadata.mimeType ?? masterMetadata.mime_type) !== master.mime_type || masterMetadata.trashed ||
      (masterMetadata.modifiedTime ?? masterMetadata.modified_time) !== master.observed_modified_time)
    fail('MASTER_METADATA_UNVERIFIED_OR_CHANGED');
  if (master.authority === 'OFFICIAL_FORMAT') fail('OFFICIAL_FORMAT_REQUIRES_DOMAIN_REVIEW');
  if (!object(values) || !object(values.fields)) fail('INVALID_TEMPLATE_INPUT');
  if (!Array.isArray(sourceDocumentIds) || sourceDocumentIds.some(id => typeof id !== 'string' || !/^[A-Z][A-Z0-9-]{2,90}$/.test(id)))
    fail('INVALID_SOURCE_REFERENCES');
  const fields = {};
  for (const [key, def] of Object.entries(spec.fields))
    fields[key] = valueFor(values.fields[key], def.type, def.required);
  if (Object.keys(values.fields).some(key => !Object.hasOwn(spec.fields, key))) fail('UNKNOWN_INPUT_FIELD');
  const tables = {};
  for (const def of spec.table_bindings || []) {
    const rows = values.tables?.[def.key];
    if (!Array.isArray(rows) || rows.length > def.max_rows) fail('TABLE_MISSING_OR_TOO_LARGE');
    tables[def.key] = rows.map(row => {
      if (!object(row) || Object.keys(row).some(key => !def.columns.some(c => c.key === key)))
        fail('INVALID_TABLE_ROW');
      return def.columns.map(c => valueFor(row[c.key], c.type, c.required));
    });
  }
  if (values.tables && (!object(values.tables) || Object.keys(values.tables).some(k => !Object.hasOwn(tables, k))))
    fail('UNKNOWN_INPUT_TABLE');
  // Immutable plan is a DRAFT. It never constitutes source verification or approval.
  return {status:'DRAFT_PREFLIGHT', template_id:templateId, version, kind:spec.kind,
    master_file_id:master.master_file_id, mime_type:master.mime_type, source_document_ids:[...new Set(sourceDocumentIds)],
    internal_status:'DRAFT', external_status:'UNKNOWN', spec, fields, tables};
}

function cellCoordinates(cell) {
  const match = cell.match(/^([A-Z]+)([0-9]+)$/);
  let col = 0;
  for (const c of match[1]) col = col * 26 + c.charCodeAt(0) - 64;
  return {rowIndex: Number(match[2]) - 1, columnIndex: col - 1};
}
// Google Sheets stores dates as serial numbers (days since 1899-12-30).
// The input is an ISO YYYY-MM-DD string already validated by prepareTemplate.
function cellValue(value, type) {
  if (value !== '' && type === 'date') {
    const timestamp = Date.parse(value + 'T00:00:00Z');
    if (!Number.isFinite(timestamp)) fail('INVALID_DATE');
    return {userEnteredValue:{numberValue:(timestamp - Date.UTC(1899,11,30)) / 86400000}};
  }
  return {userEnteredValue: (type === 'integer' || type === 'money') && value !== ''
    ? {numberValue:Number(value)} : {stringValue:value}};
}

export function buildGoogleWritePlan(prepared, {copyMetadata, sheetMetadata = []}) {
  if (!object(prepared) || prepared.status !== 'DRAFT_PREFLIGHT' || !object(copyMetadata) ||
      !remoteId(copyMetadata.id) || copyMetadata.id === prepared.master_file_id ||
      (copyMetadata.mimeType ?? copyMetadata.mime_type) !== prepared.mime_type || copyMetadata.trashed)
    fail('COPY_NOT_VERIFIED');
  const spec = prepared.spec;
  if (prepared.kind === 'GOOGLE_DOCS' || prepared.kind === 'GOOGLE_SLIDES') {
    const requests = Object.entries(spec.text_bindings).map(([field, placeholder]) => {
      const replace = prepared.fields[field];
      return prepared.kind === 'GOOGLE_DOCS'
        ? {replaceAllText:{containsText:{text:placeholder, matchCase:true},replaceText:replace}}
        : {replaceAllText:{containsText:{text:placeholder,matchCase:true},replaceText:replace}};
    });
    return {kind:prepared.kind, target_file_id:copyMetadata.id, requests,
      checks:['REPLACE_COUNTS', 'UNRESOLVED_PLACEHOLDERS', 'SOURCE_AND_STATUS_REVIEW']};
  }
  // The Google Drive connector returns native sheet properties under sheets[].properties.
  // A flat synthetic test matrix is also accepted; metadata must describe the COPY.
  const sheets = Array.isArray(sheetMetadata) ? sheetMetadata :
    Array.isArray(sheetMetadata?.sheets) ? sheetMetadata.sheets.map(s => ({
      title:s.properties?.title,sheetId:s.properties?.sheetId,
      rowCount:s.properties?.gridProperties?.rowCount,
      columnCount:s.properties?.gridProperties?.columnCount
    })) : null;
  if (!sheets || new Set(sheets.map(s => s.title)).size !== sheets.length)
    fail('SHEET_METADATA_REQUIRED');
  const indexed = new Map(sheets.map(s => [s.title,s]));
  const requests = [];
  function writeAt(sheetTitle, a1, rows, colTypes) {
    const sheet = indexed.get(sheetTitle);
    if (!sheet || !Number.isInteger(sheet.sheetId) || !Number.isInteger(sheet.rowCount) ||
        !Number.isInteger(sheet.columnCount)) fail('COPY_SHEET_METADATA_MISSING');
    const start = cellCoordinates(a1);
    if (start.rowIndex + rows.length > sheet.rowCount ||
        start.columnIndex + colTypes.length > sheet.columnCount) fail('SHEET_GRID_CAPACITY_EXCEEDED');
    if (!rows.length) return;
    requests.push({updateCells:{start:{sheetId:sheet.sheetId,...start},
      rows:rows.map(row => ({values:row.map((v,i) => cellValue(v,colTypes[i]))})),
      fields:'userEnteredValue'}});
  }
  for (const [field, dest] of Object.entries(spec.cell_bindings))
    writeAt(dest.sheet,dest.cell,[[prepared.fields[field]]],[spec.fields[field].type]);
  for (const table of spec.table_bindings)
    writeAt(table.sheet,table.start_cell,prepared.tables[table.key],table.columns.map(c=>c.type));
  if (!requests.length) fail('EMPTY_WRITE_PLAN');
  return {kind:prepared.kind,target_file_id:copyMetadata.id,requests,
    checks:['READBACK_VALUES', 'FORMULA_PRESERVATION', 'SHEET_LAYOUT', 'SOURCE_AND_STATUS_REVIEW']};
}