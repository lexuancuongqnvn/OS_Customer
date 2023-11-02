using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Common.Models
{
    public class LicenseModel
    {
        public int ID { get; set; } 
        public string name { get; set; }
        public string location { get; set; }
        public string mac { get; set; }
        public string key { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string connectstring { get; set; }
        public Boolean? active { get; set; }
    }
}
