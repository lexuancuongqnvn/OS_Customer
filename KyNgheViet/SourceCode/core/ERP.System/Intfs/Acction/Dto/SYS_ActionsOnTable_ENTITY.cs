using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Acction.Dto
{
    public class SYS_ActionsOnTable_Permission_ENTITY
    {
        public int id { get; set; }
        public string tbName { get; set; }
        public string code { get; set; }
        public string code_menu_sub { get; set; }
        public string xml { get; set; }
        public int? userID { get; set; }
        public int? language_id { get; set; }
        public List<SYS_ActionsOnTable_Permission_Detail_ENTITY> details { get; set; }
    }
    public class SYS_ActionsOnTable_Permission_Detail_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string code_menu_sub { get; set; }
        public string name { get; set; }
        public string tbName { get; set; }
        public string xml { get; set; }
        public int? userID { get; set; }
        public int? language_id { get; set; }
        public bool? active { get; set; }
        public string permission { get; set; }
    }
    public class SYS_ActionsOnTable_ENTITY : ISYS
    {

        public int id { get; set; }
        public int? colAccountID { get; set; }
        public bool?  Active { get; set; }
        public bool?  Role { get; set; }
        public string Name { get; set; }
        public int? indexRow { get; set; }
        public string Link { get; set; }
        public string tbName { get; set; }
        public string StoredName { get; set; }
        public string OnInit { get; set; }
        public string ClassForm { get; set; }
        public string OnForm { get; set; }
        public string icon { get; set; }
        public int? Position { get; set; }
        public int? userID { get; set; }
        public int? language_id { get; set; }
        public string KeyService { get; set; }
        public string Permission { get; set; }
        public string NAME_VN { get; set; }
        public string NAME_EN { get; set; }
        public string Param { get; set; }
        public string RollBack { get; set; }
        public string RollNext { get; set; }
        public string LIST_ACCTIONS { get; set; }
        public string ICON_APP_IOS { get; set; }
        public string ICON_APP_ANDROID { get; set; }
        public string icon_color { get; set; }

        public string code { get; set; }
        public bool? APPROVE { get; set; }
        public DateTime? DATE_ADD { get; set; }
        public DateTime? DATE_EDIT { get; set; }
        public int? ACCOUNT_ID { get; set; }
        public string NOTES { get; set; }
        public string DECENTRALIZATION { get; set; }
    }
}
