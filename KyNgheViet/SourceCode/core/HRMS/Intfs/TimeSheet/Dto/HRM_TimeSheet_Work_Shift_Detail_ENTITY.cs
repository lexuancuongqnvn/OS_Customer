using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Work_Shift_Detail_ENTITY
    {
        public int? ID { get; set; }
        public string code { get; set; }
        public string work_shift_code { get; set; }
        public DateTime? start_time { get; set; }
        public DateTime? end_time { get; set; }
        public decimal? total_time { get; set; }
        public string name { get; set; }
        public decimal? relax { get; set; }
        public int? hour_start_relax { get; set; }
        public int? hour_end_relax { get; set; }
        public DateTime? start_relax { get; set; }
        public DateTime? end_relax { get; set; }
        public Boolean? is_apply { get; set; }
        public Boolean? is_checkin_relax { get; set; }
        public string apply_name { get; set; }
    }
}
