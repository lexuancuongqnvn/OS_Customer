using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Costing_Price_ENTITY
    {
        public string voucher_detail_code { get; set; }
        public DateTime? from_date { get; set; }
        public DateTime? to_date { get; set; }
        public string warehouse_code { get; set; }
        public string goods_code { get; set; }
        public decimal? price { get; set; }
        public decimal? quantity_export { get; set; }
        public string company_code { get; set; }
    }
    public class WMS_Costing_Run_Process_ENTITY
    {
        public DateTime? date_modified { get; set; }
        public string account_code_modified { get; set; }
        public string company_code { get; set; }
        public int month { get; set; }
        public int voucher_year { get; set; }
    }
    public class WMS_Average_Cost_Sheet_ENTITY:IBase_ENTITY
    {
        public int id { get; set; }
        public string company_code { get; set; }
        public string warehouse_code { get; set; }
        public string warehouse_symbol { get; set; }
        public string warehouse_name { get; set; }
        public string goods_code { get; set; }
        public string goods_symbol { get; set; }
        public string goods_name { get; set; }
        public decimal? quantity { get; set; }
        public decimal? arise_debit { get; set; }
        public decimal? price { get; set; }
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string group_code { get; set; }
        public string warehouse_account { get; set; }
        public string discrepancies_account { get; set; }
        public int? inventory_valuation_method { get; set; }
        public int? from_month { get; set; }
        public int? to_month { get; set; }
        public int? language_id { get; set; }
        public int? voucher_year { get; set; }
        public string code { get; set; }
        public string voucher_code { get; set; }
        public string voucher_no{ get; set; }
        public string starts_with_m { get; set; }
        public bool? is_costing { get; set; }
    }
}
