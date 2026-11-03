"""Unit tests for draft finance Excel exporter; synthetic values only."""
import copy
import importlib.util
from pathlib import Path
import tempfile
import unittest

from artifact_tool import Blob, SpreadsheetFile

ROOT=Path(__file__).resolve().parents[1]
module_path=ROOT/"tools/export-finance-xlsx.py"
spec=importlib.util.spec_from_file_location("finance_excel_exporter",module_path)
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

BASE = {
    "schema_version":"v0.3-json","status":"DRAFT_CALCULATED_NOT_APPROVED",
    "project_id":"SYNTH-001","rab_ref":"SYN-RAB-001","rab_status":"APPROVED",
    "currency":"IDR","period":{"start":"2026-01-01","end":"2026-01-31"},
    "totals":{"approved_budget":"2500000","cash_received":"1250000","cash_paid":"450000",
        "mapped_lra_paid":"450000","unmapped_paid":"0","opening_cash":"0",
        "calculated_closing_cash":"800000","observed_closing_cash":"800000","cash_difference":"0"},
    "lra":[
        {"code":"A01","label":"Jasa Desain Sintetis","indicator_id":"IND-A",
            "approved_amount":"1500000","prior_realized":"0","realized_period":"450000",
            "realized_cumulative":"450000","remaining":"1050000","evidence_refs":["SYN-EVD-01"]},
        {"code":"A02","label":"Jasa Tulis Sintetis","indicator_id":"IND-B",
            "approved_amount":"1000000","prior_realized":"0","realized_period":"0",
            "realized_cumulative":"0","remaining":"1000000","evidence_refs":[]}
    ],
    "cash_flow":[
        {"date":"2026-01-05","transaction_id":"T01","type":"RECEIPT",
            "inflow":"1250000","outflow":"0","balance":"1250000","evidence_refs":["SYN-IN-01"]},
        {"date":"2026-01-07","transaction_id":"T02","type":"PAYMENT",
            "inflow":"0","outflow":"450000","balance":"800000","evidence_refs":["SYN-OUT-02"]}
    ]
}

class FinanceExportTest(unittest.TestCase):
    def build(self, report):
        with tempfile.TemporaryDirectory() as folder:
            path=Path(folder)/"draft.xlsx"
            module.export_report(report,path)
            return SpreadsheetFile.import_xlsx(Blob.load(str(path)))

    def test_sheets_and_zero_realization(self):
        wb=self.build(copy.deepcopy(BASE))
        self.assertEqual(wb.worksheets.get_item_at(0).name,"Realisasi RAB")
        self.assertEqual(wb.worksheets.get_item_at(1).name,"Arus Kas")
        self.assertEqual(wb.worksheets.get_item("Realisasi RAB").get_range("N7").values[0][0],1000000)
        self.assertEqual(wb.worksheets.get_item("Arus Kas").get_range("I7").values[0][0],800000)

    def test_unknown_prior_stays_blank(self):
        d=copy.deepcopy(BASE)
        for item in d["lra"]:
            item.update(prior_realized=None,realized_cumulative=None,remaining=None)
        s=self.build(d).worksheets.get_item("Realisasi RAB")
        self.assertIsNone(s.get_range("N6").values[0][0])
        self.assertIsNone(s.get_range("M8").values[0][0])

    def test_missing_opening_stays_unknown(self):
        d=copy.deepcopy(BASE)
        d["totals"].update(opening_cash=None,calculated_closing_cash=None,cash_difference=None)
        for item in d["cash_flow"]:item["balance"]=None
        s=self.build(d).worksheets.get_item("Arus Kas")
        self.assertEqual(s.get_range("B4").values[0][0],"BELUM DIKETAHUI")
        self.assertIsNone(s.get_range("I6").values[0][0])

    def test_untrusted_formula_text_is_not_formula(self):
        d=copy.deepcopy(BASE);d["lra"][0]["label"]='=HYPERLINK("https://invalid.example","click")'
        cell=self.build(d).worksheets.get_item("Realisasi RAB").get_range("B6")
        self.assertEqual(cell.formulas[0][0],"")

    def test_bad_totals_rejected(self):
        d=copy.deepcopy(BASE);d["totals"]["approved_budget"]="2500001"
        with self.assertRaisesRegex(ValueError,"INCONSISTENT_BUDGET"):
            self.build(d)

    def test_bad_running_balance_rejected(self):
        d=copy.deepcopy(BASE);d["cash_flow"][1]["balance"]="800001"
        with self.assertRaisesRegex(ValueError,"INCONSISTENT_RUNNING_BALANCE"):
            self.build(d)

    def test_duplicate_budget_code_rejected(self):
        d=copy.deepcopy(BASE);d["lra"][1]["code"]="A01"
        with self.assertRaisesRegex(ValueError,"INVALID_BUDGET_LINE"):
            self.build(d)

    def test_limit_excel_precision(self):
        d=copy.deepcopy(BASE);d["lra"][0]["approved_amount"]="1000000000000000"
        with self.assertRaisesRegex(ValueError,"INVALID_EXCEL_RANGE"):
            self.build(d)

    def test_never_silently_overwrite(self):
        with tempfile.TemporaryDirectory() as folder:
            out=Path(folder)/"sample.xlsx"
            module.export_report(copy.deepcopy(BASE),out)
            with self.assertRaises(FileExistsError):
                module.export_report(copy.deepcopy(BASE),out)


    def test_rab_details_carry_to_sheet(self):
        d=copy.deepcopy(BASE)
        d["lra"][0]["details"]={
            "cost_category":"Produksi",
            "specification":"Paket desain sintetis",
            "frequency":"1","frequency_unit":"Kegiatan",
            "quantity":"3","quantity_unit":"Paket",
            "unit_price":"500000","supporting_refs":["SYN-QUOTE-001"]
        }
        d["lra"][0]["detail_computed_amount"]="1500000"
        sheet=self.build(d).worksheets.get_item("Realisasi RAB")
        self.assertEqual(sheet.get_range("C6").values[0][0],"Produksi")
        self.assertEqual(sheet.get_range("E6").values[0][0],1)
        self.assertEqual(sheet.get_range("G6").values[0][0],3)
        self.assertEqual(sheet.get_range("I6").values[0][0],500000)

    def test_corrupted_detail_product_rejected(self):
        d=copy.deepcopy(BASE)
        d["lra"][0]["details"]={"frequency":"1","quantity":"3","unit_price":"500000"}
        d["lra"][0]["detail_computed_amount"]="1"
        with self.assertRaisesRegex(ValueError,"INCONSISTENT_RAB_DETAIL_COMPUTATION"):
            self.build(d)

    def test_cash_supporting_metadata_shown(self):
        d=copy.deepcopy(BASE)
        d["cash_flow"][1].update(indicator_id="IND-A",voucher_no="SYN-002",
            recipient_name="Penyedia Sintetis",description="Pengeluaran simulasi",support_url="SYN-LOC")
        sheet=self.build(d).worksheets.get_item("Arus Kas")
        self.assertEqual(sheet.get_range("C7").values[0][0],"IND-A")
        self.assertEqual(sheet.get_range("D7").values[0][0],"SYN-002")
        self.assertEqual(sheet.get_range("E7").values[0][0],"Penyedia Sintetis")

if __name__=="__main__":
    unittest.main()
