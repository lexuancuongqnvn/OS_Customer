using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Report.Dto
{
    public class SALE_Year_End_Balance_Sheet_Compilation_ENTITY:IBase_ENTITY
    {
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public decimal? debitor_money_fc { get; set; }

        public decimal? debitor_money { get; set; }

        public decimal? creditor_money_fc { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public DateTime? voucher_date { get; set; }
        public decimal? creditor_money { get; set; }
        public int id {get;set;}
        public int? language_id {get;set;}
        public string voucher_code {get;set;}
        public string debitor_account { get;set;}
        public string account {get;set;}
        public int? voucher_year {get;set;}
        public string code {get;set;}
        public string company_code {get;set;}
        public DateTime? date_add {get;set;}
        public DateTime? date_modified {get;set;}
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}
    }
}
