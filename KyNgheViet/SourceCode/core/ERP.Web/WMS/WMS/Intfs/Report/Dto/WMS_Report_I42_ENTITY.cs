using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Report_I42_ENTITY : IBase_ENTITY
    {
        public int id { get; set; }
        public string company_code { set; get; }
        public string voucher_code { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string voucher_no { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string address { get; set; }
        public string profession_code { get; set; }
        public string profession_name { get; set; }
        public string notes { get; set; }
        public string code_fc { get; set; }
        public string code_name { get; set; }
        public string symbol_fc { get; set; }
        public decimal? exchange_rate { get; set; }
        public decimal? total_money_fc { get; set; }
        public decimal? total_money { get; set; }
        public int? numerical_order { get; set; }
        public bool? is_average_price { get; set; }
        public bool? is_direct_import_and_export { get; set; }
        public string xml_42d { get; set; }
        public string code { get; set; }
        public bool? approve { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public int? account_id { get; set; }
        public string decentralization { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public int? voucher_year { set; get; }
        public decimal? arise_fc { set; get; }
        public decimal? arise                       { set; get; }
        public string unit_name                   { set; get; }
        public string warehouse_symbol            { set; get; }
        public decimal? quantity                    { set; get; }
        public decimal? price_fc                    { set; get; }
        public string goods_symbol                { set; get; }
        public string goods_name                  { set; get; }
        public string group_code                  { set; get; }
        public string customer_symbol             { set; get; }
        public decimal? price                       { set; get; }
        public string creditor_account            { set; get; }
        public string debitor_account             { set; get; }
        public string fee_code                    { set; get; }
        public string case_code                   { set; get; }
        public string department_symbol           { set; get; }
        public string construction_id             { set; get; }
        public decimal? conversion_factor           { set; get; }
        public decimal? conversion_quantity         { set; get; }
        public decimal? conversion_price            { set; get; }
        public int? language_id { set; get; }
    }
}
