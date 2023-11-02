using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace SignalR.Intfs.HubClient.Dto
{
    public class NotificationModel
    {
        public int id { get; set; }
        public int? new_message { get; set; }
        public int? account_id { get; set; }
        public string user_send { get; set; }
        public string client_avt { get; set; }
        public int? top { get; set; }
        public int? total { get; set; }
        public string code { get; set; }
        public string title { get; set; }
        public string message { get; set; }
        public string link_direct { get; set; }
        public string type { get; set; }
        public string string_time { get; set; }
        public ArrayList arr_to { get; set; }
        public DateTime? time { get; set; }
        public Boolean? isView { get; set; }
        public Boolean? isRead { get; set; }
    }
}
