using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.WorkingTime.Dto
{
    public class HRM_WorkingTime_ENTITY
    {
        public int ID { get; set; }
        public decimal? Hour { get; set; }
        public string Name { get; set; }
        public DateTime? start { get; set; }
        public DateTime? end { get; set; }
    }
}
