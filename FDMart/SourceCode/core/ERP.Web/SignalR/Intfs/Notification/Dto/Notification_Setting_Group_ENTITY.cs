using System;
using System.Collections.Generic;
using System.Text;

namespace SignalR.Intfs.Notification.Dto
{
    public class Notification_Setting_Group_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string employee_code { get; set; }
        public List<Notification_Setting_ENTITY> notification_Settings { get; set; }   
    }
}
