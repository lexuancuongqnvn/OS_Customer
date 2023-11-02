using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.System.Intfs.Menu.Dto
{
    public class SYS_Menu_Sub 
    {
        public int ID { get; set; }
        public int LOCATION { get; set; }
        public string CODE { get; set; }
        public string NAME_VN { get; set; }
        public string NAME_EN { get; set; }
        public string NAME { get; set; }
        public int? userID { get; set; }
        public Boolean? ACTIVE { get; set; }
        public string DECENTRALIZATION { get; set; }
        public string ICON { get; set; }
        public string ICON_APP_IOS { get; set; }
        public string ICON_APP_ANDROID { get; set; }
        public string LINK { get; set; }
        public string FATHER { get; set; }
        public string LIST_ACCTIONS { get; set; }
        public string type { get; set; }

        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string MODULE { get; set; }
        public bool? APPROVE { get; set; }
        public string PARAM { get; set; }
        public string COMPONENT_APP { get; set; }
        public Boolean? IS_SHOW_APP { get; set; }
        public bool? IS_ROUTER_LINK { get; set; }
    }
}