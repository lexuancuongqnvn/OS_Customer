using System;
using System.Collections.Generic;
using System.Text;

namespace POS.Intfs.Product.Dto
{
    public class POS_Product_Gift_ENTITY
    {
        public int ID { get; set; }  
        public string code { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string notes { get; set; }
        public int? type_gift { get; set; }
        public string type_gift_name { get; set; }
        public int? type_value { get; set; }
        public string type_value_name { get; set; }
        public decimal? value { get; set; }
        public DateTime? start_date { get; set; }
        public string start_date_f { get; set; }
        public DateTime? end_date { get; set; }
        public string end_date_f { get; set; }
        public Boolean? status { get; set; }
        public string status_name { get; set; }
        public decimal? order_value { get; set; }

    }
}
