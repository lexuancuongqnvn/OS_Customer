using Castle.Core;
using Castle.MicroKernel.Registration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Report.Dto
{
    public class PUR_Import_Invoice_Report_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string voucher_code { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_no { get; set; }
        public DateTime? invoice_date { get; set; }
        public string invoice_no { get; set; }
        public string series_no { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string address { get; set; }
        public string grandparent { get; set; }
        public string profession_code { get; set; }
        public string description { get; set; }
        public string code_fc { get; set; }
        public string exchange_rate { get; set; }
        public string creditor_account { get; set; }
        public string tax_code { get; set; }
        public string total_money_goods_fc { get; set; }
        public string total_money_goods { get; set; }
        public string tax_account { get; set; }
        public string tax_money_fc { get; set; }
        public string tax_money { get; set; }
        public string tax_import_account { get; set; }
        public string tax_import_money_fc { get; set; }
        public string tax_import_money { get; set; }
        public decimal? cost_fc { get; set; }
        public decimal? cost { get; set; }
        public decimal? total_money_fc { get; set; }
        public decimal? total_money { get; set; }
        public decimal? payment_deadline { get; set; }
        public decimal? paid_fc { get; set; }
        public decimal? paid { get; set; }
        public string tax_account1 { get; set; }
        public string tax_import_code { get; set; }
        public string sales_order_no { get; set; }
        public string invoice_code { get; set; }
        public string customer_invoice_name { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string company_code { get; set; }
        public bool? is_tax { get; set; }
        public int? dt_id { get; set; }
        public string dt_code { get; set; }
        public string master_code { get; set; }
        public string goods_code { get; set; }
        public string goods_name { get; set; }
        public string unit_code { get; set; }
        public string warehouse_code { get; set; }
        public string debitor_account { get; set; }
        public string quantity { get; set; }
        public string price_fc { get; set; }
        public string price { get; set; }
        public string arise_fc { get; set; }
        public string arise { get; set; }
        public string dt_cost_fc { get; set; }
        public string dt_cost { get; set; }
        public string fee_code { get; set; }
        public string department_code { get; set; }
        public string case_code { get; set; }
        public string tax_import { get; set; }
        public string tax_import_fc { get; set; }
        public string construction_id { get; set; }
        public string dt_tax_import_code { get; set; }
        public string vat_import { get; set; }
        public string group_code { get; set; }
        public string standard_code { get; set; }
        public string brand { get; set; }
        public string dt_series_no { get; set; }
        public string lot { get; set; }
        public DateTime? expiration_date { get; set; }
        public string warranty_term { get; set; }
        public string inventory { get; set; }
        public string conversion_factor { get; set; }
        public string conversion_quantity { get; set; }
        public string conversion_price { get; set; }
        public string tax_fc { get; set; }
        public string tax { get; set; }
        public string dt_customer_code { get; set; }
        public string dt_goods_name { get; set; }
        public string goods_group_code { get; set; }

    }
}
