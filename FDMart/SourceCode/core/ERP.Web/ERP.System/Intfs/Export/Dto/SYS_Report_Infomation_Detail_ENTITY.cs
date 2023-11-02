using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Export.Dto
{
    public class SYS_Report_Infomation_Detail_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public bool? is_co_name { get; set; }
        public bool? is_co_address { get; set; }
        public bool? is_co_tax { get; set; }
        public bool? is_co_phone { get; set; }
        public bool? is_co_tel { get; set; }
        public bool? is_co_hotline { get; set; }
        public bool? is_qrcode { get; set; }
        public bool? is_title { get; set; }
        public bool? is_title_footer { get; set; }
        public bool? is_no_footer { get; set; }
        public string title_footer { get; set; }
        public string no_footer { get; set; }
        public string color_title_footer { get; set; }
        public string color_no_footer { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public string version_code { get; set; }
        public string master_code { get; set; }
        public int? language_id { get; set; }
        public int? from_index { get; set; }
        public string role_name { get; set; }
        public string sub_role_name { get; set; }
        public string show_default_sign { get; set; }
        public string show_date_sign { get; set; }
        public string show_sign_fullname { get; set; }

        public List<SYS_Report_Infomation_Version_ENTITY> sYS_Report_Infomation_Versions { get; set; }
        public List<SYS_Report_Infomation_Detail_Signature_ENTITY> sYS_Report_Infomation_Detail_Signatures { get; set; }

    }
}
