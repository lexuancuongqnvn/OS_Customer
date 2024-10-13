using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Warehouse.Dto
{
    public class WMS_Warehouse_Goods_Receipt_Detail_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string sku { get; set; }
        public decimal? purchase_price { get; set; }
        public int? quantity { get; set; }
        public decimal? total { get; set; }
        public string unit_code { get; set; }
        public string warehouse_code { get; set; }
        public string name { get; set; }
    }
}
