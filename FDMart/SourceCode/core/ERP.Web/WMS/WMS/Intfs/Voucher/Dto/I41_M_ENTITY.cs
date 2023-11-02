using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Voucher.Dto
{
    public class I41_M_ENTITY : IBase_ENTITY
    {
        public string code { get; set; }
        public string company_code { set; get; }
        public int? numerical_order { get; set; }
        public string voucher_code { get; set; }
        public DateTime? voucher_date { get; set; }
        public string voucher_no { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string address { get; set; }
        public string profession_code { get; set; }
        public string notes { get; set; }
        public string code_fc { get; set; }
        public string code_name { get; set; }
        public string symbol_fc { get; set; }
        public decimal? exchange_rate { get; set; }
        public decimal? total_money_fc { get; set; }
        public decimal? total_money { get; set; }
        public bool? is_average_price { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string xml_41d { get; set; }
        public int? voucher_year { set; get; }

        public List<I41_D_ENTITY> i41_D { get; set; }
        public int id { get; set; }
        public int? language_id { get; set; }
    }
}
