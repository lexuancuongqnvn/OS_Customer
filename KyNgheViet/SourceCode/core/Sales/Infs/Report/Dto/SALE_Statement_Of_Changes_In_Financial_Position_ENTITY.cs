using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Report.Dto
{
    public class SALE_Statement_Of_Changes_In_Financial_Position_ENTITY:IBase_ENTITY
    {
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public DateTime? voucher_date { get; set; }
        public string customer_code { get; set; }
         public string customer_name { get; set; }
        public decimal? initial_debt_fc { get; set; }//as [Nợ đầu nguyên tệ]
        public decimal? initial_debt { get; set; }//as [Nợ đầu]
        public decimal? initial_credt_fc { get; set; }//as [Có đầu nguyên tệ]
        public decimal? initial_credt { get; set; }// as [Có đầu]
        public decimal? arise_debit_fc { get; set; }
        public decimal? arise_debit { get; set; }
        public decimal? arise_credit_fc { get; set; }
        public decimal? arise_credit { get; set; }
        public decimal? ending_debt_fc { get; set; }//as [Nợ cuối nguyên tệ]
        public decimal? ending_debt { get; set; }//as [Nợ cuối]
        public decimal? ending_credt_fc { get; set; }//as [Có cuối nguyên tệ]
        public decimal? ending_credt { get; set; }//as [Có cuối]
        public int id {get;set;}
        public int? language_id {get;set;}
        public string voucher_code {get;set;}
        public int? voucher_year {get;set;}
        public string code {get;set;}
        public string account { get;set;}
        public string company_code {get;set;}
        public DateTime? date_add {get;set;}
        public DateTime? date_modified {get;set;}
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}
        public string seller_code {get;set;}
        public string seller_name {get;set;}
    }
}
