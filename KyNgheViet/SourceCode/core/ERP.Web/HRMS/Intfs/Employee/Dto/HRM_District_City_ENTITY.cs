using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_District_City_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string city { get; set; }
        public string city_id { get; set; }
        public string district { get; set; }
        public string district_id { get; set; }
        public string sub_district { get; set; }
        public string sub_district_id { get; set; }
        public string type { get; set; }
    }
}
