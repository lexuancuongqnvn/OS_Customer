using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Intfs.Product.Dto
{
    public class POS_Product_ENTITY
    {
        public int ID { get; set; }  
        public string code { get; set; }
        public string name { get; set; }
        public string sku { get; set; }
        public string avartar { get; set; }
        public string images { get; set; }
        public string group_code { get; set; }
        public string group_code_name { get; set; }
        public string sku_code { get; set; }
        public string barcode { get; set; }
        public decimal? purchase_price { get; set; }
        public string purchase_price_f { get; set; }
        public decimal? price { get; set; }
        public string price_f { get; set; }
        public string unit_code { get; set; }
        public string unit_code_name { get; set; }
        public int? inventory_level_min { get; set; }
        public int? inventory_level_max { get; set; }
        public Boolean? business_status { get; set; }
        public string business_status_name { get; set; }
        public string color_code { get; set; }
        public string size_code { get; set; }
        public string size_code_name { get; set; }
        public decimal? weight { get; set; }
        public decimal? size_hieght { get; set; }
        public decimal? size_width { get; set; }
        public decimal? size_length { get; set; }
        public string warehouse_location { get; set; }
        public string display_location { get; set; }
        public string notes { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public int? account_id { get; set; }
        public string type { get; set; }

    }
}
