using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Report_I43_ENTITY : IBase_ENTITY
    {
        public string code { set; get; }
        public string company_code { set; get; }
        public string warehouse_code { set; get; }
        public string warehouse_name { set; get; }
        public string warehouse_symbol { set; get; }
        public int? numerical_order { set; get; }
        public string voucher_code { set; get; }
        public DateTime? voucher_date { set; get; }
        public DateTime? voucher_date_start { set; get; }
        public DateTime? voucher_date_end { set; get; }
        public string voucher_no { set; get; }
        public string customer_code { set; get; }
        public string address { set; get; }
        public string profession_code { set; get; }
        public string notes { set; get; }
        public string code_fc { set; get; }
        public string code_name { get; set; }
        public string symbol_fc { get; set; }
        public decimal? exchange_rate { set; get; }
        public decimal? total_money_fc { set; get; }
        public decimal? total_money { set; get; }
        public string customer_name { set; get; }
        public string ref_value { set; get; }
        public DateTime? date_add { set; get; }
        public DateTime? date_modified { set; get; }
        public string account_code_add { set; get; }
        public string account_code_modified { set; get; }
        public string name_fc { set; get; }
        public int? voucher_year { set; get; }
        public string xml_43d { set; get; }
        public int id { get; set; }
        public int? language_id { get; set; }
        public string code_symbol        { get; set; }
        public string unit_name          { get; set; }
        public decimal? quantity           { get; set; }
        public decimal? price_fc           { get; set; }
        public decimal? price              { get; set; }
        public decimal? arise_fc           { get; set; }
        public decimal? arise              { get; set; }
        public string creditor_account   { get; set; }
        public string debitor_account    { get; set; }
        public string fee_code           { get; set; }
        public string case_code          { get; set; }
        public string department_name    { get; set; }
        public string construction_name  { get; set; }
        public decimal? conversion_factor  { get; set; }
        public decimal? conversion_quantity { get; set; }
        public decimal? conversion_price   { get; set; }
        public string goods_name         { get; set; }
    }
}
