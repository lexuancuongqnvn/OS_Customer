using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_Holiday_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public DateTime? start_date { get; set; }
        public int? start_day { get; set; }
        public int? start_month { get; set; }
        public int? total_day { get; set; }
        public string start_date_f { get; set; }
        public string start_date_f_en { get; set; }
        public DateTime? end_date { get; set; }
        public DateTime? start_date_lunar { get; set; }
        public DateTime? end_date_lunar { get; set; }
        public bool? is_lunar { get; set; }
        public string lunar_name { get; set; }
        public int? end_day { get; set; }
        public int? year { get; set; }
        public int? end_month { get; set; }
        public string end_date_f_en { get; set; }
        public string end_date_f { get; set; }

    }
}
