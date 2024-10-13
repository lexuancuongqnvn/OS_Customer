using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Report.Dto
{
    public class PUR_Service_Purchase_Invoice_Report_ENTITY : IBase_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string voucher_code { get; set; }
        public string voucher_no { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public DateTime? invoice_date { get; set; }
        public string invoice_no { get; set; }
        public string seri_no { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string address { get; set; }
        public string grandparent { get; set; }
        public string profession_code { get; set; }
        public string description { get; set; }
        public string code_fc { get; set; }
        public decimal? exchange_rate { get; set; }
        public string creditor_account { get; set; }
        public string tax_code { get; set; }
        public string tax_account { get; set; }
        public decimal? money_goods_fc { get; set; }
        public decimal? money_goods { get; set; }
        public decimal? tax_money_fc { get; set; }
        public decimal? tax_money { get; set; }
        public decimal? total_money_fc { get; set; }
        public decimal? total_money { get; set; }
        public int? payment_deadline { get; set; }
        public decimal? paid_fc { get; set; }
        public decimal? paid { get; set; }
        public string invoice_code { get; set; }
        public string customer_invoice_name { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string is_tax { get; set; }
        public string dt_id { get; set; }
        public string dt_code { get; set; }
        public string master_code { get; set; }
        public string dt_description { get; set; }
        public string dt_customer_code { get; set; }
        public string dt_customer_name { get; set; }
        public string arise_fc { get; set; }
        public string arise { get; set; }
        public string debitor_account { get; set; }
        public string fee_code { get; set; }
        public string case_code { get; set; }
        public string department_code { get; set; }
        public string construction_id { get; set; }
        public decimal? tax_fc { get; set; }
        public decimal? tax { get; set; }
        public decimal? total_arise { get; set; }
        public decimal? total_arise_fc { get; set; }
        public int? language_id {get;set;}
        public int? voucher_year {get;set;}
    }
}
