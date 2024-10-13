using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Notification.Dto
{
    public class Notification_HRM_ENTITY
    {
        public int id { get; set; } 
        public int? new_message { get; set; }
        public string title { get; set; }
        public string message { get; set; }
        public string link_direct { get; set; }
        public DateTime? time_add { get; set; }
        public string type { get; set; }
        public Boolean? isView { get; set; }
        public Boolean? isRead { get; set; }
        public string string_time { get; set; }
        public int? account_id { get; set; }
        public string account_avarta { get; set; }
        public string account_avarta_text { get; set; }
        public int? total { get; set; }
        public int? top { get; set; }
        public string module { get; set; }
        public string code_in_form { get; set; }
        public string component_app { get; set; }
        public string component_name { get; set; }
    }
}
