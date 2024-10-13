using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Category.Dto
{
    public class CAT_Goods_ENTITY : IBase_ENTITY// hàng hóa vật tư
    {
        public int id { get; set; }
        public string code { get; set; }
        public string goods_symbol { get; set; }
        public string name { get; set; }
        public string name2 { get; set; }
        public string part_number { get; set; }
        public string unit_code { get; set; }
        public string unit_name { get; set; }
        public int? inventory { get; set; }
        public string warehouse_account { get; set; }
        public string cogs_account { get; set; }
        public string revenue_account { get; set; }
        public decimal? inventory_max { get; set; }
        public decimal? inventory_min { get; set; }
        public string group_code { get; set; }
        public string group_name { get; set; }
        public int? goods_type { get; set; }
        public string euc_group_code { get; set; }
        public string barcode { get; set; }
        public string mac_code { get; set; }
        public decimal? warranty_month { get; set; }
        public decimal? purchase_price_fc { get; set; }
        public decimal? purchase_price { get; set; }
        public decimal? selling_price_fc { get; set; }
        public decimal? selling_price { get; set; }
        public string tax_code { get; set; }
        public string tax_name { get; set; }
        public string notes { get; set; }
        public string producer_code { get; set; }
        public string standard_code { get; set; }
        public string color_code { get; set; }
        public int? time_goods_arrive { get; set; }
        public decimal? amount_of_consumption { get; set; }
        public string additional1 { get; set; }
        public string additional2 { get; set; }
        public string additional3 { get; set; }
        public string type { get; set; }
        public string serial { get; set; }
        public bool? is_multiple_unit { get; set; }
        public string inventory_valuation_method_code { get; set; }
        public string inventory_valuation_method_name { get; set; }
        public bool? is_inventory_management { get; set; }
        public bool? is_lot_management { get; set; }
        public bool? in_active { get; set; }
        public int? language_id { get; set; }
        public string company_code { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }

        //Thông tin cấu hình máy laptop
        public string sku { get; set; }
        public string model { get; set; }
        public string cpu { get; set; }
        public int? ram { get; set; }
        public int? hdd { get; set; }
        public string hdd_unit { get; set; }
        public int? ssd { get; set; }
        public string ssd_unit { get; set; }
        public string lcd { get; set; }
        public string voucher_code { get; set; }
        public int? voucher_year { get; set; }
    }
}
