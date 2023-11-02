using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Labour_Contract_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string ref_code { get; set; }
        public int? status { get; set; }
        public string message { get; set; }
        public string contract_code { get; set; }
        public string contract_type_code { get; set; }
        public string contract_type_name { get; set; }
        public string employee_id { get; set; }
        public string employee_code { get; set; }
        public string employee_name { get; set; }
        public string department_code { get; set; }
        public string department_name { get; set; }
        public string xml_appendex { get; set; }
        public string xml_salary { get; set; }
        public string xml_curriculum_vitae { get; set; }
        public string xml_salary_deduction { get; set; }
        public string xml_sale_level { get; set; }
        public DateTime? begin_date { get; set; }
        public string begin_date_f { get; set; }
        public DateTime? end_date { get; set; }
        public string end_date_f { get; set; }
        public string form { get; set; }
        public decimal? salary { get; set; }
        public decimal? salary_percent { get; set; }
        public decimal? allowance_rice { get; set; }
        public decimal? allowance_phone { get; set; }
        public decimal? allowance_petrol { get; set; }
        public decimal? allowance_position { get; set; }
        public decimal? allowance_transportation { get; set; }
        public decimal? allowance_kpi { get; set; }
        public decimal? allowance_holiday { get; set; }
        public decimal? allowance_bonus { get; set; }
        public decimal? paid_holiday { get; set; }
        public int? month { get; set; }
        public int? year { get; set; }
        public List<HRM_Employee_Labour_Contract_Appendix_ENTITY> hRM_Employee_Labour_Contract_Appendixs { get; set; }
        public List<HRM_Employee_Labour_Contract_Salary_ENTITY> hRM_Employee_Labour_Contract_Salarys { get; set; }
        public List<HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY> hRM_Employee_Labour_Contract_Curriculum_Vitaes { get; set; }//thông tin hộ gia đình
        public List<HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY> hRM_Employee_Labour_Contract_Salary_Deductions { get; set; }//thông tin hộ gia đình
        public List<HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY> HRM_Employee_Labour_Contract_Appendix_Target_Sale_Levels { get; set; }//Danh sách level chia doanh số
    }
}
