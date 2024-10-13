using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.OB.Dto
{
    public class OB_Goods_ENTITY : IBase_ENTITY
    {
        public string code { get; set; }
        public string warehouse_code { get; set; }
        public string warehouse_name { get; set; }
        public string goods_symbol { get; set; }
        public string goods_code { get; set; }
        public string goods_name { get; set; }
        public decimal? quantity { get; set; }
        public decimal? opening_balance { get; set; }
        public decimal? opening_balance_fc { get; set; }

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
