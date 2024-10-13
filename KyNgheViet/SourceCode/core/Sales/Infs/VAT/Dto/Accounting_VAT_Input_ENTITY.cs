using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.VAT.Dto
{
    public class Accounting_VAT_Input_ENTITY: IBase_ENTITY
    {
        public int id { get; set; }
        public string code    { get; set; }
        public int? type { get; set; }
        public DateTime? voucher_date    { get; set; }
        public DateTime? invoice_date    { get; set; }
        public string invoice_no  { get; set; }
        public string series_no { get; set; }
        public string customer_code { get; set; }
        public string address { get; set; }
        public string description { get; set; }
        public decimal? quantity { get; set; }
        public decimal? price { get; set; }
        public decimal? total_money { get; set; }
        public string tax_code { get; set; }
        public decimal? tax_rate { get; set; }
        public decimal? tax { get; set; }
        public string tax_account { get; set; }
        public string debitor_account { get; set; }
        public string notes { get; set; }
        public string voucher_code_group { get; set; }
        public string voucher_master_code { get; set; }
        public string goods_code { get; set; }
        public string voucher_detail_code { get; set; }
        public string voucher_code { get; set; }
        public string customer_name { get; set; }
        public decimal? tax_fc { get; set; }
        public decimal? total_money_fc { get; set; }
        public string invoice_code { get; set; }
        public string customer_invoice_name { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public bool? approve { get; set; }
        public int? account_id { get; set; }
        public string decentralization { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
