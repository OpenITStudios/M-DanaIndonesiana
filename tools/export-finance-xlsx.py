#!/usr/bin/env python3
"""Draft 2025 LPDP-style XLSX export from finance-report v0.3 JSON.

Only with explicitly authorized input. Never a government-approved report.
Requires artifact_tool in the Python runtime.
"""
import argparse
from datetime import date
import json
from pathlib import Path
import re
import sys

from artifact_tool import Workbook, SpreadsheetFile

SOURCE = "https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf"
LRA_COLUMNS = ["Kode", "Uraian Kebutuhan", "Kategori Biaya", "Spesifikasi",
    "Frekuensi", "Satuan", "Kuantitas", "Satuan", "Harga Satuan", "Jumlah",
    "Persentase", "Data Dukung RAB", "Realisasi", "Sisa RAB",
    "No Bukti", "Keterangan"]
CASH_COLUMNS = ["No", "Tanggal", "Indikator", "No. Bukti Data Dukung",
    "Nama Penerima", "Uraian", "Penerimaan", "Pengeluaran",
    "Saldo", "Link Data Dukung", "Keterangan"]
NAVY, TEAL, PALE = "#16334D", "#0F766E", "#E6F5F1"
MONEY_FORMAT = '#,##0;[Red](#,##0);-'
EXACT_LIMIT = 999_999_999_999_999

def text_cell(value):
    if value is None:
        return None
    if not isinstance(value, str) or len(value) > 2048:
        raise ValueError("INVALID_TEXT")
    return "'" + value if value.lstrip().startswith(("=", "+", "-", "@", "\t", "\r", "\n")) else value

def amount(value, name, signed=False):
    if value is None:
        return None
    if not isinstance(value, str) or not re.fullmatch(r"-?(?:0|[1-9]\d*)", value):
        raise ValueError("INVALID_AMOUNT:" + name)
    n = int(value)
    if (n < 0 and not signed) or abs(n) > EXACT_LIMIT:
        raise ValueError("INVALID_EXCEL_RANGE:" + name)
    return n

def date_cell(value):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        raise ValueError("INVALID_DATE")
    return date.fromisoformat(value)

def verify(report):
    if not isinstance(report, dict) or report.get("schema_version") != "v0.5-json":
        raise ValueError("UNSUPPORTED_REPORT_SCHEMA")
    if report.get("status") != "DRAFT_CALCULATED_NOT_APPROVED" or report.get("currency") != "IDR":
        raise ValueError("DRAFT_IDR_ONLY")
    if not isinstance(report.get("lra"), list) or not report["lra"]:
        raise ValueError("EMPTY_LRA")
    if not isinstance(report.get("cash_flow"), list) or not isinstance(report.get("totals"), dict):
        raise ValueError("INCOMPLETE_REPORT")
    period = report.get("period", {})
    if date_cell(period.get("start")) > date_cell(period.get("end")):
        raise ValueError("INVALID_PERIOD_ORDER")
    totals = report["totals"]
    must = ["approved_budget", "cash_received", "cash_paid", "mapped_lra_paid", "unmapped_paid"]
    for k in must:
        if amount(totals.get(k), k) is None:
            raise ValueError("MISSING_TOTAL:" + k)
    total_budget = total_mapped = 0
    codes = set()
    for line in report["lra"]:
        code = text_cell(line.get("code"))
        if not code or code in codes or not text_cell(line.get("label")):
            raise ValueError("INVALID_BUDGET_LINE")
        codes.add(code)
        ceiling = amount(line.get("approved_amount"), "ceiling")
        this_period = amount(line.get("realized_period"), "realized_period")
        prior = amount(line.get("prior_realized"), "prior")
        cumulative = amount(line.get("realized_cumulative"), "cumulative")
        remaining = amount(line.get("remaining"), "remaining", signed=True)
        if ceiling is None or this_period is None:
            raise ValueError("MISSING_LINE_AMOUNT")
        if cumulative is None:
            if remaining is not None:
                raise ValueError("REMAINING_WITHOUT_CUMULATIVE")
        elif prior is None or cumulative != prior + this_period or remaining != ceiling - cumulative:
            raise ValueError("INCONSISTENT_LRA")
        details = line.get("details") or {}
        if not isinstance(details, dict):
            raise ValueError("INVALID_RAB_DETAILS")
        for key in ("frequency", "quantity", "unit_price"):
            amount(details.get(key), key)
        refs = details.get("supporting_refs") or []
        if not isinstance(refs, list) or any(not isinstance(x, str) for x in refs):
            raise ValueError("INVALID_SUPPORTING_REFS")
        # Where all factors exist, the difference is reported by the calculator.
        # It must not silently replace the approved budget amount.
        qty = [details.get(k) for k in ("frequency","quantity","unit_price")]
        if all(v is not None for v in qty):
            expected = amount(qty[0],"frequency")*amount(qty[1],"quantity")*amount(qty[2],"unit_price")
            if line.get("detail_computed_amount") != str(expected):
                raise ValueError("INCONSISTENT_RAB_DETAIL_COMPUTATION")
        total_budget += ceiling
        total_mapped += this_period
    if total_budget != amount(totals["approved_budget"], "approved_budget"):
        raise ValueError("INCONSISTENT_BUDGET")
    if total_mapped != amount(totals["mapped_lra_paid"], "mapped_lra_paid"):
        raise ValueError("INCONSISTENT_MAPPED_LRA")
    if total_mapped + amount(totals["unmapped_paid"], "unmapped_paid") != amount(totals["cash_paid"], "cash_paid"):
        raise ValueError("INCONSISTENT_CASH_MAPPING")
    opening = amount(totals.get("opening_cash"), "opening_cash")
    running = opening
    inflows = outflows = 0
    ids = set()
    for row in report["cash_flow"]:
        txid = text_cell(row.get("transaction_id"))
        if not txid or txid in ids:
            raise ValueError("INVALID_TRANSACTION_ID")
        ids.add(txid)
        date_cell(row.get("date"))
        typ = row.get("type")
        inflow = amount(row.get("inflow"), "inflow")
        outflow = amount(row.get("outflow"), "outflow")
        if typ not in ("RECEIPT", "PAYMENT") or inflow is None or outflow is None:
            raise ValueError("INVALID_CASH_FLOW")
        if (typ == "RECEIPT" and (inflow <= 0 or outflow != 0)) or (typ == "PAYMENT" and (outflow <= 0 or inflow != 0)):
            raise ValueError("INVALID_CASH_KIND")
        inflows += inflow
        outflows += outflow
        if running is not None:
            running += inflow - outflow
        if running != amount(row.get("balance"), "balance", signed=True):
            raise ValueError("INCONSISTENT_RUNNING_BALANCE")
    if inflows != amount(totals["cash_received"], "cash_received") or outflows != amount(totals["cash_paid"], "cash_paid"):
        raise ValueError("INCONSISTENT_CASH_TOTALS")
    calculated = amount(totals.get("calculated_closing_cash"), "calculated_closing_cash", signed=True)
    if running != calculated:
        raise ValueError("INCONSISTENT_CLOSING_CASH")
    observed = amount(totals.get("observed_closing_cash"), "observed_closing_cash")
    difference = amount(totals.get("cash_difference"), "cash_difference", signed=True)
    if (calculated - observed if calculated is not None and observed is not None else None) != difference:
        raise ValueError("INCONSISTENT_CASH_DIFFERENCE")

def header(sheet, final_col, title, subtitle, report):
    sheet.merge_cells("A1:" + final_col + "1")
    sheet.get_range("A1").values = [[title]]
    sheet.get_range("A1:" + final_col + "1").format = {
        "fill": NAVY, "font": {"bold": True, "color": "#FFFFFF", "size": 15},
        "row_height": 34, "vertical_alignment": "center"}
    sheet.merge_cells("A2:" + final_col + "2")
    sheet.get_range("A2").values = [[subtitle]]
    sheet.get_range("A2:" + final_col + "2").format = {
        "fill": PALE, "font": {"color": NAVY, "size": 10}, "row_height": 24}
    sheet.merge_cells("A3:" + final_col + "3")
    p = report["period"]
    sheet.get_range("A3").values = [[f"DRAFT • INTERNAL REVIEW • {p['start']} s.d. {p['end']} • Bukan persetujuan PMO/LPDP"]]
    sheet.get_range("A3:" + final_col + "3").format = {
        "fill": "#FCE9E8", "font": {"bold": True, "color": "#9D1C1C"}, "row_height": 23}
    sheet.get_range("A5:" + final_col + "5").format = {
        "fill": TEAL, "font": {"bold": True, "color": "#FFFFFF", "size": 10},
        "row_height": 44, "wrap_text": True, "horizontal_alignment": "center",
        "vertical_alignment": "center"}
    sheet.freeze_panes.freeze_rows(5)

def widths(sheet, names, end):
    for index, width in enumerate(names):
        i = index + 1
        name = ""
        while i:
            i, remainder = divmod(i - 1, 26)
            name = chr(65 + remainder) + name
        sheet.get_range(f"{name}1:{name}{end}").format.column_width = width

def write_lra(book, report):
    sheet = book.worksheets.add("Realisasi RAB")
    header(sheet, "P", "LAPORAN REALISASI ANGGARAN",
           "Susunan kolom mengacu Lampiran A Pedoman Administrasi Dana Indonesiana 2025", report)
    sheet.get_range("A5:P5").values = [LRA_COLUMNS]
    data = []
    for b in report["lra"]:
        evidence = b.get("evidence_refs") or []
        if not isinstance(evidence, list):
            raise ValueError("INVALID_EVIDENCE_REFS")
        note = "Indikator " + str(b.get("indicator_id") or "belum diketahui")
        if b.get("realized_cumulative") is None:
            note += "; realisasi kumulatif belum diketahui"
        detail = b.get("details") or {}
        refs = detail.get("supporting_refs") or []
        data.append([text_cell(b["code"]), text_cell(b["label"]),
            text_cell(detail.get("cost_category")),text_cell(detail.get("specification")),
            amount(detail.get("frequency"), "frequency"),text_cell(detail.get("frequency_unit")),
            amount(detail.get("quantity"), "quantity"),text_cell(detail.get("quantity_unit")),
            amount(detail.get("unit_price"), "unit_price"),
            amount(b["approved_amount"], "approved"), None,
            text_cell(", ".join(refs)) if refs else None,
            amount(b.get("realized_cumulative"), "cumulative"),
            None, text_cell(", ".join(map(str, evidence))), text_cell(note)])
    first, last = 6, 5 + len(data)
    summary = last + 1
    sheet.get_range(f"A{first}:P{last}").values = data
    for i, row in enumerate(range(first, last + 1)):
        sheet.get_range(f"K{row}").formulas = [[f"=IF(J{summary}=0,0,J{row}/J{summary})"]]
        if report["lra"][i].get("realized_cumulative") is not None:
            sheet.get_range(f"N{row}").formulas = [[f"=J{row}-M{row}"]]
    sheet.get_range(f"A{summary}").values = [["TOTAL"]]
    sheet.get_range(f"J{summary}").formulas = [[f"=SUM(J{first}:J{last})"]]
    if all(b.get("realized_cumulative") is not None for b in report["lra"]):
        sheet.get_range(f"M{summary}").formulas = [[f"=SUM(M{first}:M{last})"]]
        sheet.get_range(f"N{summary}").formulas = [[f"=J{summary}-M{summary}"]]
    sheet.get_range(f"A{summary}:P{summary}").format = {
        "fill": PALE, "font": {"bold": True, "color": NAVY}, "row_height": 24}
    sheet.get_range(f"J{first}:J{summary}").set_number_format(MONEY_FORMAT)
    sheet.get_range(f"M{first}:N{summary}").set_number_format(MONEY_FORMAT)
    sheet.get_range(f"K{first}:K{last}").set_number_format("0.00%")
    widths(sheet, [13,35,19,28,12,13,12,13,17,20,16,25,20,20,26,52], summary + 4)
    sheet.merge_cells(f"A{summary+2}:P{summary+2}")
    sheet.get_range(f"A{summary+2}").values = [["Rincian RAB yang tersedia ditampilkan; kolom lain dibiarkan kosong. Lengkapi dari sumber sah sebelum disampaikan."]]
    sheet.get_range(f"A{summary+2}:P{summary+2}").format = {"font":{"color":NAVY,"size":9},"row_height":23}
    return sheet

def write_cash(book, report):
    sheet = book.worksheets.add("Arus Kas")
    header(sheet,"K","LAPORAN ARUS KAS",
           "Susunan kolom mengacu Lampiran B Pedoman Administrasi Dana Indonesiana 2025",report)
    opening = amount(report["totals"].get("opening_cash"), "opening_cash")
    sheet.get_range("A4").values = [["Saldo awal"]]
    if opening is None:
        sheet.get_range("B4").values = [["BELUM DIKETAHUI"]]
    else:
        sheet.get_range("B4").values = [[opening]]
        sheet.get_range("B4").set_number_format(MONEY_FORMAT)
    sheet.get_range("A5:K5").values = [CASH_COLUMNS]
    data = []
    for index, tx in enumerate(report["cash_flow"], 1):
        evidence = tx.get("evidence_refs") or []
        if not isinstance(evidence, list):
            raise ValueError("INVALID_EVIDENCE_REFS")
        data.append([index,date_cell(tx["date"]),
            text_cell(tx.get("indicator_id")),
            text_cell(tx.get("voucher_no") or (", ".join(map(str,evidence)) if evidence else None)),
            text_cell(tx.get("recipient_name")),
            text_cell(tx.get("description")) if tx.get("description") else ("Penerimaan kas" if tx["type"]=="RECEIPT" else "Pengeluaran kas"),
            amount(tx["inflow"],"inflow"),amount(tx["outflow"],"outflow"),None,
            text_cell(tx.get("support_url")),
            text_cell("Referensi internal " + tx["transaction_id"] + " • Bukti belum diperiksa")])
    first, last = 6, 5 + len(data)
    summary = last + 1
    if data:
        sheet.get_range(f"A{first}:K{last}").values = data
        sheet.get_range(f"B{first}:B{last}").set_number_format("dd mmm yyyy")
        if opening is not None:
            for row in range(first,last+1):
                previous = "$B$4" if row == first else f"I{row-1}"
                sheet.get_range(f"I{row}").formulas = [[f"={previous}+G{row}-H{row}"]]
    sheet.get_range(f"F{summary}").values = [["TOTAL"]]
    if data:
        sheet.get_range(f"G{summary}").formulas = [[f"=SUM(G{first}:G{last})"]]
        sheet.get_range(f"H{summary}").formulas = [[f"=SUM(H{first}:H{last})"]]
        if opening is not None:
            sheet.get_range(f"I{summary}").formulas = [[f"=I{last}"]]
    else:
        sheet.get_range(f"G{summary}:H{summary}").values = [[0,0]]
        if opening is not None:
            sheet.get_range(f"I{summary}").formulas = [["=$B$4"]]
    sheet.get_range(f"F{summary}:K{summary}").format = {
        "fill": PALE, "font": {"bold": True, "color": NAVY}, "row_height": 24}
    sheet.get_range(f"G{first}:I{summary}").set_number_format(MONEY_FORMAT)
    widths(sheet, [9,18,20,28,27,35,20,20,21,37,50], summary+4)
    sheet.merge_cells(f"A{summary+2}:K{summary+2}")
    sheet.get_range(f"A{summary+2}").values = [["Saldo bank/kas tunai perlu rekonsiliasi dan bukti asli; jangan gunakan workbook ini sebagai konfirmasi eksternal."]]
    sheet.get_range(f"A{summary+2}:K{summary+2}").format = {"font":{"color":NAVY,"size":9},"row_height":24}
    sheet.merge_cells(f"A{summary+3}:K{summary+3}")
    sheet.get_range(f"A{summary+3}").values = [["Sumber format: "+ SOURCE]]
    sheet.get_range(f"A{summary+3}:K{summary+3}").format = {"font":{"color":TEAL,"size":9},"row_height":23}
    return sheet

def export_report(report, output):
    verify(report)
    output=Path(output)
    if output.exists():
        raise FileExistsError("OUTPUT_EXISTS_USE_NEW_VERSIONED_NAME")
    book=Workbook.create()
    write_lra(book,report)
    write_cash(book,report)
    SpreadsheetFile.export_xlsx(book).save(str(output))
    return output

def main():
    p=argparse.ArgumentParser(description="Draft two-sheet LPDP-style report; no network/portal actions")
    p.add_argument("--output",required=True,type=Path,help="Authorized private destination; not a public Git path")
    args=p.parse_args()
    report=json.load(sys.stdin)
    export_report(report,args.output)
    print("DRAFT_XLSX_CREATED",file=sys.stderr)

if __name__=="__main__":
    main()
