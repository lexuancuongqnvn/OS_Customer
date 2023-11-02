using ERP.System.Shared;
using Sales.Infs.VAT.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Voucher.Dto
{
    public class S33_M_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public string code   { get; set; }
        public string voucher_code { get; set; }
        public DateTime? voucher_date { get; set; }
        public string voucher_no { get; set; }
        public string invoice_no { get; set; }
        public string series_no { get; set; }
        public string customer_code{ get; set; }
        public string address { get; set; }
        public string grandparent { get; set; }
        public string profession_code{ get; set; }
        public string description { get; set; }
        public string code_fc{ get; set; }
        public decimal? exchange_rate{ get; set; }
        public string creditor_account { get; set; }
        public bool? is_average_price { get; set; }
        public string tax_code{ get; set; }
        public string tax_account{ get; set; }
        public string discount_account{ get; set; }
        public decimal? total_money_goods_fc{ get; set; }
        public decimal? total_money_goods{ get; set; }
        public decimal? tax_money_fc{ get; set; }
        public decimal? tax_money{ get; set; }
        public decimal? discount_money_fc{ get; set; }
        public decimal? discount_money{ get; set; }
        public decimal? total_money_fc{ get; set; }
        public decimal? total_money{ get; set; }
        public decimal? payment_deadline { get; set; }
        public decimal? paid_fc{ get; set; }
        public decimal? paid{ get; set; }
        public string customer_name { get; set; }
        public DateTime? invoice_date { get; set; }
        public string sales_order_no{ get; set; }
        public string seller_code{ get; set; }
        public string seller_name { get; set; }
        public string invoice_code{ get; set; }
        public string customer_invoice_name { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add{ get; set; }
        public string account_code_modified{ get; set; }
        public string company_code{ get; set; }
        public int? language_id { get; set; }
        public string xml_33d { get; set; }
        public string xml_vat_out { get; set; }
        public bool? is_tax { get; set; }
        public List<S33_D_ENTITY> s33_D { get; set; }
        public List<Accounting_VAT_Output_ENTITY> accounting_VAT_Outputs { get; set; }
    }
}
