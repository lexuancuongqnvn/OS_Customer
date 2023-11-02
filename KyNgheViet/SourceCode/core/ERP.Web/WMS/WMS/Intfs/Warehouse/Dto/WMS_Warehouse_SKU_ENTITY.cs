using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Warehouse.Dto
{
    public class WMS_Warehouse_SKU_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string symbol_brand { get; set; }
        public string notes_brand { get; set; }
        public string symbol_description { get; set; }
        public string notes_description { get; set; }
        public string symbol_time { get; set; }
        public DateTime? notes_time { get; set; }
        public string notes_time_f { get; set; }
        public string symbol_warehouse { get; set; }
        public string notes_warehouse { get; set; }
        public string notes_warehouse_name { get; set; }
        public string symbol_size { get; set; }
        public string notes_size { get; set; }
        public string symbol_color { get; set; }
        public string notes_color { get; set; }
        public string type { get; set; }
        public string sku { get; set; }
    }
}
