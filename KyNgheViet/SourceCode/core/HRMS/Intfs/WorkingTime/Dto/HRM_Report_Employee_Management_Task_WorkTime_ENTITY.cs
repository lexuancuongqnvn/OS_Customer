using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.WorkingTime.Dto
{
    public class HRM_Report_Employee_Management_Task_WorkTime_ENTITY
    {
		public int? id { get; set; }
		public string employee_code { get; set; }
		public DateTime? date_work { get; set; }
		public DateTime? start_date { get; set; }
		public DateTime? end_date { get; set; }
		public string date_work_f { get; set; }
		public string date_work_name { get; set; }
		public Double? hour_work { get; set; }
		public string description_work { get; set; }

	}
}
