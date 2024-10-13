using ERP.System.Intfs.Acction.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.System.Intfs.Menu.Dto
{
    public class SYS_Menu_Permission_ENTITY
    {
        public int id { get; set; }
        public string code       {get;set;}
        public string Name       {get;set;}
        public int? master_id  {get;set;} 
        public int? userID { get;set;} 
        public int? language_id { get;set;} 
        public string module { get;set;} 
        public string master_code{get;set;} 
        public string master_name{get;set;}
        public SYS_Menu sys_menu {get;set;}
        public SYS_ActionsOnTable_ENTITY sys_actions_on_table { get;set;}
    }
}
