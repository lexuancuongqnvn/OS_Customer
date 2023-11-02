using System;
using System.Collections.Generic;
using System.Text;

namespace SignalR.Intfs.Notification.Dto
{
    public class Notification_Setting_ENTITY
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool? active { get; set; }
        public string code { get; set; }
        public int? group_id { get; set; }
        public string group_name { get; set; }
        public string employee_code { get; set; }
    }
}
