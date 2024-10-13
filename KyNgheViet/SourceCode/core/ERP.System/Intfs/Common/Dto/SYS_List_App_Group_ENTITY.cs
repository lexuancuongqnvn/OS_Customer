using ERP.System.Intfs.Menu.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Common.Dto
{
    public class SYS_List_App_Group_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string name_vn { get; set; }
        public string name_en { get; set; }
        public string group_module { get; set; }
        public string icon { get; set; }
        public string icon1 { get; set; }
        public string icon2 { get; set; }
        public string icon3 { get; set; }
        public string description { get; set; }
        public string list_account_group { get; set; }
        public string list_account { get; set; }
        public bool? is_show_app { get; set; }
        public string type { get; set; }
        public string user_login { get; set; }
        public List<SYS_Menu> sYS_Menus { get; set; }
        public List<SYS_List_App_ENTITY> sYS_List_Apps { get; set; }

    }
}
