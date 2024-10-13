using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Warehouse.Dto
{
    public class WMS_Warehouse_Goods_Issue_ENTITY
    {
        public int ID { get; set; } 
        public string code { get; set; }
        public DateTime? date_export { get; set; }
        public string goods_receipt_code { get; set; }
        public string delivery_partner_code { get; set; }
        public decimal? total { get; set; }
        public string notes { get; set; }
        public string type_of_document { get; set; }
        public DateTime? date_modified { get; set; }
        public string status { get; set; }
        public List<WMS_Warehouse_Goods_Issue_Detail_ENTITY> wMS_Warehouse_Export_Details { get; set; } 
    }
}
