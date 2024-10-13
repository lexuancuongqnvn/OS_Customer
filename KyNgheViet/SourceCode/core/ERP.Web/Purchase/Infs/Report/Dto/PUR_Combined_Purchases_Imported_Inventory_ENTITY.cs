using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.Infs.Report.Dto
{
    public class PUR_Combined_Purchases_Imported_Inventory_ENTITY:IBase_ENTITY
    {
        public string warehouse_code { get; set; }
        public string warehouse_name { get; set; }
        public string goods_code { get; set; }
        public string goods_name { get; set; }
        public string goods_symbol { get; set; }
        public string goods_unit_name { get; set; }
        public decimal? quantity { get; set; }
        public string goods_money { get; set; }
        public string goods_money_fc { get; set; }
        public decimal? cost { get; set; }
        public decimal? cost_fc { get; set; }
        public decimal? arise_debit { get; set; }
        public decimal? arise_debit_fc { get; set; }
        public string goods_group_code { get; set; }
        public string group_goods_name { get; set; }
        public string unit_name { get; set; }
        public int id {get;set;}
        public int? language_id {get;set;}
        public string voucher_code {get;set;}
        public int? voucher_year {get;set;}
        public string code {get;set;}
        public string company_code {get;set;}
        public DateTime? date_add {get;set;}
        public DateTime? date_modified {get;set;}
        public string account_code_add {get;set;}
        public DateTime? voucher_date { get; set; }
        public DateTime? voucher_date_start { get; set; }
        public DateTime? voucher_date_end { get; set; }
        public string account_code_modified {get;set;}
    }
}
