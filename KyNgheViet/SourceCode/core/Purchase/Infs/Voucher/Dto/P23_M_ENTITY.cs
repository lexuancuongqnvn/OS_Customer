using ERP.System.Shared;
using Sales.Infs.VAT.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Voucher.Dto
{
    public class P23_M_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public string code    { get; set; }
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
        public decimal? exchange_rate { get; set; }
        public string creditor_account { get; set; }
        public string tax_code { get; set; }
        public decimal? total_money_goods_fc { get; set; }
        public decimal? total_money_goods { get; set; }
        public string tax_account { get; set; }
        public decimal? tax_money_fc { get; set; }
        public decimal? tax_money { get; set; }
        public string tax_import_account { get; set; }
        public decimal? tax_import_money_fc { get; set; }
        public decimal? tax_import_money { get; set; }
        public decimal? cost_fc { get; set; }
        public decimal? cost { get; set; }
        public decimal? total_money_fc { get; set; }
        public decimal? total_money { get; set; }
        public int? payment_deadline { get; set; }
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
        public string xml_23d { get; set; }
        public string xml_vat_in { get; set; }
        public int? voucher_year { get; set; }
        public int? language_id { get; set; }
        public bool? is_tax { get; set; }
        public string goods_serial { get; set; }
        public string goods_symbol { get; set; }
        public List<Accounting_VAT_Input_ENTITY> accounting_vat_inputs { get; set; }
        public List<P23_D_ENTITY> p23_D { get; set; }

    }
}
