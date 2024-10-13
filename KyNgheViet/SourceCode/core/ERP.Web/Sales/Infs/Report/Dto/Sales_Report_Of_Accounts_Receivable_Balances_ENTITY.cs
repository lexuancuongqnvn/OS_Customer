using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Report.Dto
{
    public class Sales_Report_Of_Accounts_Receivable_Balances_ENTITY:IBase_ENTITY
    {
        public string code { get; set; }
        public string customer_code { get; set; }
        public decimal? debitor_money_fc { get; set; }
        public decimal? debitor_money { get; set; }
        public decimal? creditor_money_fc { get; set; }
        public decimal? creditor_money { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public int id { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
