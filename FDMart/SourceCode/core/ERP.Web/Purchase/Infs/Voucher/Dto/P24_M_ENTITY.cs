using ERP.System.Shared;
using Sales.Infs.VAT.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Voucher.Dto
{
    public class P24_M_ENTITY:IBase_ENTITY
    {
        public string company_code {get;set;}
        public int id {get;set;}
        public string code    {get;set;}
        public DateTime? voucher_date { get; set; }
        public string voucher_code {get;set;}
        public string voucher_no {get;set;}
        public DateTime? invoice_date { get; set; }
        public string invoice_no {get;set;}
        public string seri_no {get;set;}
        public string customer_code {get;set;}
        public string customer_name {get;set;}
        public string address {get;set;}
        public string grandparent {get;set;}
        public string profession_code {get;set;}
        public string description {get;set;}
        public string code_fc {get;set;}
        public decimal? exchange_rate {get;set;}
        public string debitor_account {get;set;}
        public string tax_code {get;set;}
        public string tax_account {get;set;}
        public decimal? total_money_goods_fc {get;set;}
        public decimal? total_money_goods {get;set;}
        public decimal? tax_money_fc {get;set;}
        public decimal? tax_money {get;set;}
        public decimal? total_money_fc {get;set;}
        public decimal? total_money {get;set;}
        public int? payment_deadline { get; set; }
        public decimal? paid_fc {get;set;}
        public decimal? paid {get;set;}
        public bool? is_average_price { get; set; }
        public string order_number {get;set;}
        public string invoice_code {get;set;}
        public string customer_invoice_name {get;set;}
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}
        public int? language_id { get; set; }
        public bool? is_tax { get; set; }
        public List<P24_D_ENTITY> p24_D { get; set; }
        public string xml_24d { get; set; }
        public string xml_vat_in { get; set; }
        public List<Accounting_VAT_Input_ENTITY> accounting_vat_inputs { get; set; }
    }
}
