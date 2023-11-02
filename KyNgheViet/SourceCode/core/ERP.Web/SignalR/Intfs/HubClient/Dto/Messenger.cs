using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Intfs.HubClient.Dto
{
    public class Messenger
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string account_id { get; set; }
        public string account_send { get; set; }
        public string to_user { get; set; }
        public string to_user_last_name { get; set; }
        public string to_user_first_name { get; set; }
        public string message { get; set; }
        public DateTime? time_add { get; set; }
        public int chat_id { get; set; }
        public string message_id { get; set; }
        public string type { get; set; }
        public string tag { get; set; }
        public string message_text { get; set; }
        public int message_new { get; set; }
        public ChatModel chatModel { get; set; }
        public List<FileModel> message_images { get; set; }
        public List<FileModel> message_files { get; set; }
        public Boolean? is_remove { get; set; }
        public DateTime? time_remove { get; set; }
        public List<string> list_user { get; set; }

    }
}
