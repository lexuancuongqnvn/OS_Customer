using System;
using System.Collections.Generic;
using System.Text;
using POS.Intfs.Product.Dto;

namespace WMS.Intfs.Warehouse.Dto
{
    public class WMS_Warehouse_Goods_Receipt_ENTITY
    {
        public int ID { get; set; } 
        public string code { get; set; }
        public string deliver { get; set; }
        public DateTime? date_import { get; set; }
        public string date_import_f { get; set; }
        public DateTime? time_import { get; set; }
        public string time_import_f { get; set; }
        public string goods_receipt_code { get; set; }
        public string delivery_partner_code { get; set; }
        public string delivery_partner_name { get; set; }
        public decimal? total { get; set; }
        public string total_f { get; set; }
        public string notes { get; set; }
        public string type_of_document { get; set; }
        public string status_code { get; set; }
        public string status_name { get; set; }
        public string xml { get; set; }
        public string type { get; set; }
        public string filter { get; set; }
        public DateTime? date_modified { get; set; }
        public List<WMS_Warehouse_Goods_Receipt_Detail_ENTITY> wMS_Warehouse_Goods_Receipt_Details { get; set; }     
    }
}
