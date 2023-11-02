using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Report.Dto
{
    public class WMS_Report_Inventory_Import_Export_ENTITY:IBase_ENTITY
    {
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string code { get; set; }
        public string group_code {get;set;}
        public string goods_code {get;set;}
        public string warehouse_symbol { get;set;}
        public string goods_symbol {get;set;}
        public string goods_name {get;set;}
        public string unit_name {get;set;}
        public decimal? ob_inventory_quantity {get;set;}
        public decimal? opening_balance {get;set;}
        public decimal? quantity_import {get;set;}
        public decimal? price_import {get;set;}
        public decimal? quantity_export {get;set;}
        public decimal? price_export {get;set;}
        public decimal? ending_inventory_quantity {get;set;}  
        public decimal? ending_balance {get;set;}
        public int id {get;set;}
        public int? language_id {get;set;}
        public string company_code {get;set;}
        public DateTime? date_add {get;set;}
        public DateTime? date_modified {get;set;}
        public string account_code_add {get;set;}
        public string account_code_modified {get;set;}
    }
}
