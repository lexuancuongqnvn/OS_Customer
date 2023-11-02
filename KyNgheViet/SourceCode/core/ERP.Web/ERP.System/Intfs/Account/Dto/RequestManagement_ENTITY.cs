using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Account.Dto
{
    public class RequestManagement_ENTITY
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public DateTime? LastRequest { get; set; }
        public DateTime? FirstRequest { get; set; }
        public string countLogin { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int? TimeOut { get; set; }
        public string UserAgent { get; set; }
        public string Sec_ch_ua { get; set; }
        public string Sec_ch_ua_platform { get; set; }
        public Boolean? ISONLINE { get; set; }
        public string lastonlile { get; set; }
        public int? Hour_LastLogin { get; set; }
        public string browser { get; set; }
        public string browser_version { get; set; }
        public string device { get; set; }
        public string deviceType { get; set; }
        public string orientation { get; set; }
        public string os { get; set; }
        public string os_version { get; set; }
    }
}
