using Common.Models.Request;
using ERP.Common.TokenAuthentication;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Common.Models
{
    public class User
    {
        public int id { get; set; }
        public int status { get; set; }
        public int language_id { get; set; }
        public string message { get; set; }
        public string code { get; set; }
        public int roleID { get; set; }
        public string roleName { get; set; }
        public string avatar { get; set; }
        public string lastName { get; set; }
        public string firstName { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string tokens { get; set; }
        public Token token { get; set; }
        public RequestModel requestModel { get; set; }
        public Colors colors { get; set; }
        public int languageId { get; set; }
        public int? level { get; set; }
        public string browser { get; set; }
        public string browser_version { get; set; }
        public string device { get; set; }
        public string deviceType { get; set; }
        public string orientation { get; set; }
        public string os { get; set; }
        public string os_version { get; set; }
        public string userAgent { get; set; }
        public string branch { get; set; }
        public string branch_name { get; set; }
        public string department { get; set; }
        public string title_code { get; set; }
        public string position_code { get; set; }
        public string fire_base_token { get; set; }
      
        public int? color_id { get; set; }
        public bool? is_clear_cache { get; set; }
        public int voucher_year { get; set; }  
        public string company_code { get; set; }
        public string voucher_code { get; set; }
        public string mail_domain { get; set; }
    }
}
