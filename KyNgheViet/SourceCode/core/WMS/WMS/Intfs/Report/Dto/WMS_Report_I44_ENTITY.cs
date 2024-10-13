using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Report_I44_ENTITY : IBase_ENTITY
    {
        public string code { get; set; }
        public string company_code { set; get; }
        public int id { get; set; }
        public string voucher_code { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_no { get; set; }
        public string customer_code { get; set; }
        public string address { get; set; }
        public string profession_code { get; set; }
        public string notes { get; set; }
        public string code_fc { get; set; }
        public string code_name { get; set; }
        public string symbol_fc { get; set; }
        public decimal? exchange_rate { get; set; }
        public decimal? total_money_fc { get; set; }
        public decimal? total_money { get; set; }
        public int? numerical_order { get; set; }
        public string warehouse_out_code { get; set; }
        public string warehouse_out_name { get; set; }
        public string warehouse_in_code { get; set; }
        public string warehouse_in_name { get; set; }
        public string customer_name { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string xml_44d { get; set; }
        public int? voucher_year { set; get; }
        public bool? approve { get; set; }
        public int? account_id { get; set; }
        public string decentralization { get; set; }
        public int? language_id { get; set; }
        public string unit_name            { get; set; }
        public string warehouse_out_symbol { get; set; }
        public string warehouse_in_symbol  { get; set; }
        public decimal? quantity             { get; set; }
        public string goods_serial         { get; set; }
        public string goods_symbol         { get; set; }
        public string goods_name           { get; set; }
        public string goods_code           { get; set; }
        public string group_code { get; set; }
        public decimal? price                { get; set; }
        public decimal? price_fc             { get; set; }
        public decimal? arise                { get; set; }
        public decimal? arise_fc             { get; set; }
        public string creditor_account     { get; set; }
        public string debitor_account      { get; set; }
        public string fee_code             { get; set; }
        public string case_code            { get; set; }
        public string department_name      { get; set; }
        public string construction_name    { get; set; }
        public string conversion_factor    { get; set; }
        public string conversion_quantity  { get; set; }
        public string conversion_price     { get; set; }
    }
}
