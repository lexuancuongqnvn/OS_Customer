using Castle.MicroKernel.Registration;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Report.Dto
{
    public class PUR_Journal_ENTITY:IBase_ENTITY
    {
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_no { get; set; }
        public string invoice_no { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string grandparent { get; set; }
        public string notes { get; set; }
        public string debitor_account { get; set; }
        public string creditor_account { get; set; }
        public decimal? arise_credit { get; set; }
        public int id {get;set;}
        public int? language_id {get;set;}
        public string voucher_code {get;set;}
        public int? voucher_year {get;set;}
        public string code {get;set;}
        public string company_code {get;set;}
        public DateTime? date_add {get;set;}
        public DateTime? date_modified {get;set;}
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}
    }
}
