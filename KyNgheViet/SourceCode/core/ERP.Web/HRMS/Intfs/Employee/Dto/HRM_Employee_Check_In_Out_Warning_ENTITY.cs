using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Check_In_Out_Warning_ENTITY
    {
        public string employee_name { get; set; }
        public List<HRM_Employee_Check_In_Out_ENTITY> list_datas { get; set; }
    }
}
