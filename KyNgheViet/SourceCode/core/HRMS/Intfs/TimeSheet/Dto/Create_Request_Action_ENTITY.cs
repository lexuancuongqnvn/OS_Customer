using HRMS.Intfs.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.TimeSheet.Dto
{
    public class Create_Request_Action_ENTITY
    {
        public string employee_code { get; set; }
        public string work_shift_code { get; set; }
        public List<HRM_TimeSheet_Work_Shift_ENTITY> hRM_TimeSheet_Work_Shifts { get; set; }
        public HRM_Employee_Log_Paid_Holiday_ENTITY hRM_Employee_Log_Paid_Holiday { get; set; }
    }
}
