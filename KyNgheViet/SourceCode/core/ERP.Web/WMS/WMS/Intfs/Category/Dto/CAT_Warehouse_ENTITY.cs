using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Category.Dto
{
    public class CAT_Warehouse_ENTITY : IBase_ENTITY//Danh mục kho
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string name2 { get; set; }
        public string address { get; set; }
        public string symbol { get; set; }
        public string type { get; set; }
        public DateTime? date_add { set; get; }
        public DateTime? date_modified { set; get; }
        public string account_code_add { set; get; }
        public string account_code_modified { set; get; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
