using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Export.Dto
{
    public class SYS_Report_Infomation_Detail_Signature_Employee_ENTITY
    {
        public string avarta { get; set; }
        public string avarta_base64 { get; set; }
        public string avarta_base64_256x256 { get; set; }
        public string id_card { get; set; }//CMND
        public DateTime? birthday { get; set; }
        public string birthday_f { get; set; }
        public string title_code { get; set; }
        public string title_name { get; set; }
        public string position_code { get; set; }
        public string position_name { get; set; }
        public string branch_code { get; set; }
        public string branch_name { get; set; }
        public string email { get; set; }//Cá nhân
        public string email_company { get; set; }//công ty
        public string employee_code { get; set; }
        public string employee_name { get; set; }
        public int? level { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string full_name { get; set; }
        public string phone { get; set; }
        public string user_login { get; set; }
        public string sex_name { get; set; }//Giới tính
        public string role_name { get; set; }
        public string sub_role_name { get; set; }
        public string default_sign { get; set; }
        public string date_sign { get; set; }
        public string sign_fullname { get; set; }
    }
    public class SYS_Report_Infomation_Detail_Signature_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string employee_code { get; set; }
        public string sys_report_infomation_detail_code { get; set; }
        public int? position { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public bool? is_role_name { get; set; }
        public bool? is_sub_role_name { get; set; }
        public bool? is_show_default_sign { get; set; }
        public bool? is_show_date_sign { get; set; }
        public bool? is_show_sign_fullname { get; set; }
        public int? language_id { get; set; }
        public int? from_index { get; set; }
        public string role_name { get; set; }
        public string sub_role_name { get; set; }
        public string show_default_sign { get; set; }
        public string show_date_sign { get; set; }
        public string show_sign_fullname { get; set; }
        public string text { get; set; }
        public SYS_Report_Infomation_Detail_Signature_Employee_ENTITY employee_info { get; set; }
    }
}
