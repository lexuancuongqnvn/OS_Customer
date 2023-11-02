using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Work_Shift_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string day_in_week { get; set; }
        public DateTime? start_time { get; set; }
        public string start_time_f { get; set; }
        public DateTime? end_time { get; set; }
        public string end_time_f { get; set; }
        public DateTime? start_relax { get; set; }
        public string start_relax_f { get; set; }
        public DateTime? end_relax { get; set; }
        public string end_relax_f { get; set; }
        public decimal? total_time { get; set; }
        public decimal? relax { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public Boolean? monday { get; set; }
        public Boolean? tuesday { get; set; }
        public Boolean? wednesday { get; set; }
        public Boolean? thursday { get; set; }
        public Boolean? friday { get; set; }
        public Boolean? saturday { get; set; }
        public Boolean? sunday { get; set; }
        public string employee_code { get; set; }
        public string xml { get; set; }
        public List<AllDayModel> allDay { get; set; }
        public List<HRM_TimeSheet_Work_Shift_Detail_ENTITY> hRM_TimeSheet_Work_Shift_Details { get; set; }
    }
}
