using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class HRM_TimeSheet_Detail_ENTITY
    {
       public int ID { get; set; }
        public int? TimeSheet_ID { get; set; }
        public Boolean? Checkin { get; set; }
        public DateTime? TimeCheckin { get; set; }
        public Boolean? Checkout { get; set; }
        public DateTime? TimeCheckout { get; set; }
        public int? Task_ID { get; set; }
        public string Task_Description { get; set; }
        public string Notes { get; set; }
    }
}
