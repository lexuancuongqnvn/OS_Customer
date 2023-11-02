using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Common.Dto
{
    public class SYS_List_Company_ENTITY
    {
        public int id { get;set;} 
        public string code { get; set; }
        public string name { get; set; }
        public string domain { get; set; }
        public string api { get; set; }
        public string api_ai { get; set; }
        public string address { get; set; }
        public string mail_domain { get; set; }
        public string domain_webapp { get; set; }
        public bool? isLogin { get; set; }
        public string tax { get; set; }
        public DateTime? birth_day { get; set; }
        public string phone { get; set; }
        public string tel { get; set; }
        public string hotline { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
    }
}
