using System;
using System.Collections.Generic;
using System.Text;

namespace WMS.Intfs.Warehouse.Dto
{
    public class WMS_Warehouse_Goods_Issue_Detail_ENTITY
    {
        public int ID {get;set;}
        public string product_code { get; set; }
        public DateTime? date_add { get; set; }
        public string status { get; set; }
    }
}
