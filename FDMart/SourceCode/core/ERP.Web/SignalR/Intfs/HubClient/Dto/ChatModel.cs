using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace SignalR.Intfs.HubClient.Dto
{
    public class ChatModel
    {
        public int? chat_id { get; set; } 
        public int? new_message { get; set; } 
        public string chat_name { get; set; } 
        public string title { get; set; } 
        public string body { get; set; } 
        public string to { get; set; }
        public string from { get; set; }
        public ArrayList arr_to { get; set; }
        public string image_url { get; set; } 
        public string user_create { get; set; } 
        public string tag { get; set; }
        public string type { get; set; }
        public string list_user { get; set; }
        public string chat_review { get; set; }
        public string my_avt { get; set; }
        public string client_avt { get; set; }
        public string group_avt { get; set; }
        public string user_login { get; set; }
        public string XML { get; set; }
        public string background { get; set; }
        public DateTime? chat_time { get; set; }
        public string chat_time_f { get; set; }
        public Boolean? is_view { get; set; }
        public List<Chat_ContentModel> Chat_Content {  get; set; }
       
    }
}
