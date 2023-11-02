using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Category.Dto
{
    public class CAT_Goods_Unit_Conversion_Factor_ENTITY : IBase_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string goods_code { get; set; }
        public string goods_symbol { get; set; }
        public string unit_code { get; set; }
        public string unit_name { get; set; }
        public string unit_code_conversion_factor { get; set; }
        public string unit_name_conversion_factor { get; set; }
        public decimal? exchange_rate { get; set; }
        public bool? is_active { get; set; }
        public int? language_id { get; set ; }
    }
}
