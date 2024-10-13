using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Report.Dto
{
    public class PUR_Aggregate_Cost_Coupon_Print_ENTITY : IBase_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string master_code { get; set; }
        public string goods_code { get; set; }
        public string unit_code { get; set; }
        public string unit_name { get; set; }
        public string warehouse_code { get; set; }
        public string warehouse_name { get; set; }
        public string debitor_account { get; set; }
        public string quantity { get; set; }
        public decimal? price { get; set; }
        public decimal? arise_fc { get; set; }
        public decimal? arise { get; set; }
        public decimal? cost_fc { get; set; }
        public decimal? cost { get; set; }
        public string fee_code { get; set; }
        public string case_code { get; set; }
        public string department_code { get; set; }
        public decimal? cost_arise_fc { get; set; }
        public decimal? cost_arise { get; set; }
        public string goods_name { get; set; }
        public string construction_id { get; set; }
        public string group_code { get; set; }
        public string standard_code { get; set; }
        public string brand { get; set; }
        public string series_no { get; set; }
        public string expiration_date { get; set; }
        public int? warranty_term { get; set; }
        public decimal? inventory { get; set; }
        public int? lot { get; set; }
        public decimal? conversion_factor { get; set; }
        public decimal? conversion_quantity { get; set; }
        public decimal? conversion_price { get; set; }
        public DateTime? warranty_date { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string company_code { get; set; }
        public decimal? price_fc { get; set; }
        public Boolean? is_tax { get; set; }
        public string notes { get; set; }
        public decimal? tax_money { get; set; }
        public DateTime? invoice_date { get; set; }
        public string invoice_no { get; set; }
        public string invoice_series_no { get; set; }
        public string creditor_account { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string voucher_detail_code { get; set; }
        public string voucher_no { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public decimal? price_have_cost { get; set; }
        public string deliver { get; set; }
        public decimal? amount { get; set; }
        public decimal? tax_money_have_cost { get; set; }
        public string voucher_22_m_code { get; set; }
        public int? language_id { get; set; }
        public string voucher_code { get; set; }
        public string goods_symbol { get; set; }
        public string group_goods_name { get; set; }
        public int? voucher_year { get; set; }
    }
}
