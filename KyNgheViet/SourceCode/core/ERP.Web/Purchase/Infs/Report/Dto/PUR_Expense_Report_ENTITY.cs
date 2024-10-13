using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;

namespace Purchase.Infs.Report.Dto
{
    public class PUR_Expense_Report_ENTITY : IBase_ENTITY
    {
        public string voucher_code { get; set; }
        public string voucher_no            {get;set;}
        public DateTime? voucher_date       {get;set;}
        public DateTime? voucher_date_start {get;set;}
        public DateTime? voucher_date_end   {get;set;}
        public string invoice_no            {get;set;}
        public string series_no             {get;set;}
        public string customer_code         {get;set;}
        public string name                  {get;set;}
        public string description           {get;set;}
        public decimal? total_money_goods   {get;set;}
        public decimal? tax_money           {get;set;}
        public decimal? total_money         {get;set;}
        public string tax_code              {get;set;}
        public string creditor_account      {get;set;}
        public int id {get;set;}
        public int? language_id {get;set;}
        public int? voucher_year {get;set;}
        public string code {get;set;}
        public string company_code {get;set;}
        public DateTime? date_add {get;set;}
        public DateTime? date_modified {get;set;}
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}
    }
}
