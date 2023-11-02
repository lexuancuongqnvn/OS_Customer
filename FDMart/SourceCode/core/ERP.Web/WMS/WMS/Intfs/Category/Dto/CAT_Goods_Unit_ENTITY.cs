using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Category.Dto
{
    public class CAT_Goods_Unit_ENTITY : IBase_ENTITY
    {
        public int id { get;set;}
        public string code { get; set; }
        public string goods_code { get; set; }
        public decimal? conversion_coefficient { get; set; }
        public string unit { get; set; }
        public string unit_conversion_factor_name { get; set; }
        public decimal? length { get; set; }
        public decimal? width { get; set; }
        public decimal? quantitative { get; set; }
        public string type { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
    }
}
