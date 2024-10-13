using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infs.Report.Dto
{
    public class Sales_Report_Inventory_Materials_ENTITY:IBase_ENTITY
    {
        public string code { get; set; }
        public string warehouse_code { get; set; }
        public string goods_code { get; set; }
        public string goods_name { get; set; }
        public string goods_symbol { get; set; }
        public string unit_name { get; set; }
        public decimal? ending_inventory_quantity { get; set; }
        public decimal? beginning_period_defective_quantity { get; set; }
        public int id { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
