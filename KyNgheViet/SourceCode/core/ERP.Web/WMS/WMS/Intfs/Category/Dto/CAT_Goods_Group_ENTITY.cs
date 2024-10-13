using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Category.Dto
{
    public class CAT_Goods_Group_ENTITY : IBase_ENTITY
    {
        public string code { get; set; }
        public string group_code { get; set; }
        public string code_master { get; set; }
        public string master_name { get; set; }
        public string name { get; set; }
        public string name2 { get; set; }
        public decimal? bobus { get; set; }
        public string type { get; set; }
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
