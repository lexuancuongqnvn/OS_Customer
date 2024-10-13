using ERP.System.Shared;
using NPOI.SS.Formula.Functions;
using System;

namespace ERP.Web.Models
{
    public class FilePreviewViewModel
    {
        public byte[] FileData { get; set; }
    }
    public class ParamPreviewModel
    {
        public string report_code { get; set; }
        public string master_code { get; set; }
	    public string company_code { get; set; }
        public string voucher_code { get; set; }
        public string voucher_no { get; set; }
        public int voucher_year { get; set; }

        public int id { get; set; }
        public int? language_id { get; set; }
        public string code { get; set; }
        public string voucher_date { get; set; }
        public string voucher_date_start { get; set; }
        public string voucher_date_end { get; set; }
        public string date_add { get; set; }
        public string date_modified { get; set; }
        public string account { get; set; }
        public string debitor_account { get; set; }
        public string creditor_account { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string type { get; set; }
        public string warehouse_code { get; set; }
        public string goods_code { get; set; }
        public string goods_symbol { get; set; }
        public string customer_code { get; set; }
        public string fee_code { get; set; }
        public string department_code { get; set; }
        public string case_code { get; set; }
        public string group_code { get; set; }
        public string seller_code { get; set; }
    }
}
