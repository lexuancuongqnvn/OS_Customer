using ERP.System.Intfs.Common.Dto;
using HRMS.Intfs.Branch.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Export.Dto
{
    public class SYS_Report_Infomation_ENTITY
    {
        public int id { get; set; }
        public string code    { get; set; }
        public string name { get; set; }
        public string report_name { get; set; }
        public string company_code { get; set; }
        public string table_name { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string default_version { get; set; }
        public string employee_code { get; set; }
        public string employee_name { get; set; }
        public string xml_detail { get; set; }
        public string xml_sign { get; set; }
        public int? language_id { get; set; }
        public bool? is_default { get; set; }
        public bool? is_pdf { get; set; }
        public string report_type { get; set; }
        public string report_icon { get; set; }
        public string type { get; set; }
        public bool? is_reference { get; set; }
        public bool? is_logo { get; set; }
        public bool? is_branch { get; set; }
        public string column_logo { get; set; }
        public string reference { get; set; }
        public string branch_code_default { get; set; }
        public List<SYS_List_Company_ENTITY> sYS_List_Companys { get; set; }
        public List<HRM_Branch_ENTITY> hRM_Branchs { get; set; }
        public List<SYS_Report_Infomation_Detail_ENTITY> sYS_Report_Infomation_Details { get; set; }
    }
}
