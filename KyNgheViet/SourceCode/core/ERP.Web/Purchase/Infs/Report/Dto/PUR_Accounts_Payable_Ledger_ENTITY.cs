using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Report.Dto
{
    public class PUR_Accounts_Payable_Ledger_ENTITY
    {
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_master_code { get; set; }
        public string voucher_code { get; set; }
        public string voucher_no { get; set; }
        public string notes { get; set; }
        public string debitor_account { get; set; }
        public string account { get; set; }
        public decimal? arise_debit_fc { get; set; }
        public decimal? arise_debit { get; set; }
        public decimal? arise_credit_fc { get; set; }
        public decimal? arise_credit { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public int? Stt { get; set; }
        public int id { get; set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
        public string code { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
    }
}
