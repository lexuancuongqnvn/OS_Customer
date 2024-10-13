using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Report.Dto
{
    public class SALES_Report_S33_ENTITY
    {
        public DateTime? voucher_date { get; set; }
        public string code { get; set; }
        public string voucher_no { get; set; }
        public string invoice_no { get; set; }
        public string notes { get; set; }
        public string customer_code { get; set; }
        public string name { get; set; }
        public string debitor_account { get; set; }
        public string goods_code { get; set; }
        public string goods_symbol { get; set; }
        public string goods_name { get; set; }
        public string unit_code { get; set; }
        public string warehouse_code { get; set; }
        public decimal? quantity { get; set; }
        public decimal? price_fc { get; set; }
        public decimal? price { get; set; }
        public decimal? arise_fc { get; set; }
        public decimal? arise { get; set; }
        public decimal? tax_fc { get; set; }
        public decimal? tax { get; set; }
        public decimal? discount_fc { get; set; }
        public decimal? discount { get; set; }
        public decimal? total_money_fc { get; set; }
        public decimal? total_money { get; set; }
        public decimal? cogs_price { get; set; }
        public decimal? cogs_money { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_code { get; set; }
        public string company_code { get; set; }
        public string warehouse_account { get; set; }
        public string creditor_account { get; set; }
        public string fee_code { get; set; }
        public string department_code { get; set; }
        public string case_code { get; set; }
        public string group_code { get; set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
        public int? id { get; set; }
        public string series_no               { get; set; }
        public string address                 { get; set; }
        public string grandparent             { get; set; }
        public string profession_code         { get; set; }
        public string description             { get; set; }
        public string code_fc                 { get; set; }
        public string exchange_rate           { get; set; }
        public bool? is_average_price        { get; set; }
        public string tax_code                { get; set; }
        public string tax_account             { get; set; }
        public string discount_account        { get; set; }
        public decimal? total_money_goods_fc    { get; set; }
        public decimal? total_money_goods       { get; set; }
        public decimal? tax_money_fc            { get; set; }
        public decimal? tax_money               { get; set; }
        public decimal? discount_money_fc       { get; set; }
        public decimal? discount_money          { get; set; }
        public decimal? payment_deadline        { get; set; }
        public decimal? paid_fc                 { get; set; }
        public decimal? paid                    { get; set; }
        public string customer_name           { get; set; }
        public DateTime? invoice_date            { get; set; }
        public string sales_order_no          { get; set; }
        public string seller_code             { get; set; }
        public string seller_name             { get; set; }
        public string invoice_code            { get; set; }
        public string customer_invoice_name   { get; set; }
        public DateTime? date_add                { get; set; }
        public DateTime? date_modified           { get; set; }
        public string account_code_add        { get; set; }
        public string account_code_modified   { get; set; }
        public bool? is_tax                  { get; set; }
        public string master_code             { get; set; }
        public string sales_returns_account   { get; set; }
        public string cogs_account            { get; set; }
        public string construction_id         { get; set; }
        public string standard_code           { get; set; }
        public string brand                   { get; set; }
        public string lot                     { get; set; }
        public string expiration_date         { get; set; }
        public string warranty_term           { get; set; }
        public decimal? inventory               { get; set; }
        public decimal? conversion_factor       { get; set; }
        public decimal? conversion_quantity     { get; set; }
        public decimal? conversion_price        { get; set; }

    }
}
