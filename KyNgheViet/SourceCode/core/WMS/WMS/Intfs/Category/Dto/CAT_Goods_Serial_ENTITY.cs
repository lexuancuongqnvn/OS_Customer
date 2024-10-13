using Abp;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Category.Dto
{
    public class CAT_Goods_Serial_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string sku { get; set; }
        public string serial { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string goods_code { get; set; }
        public string company_code { get; set; }
        public int? language_id { get; set; }
        public string model { get; set; }
        public string cpu { get; set; }
        public int? ram { get; set; }
        public int? hdd { get; set; }
        public string hdd_unit { get; set; }
        public int? ssd { get; set; }
        public string ssd_unit { get; set; }
        public string lcd { get; set; }
    }
}
