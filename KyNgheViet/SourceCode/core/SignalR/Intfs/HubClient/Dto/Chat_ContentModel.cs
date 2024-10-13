using System;
using System.Collections.Generic;
using System.Text;

namespace SignalR.Intfs.HubClient.Dto
{
    public class Chat_ContentModel
    {
        public string chat_content_id { get; set; }
        public int? chat_id { get; set; }
        public string user_send { get; set; }
        public string to_user { get; set; }
        public string message_text { get; set; }
        public string message_img { get; set; }
        public string message_file { get; set; }
        public string status { get; set; }
        public string client_avt { get; set; }
        public string[] arr_img { get; set; }
        public string[] arr_file { get; set; }
        public DateTime? time_send { get; set; }
        public Boolean? is_remove { get; set; }
        public Boolean? is_view { get; set; }
    }
}
