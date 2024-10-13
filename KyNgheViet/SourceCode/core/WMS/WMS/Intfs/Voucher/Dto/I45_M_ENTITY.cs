using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Voucher.Dto
{
    public class I45_M_ENTITY : IBase_ENTITY
    {
        public string code { get; set; }
        public string company_code { set; get; }
        public int? numerical_order { get; set; }
        public string voucher_code { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
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
        public bool? is_in_progress { get; set; }
        public bool? is_cost_allocation { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string xml_45d { get; set; }
        public int? voucher_year { set; get; }
        public string goods_serial { get; set; }
        public string goods_symbol { get; set; }
        public List<I45_D_ENTITY> i45_D { get; set; }
        public int id { get; set; }
        public int? language_id { get; set; }
    }
}
