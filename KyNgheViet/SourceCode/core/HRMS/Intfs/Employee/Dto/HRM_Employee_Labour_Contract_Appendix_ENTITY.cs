using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Labour_Contract_Appendix_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string contract_code { get; set; }
        public string name { get; set; }
        public string name_f { get; set; }
        public string salary_name { get; set; }
        public decimal? salary { get; set; }
        public string unit { get; set; }
        public int? taget  { get; set; }
        public int? taget_default { get; set; }
        public string taget_default_f { get; set; }
        public string taget_unit { get; set; }
        public string type { get; set; }
        public string action { get; set; }
        public string employee_code { get; set; }
        public decimal? salesed { get; set; }
        public decimal? sales { get; set; }
        public string sales_f { get; set; }   
        public decimal? ratio { get; set; }
        public string ratio_f { get; set; }
        public int? year { get; set; }
        public int? month { get; set; }
        public bool? is_close { get; set; }
        public string appendix_type { get; set; }
        public string html_close { get; set; }
        public string xml_appendex_detail { get; set; }
        public List<HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY> hRM_Employee_Labour_Contract_Appendix_Target_Details { get; set; }
        public List<HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY> HRM_Employee_Labour_Contract_Appendix_Target_Sale_Levels { get; set; }
    }
}
