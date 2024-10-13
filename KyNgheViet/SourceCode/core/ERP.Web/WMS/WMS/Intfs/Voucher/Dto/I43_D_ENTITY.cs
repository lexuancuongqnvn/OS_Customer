using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Voucher.Dto
{
    public class I43_D_ENTITY : IBase_ENTITY
    {
        public DateTime? voucher_date { set; get; }
        public string voucher_code { set; get; }
        public int? voucher_year { set; get; }
        public string code { set; get; }
        public string master_code { set; get; }
        public string goods_code { set; get; }
        public string unit_code { set; get; }
        public string warehouse_code { set; get; }
        public decimal? quantity { set; get; }
        public decimal? price_fc { set; get; }
        public decimal? price { set; get; }
        public decimal? arise_fc { set; get; }
        public decimal? arise { set; get; }
        public string creditor_account { set; get; }
        public string debitor_account { set; get; }
        public string fee_code { set; get; }
        public string case_code { set; get; }
        public string department_code { set; get; }
        public string goods_code_1 { set; get; }
        public int? numerical_order { set; get; }
        public string construction_id { set; get; }
        public string goods_name { set; get; }
        public decimal? conversion_factor { set; get; }
        public decimal? conversion_quantity { set; get; }
        public decimal? conversion_price { set; get; }
        public DateTime? date_add { set; get; }
        public DateTime? date_modified { set; get; }
        public string account_code_add { set; get; }
        public string account_code_modified { set; get; }
        public int id { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public bool? is_spec_iden { get; set; }
    }
}
