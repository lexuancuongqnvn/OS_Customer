using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY
    {
        public int? ID { get; set; }
        public int? stt { get; set; }
        public string code { get; set; }
        public int? group { get; set; }
        public string list_appendix_target_code { get; set; }
        public string appendix_target_code { get; set; }
        public string appendix_target_name { get; set; }
        public decimal? sales { get; set; }
        public string sales_f { get; set; }
        public string notes { get; set; }
        public string type { get; set; }
        public DateTime? sales_date { get; set; }
        public DateTime? sales_date_from { get; set; }
        public DateTime? sales_date_to { get; set; }
        public string sales_date_f { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string contact_code { get; set; }
        public string contact_name { get; set; }
        public string contact_phone { get; set; }
        public string machine_code { get; set; }
        public string machine_serial { get; set; }
        public string machine_name { get; set; }
        public string machine_type { get; set; }
        public string machine_type_name { get; set; }
        public decimal? machine_value { get; set; }
        public string machine_value_f { get; set; }
        public int? asia { get; set; }
        public decimal? machine_sale { get; set; }
        public decimal? machine_buy { get; set; }
        public decimal? profit { get; set; }
        public bool? is_approve { get; set; }
        public string is_approve_f { get; set; }
        public string employee_code { get; set; }
        public string employee_name { get; set; }
        public string name_target { get; set; }

        public int? month { get; set; }
        public int? year { get; set; }

    }
}
