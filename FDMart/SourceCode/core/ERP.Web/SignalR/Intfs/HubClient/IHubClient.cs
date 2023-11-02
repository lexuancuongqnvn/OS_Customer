using ERP.System.Impls.Account.Dto;
using SignalR.Intfs.HubClient.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Intfs.HubClient
{
    public interface IHubClient
    {
        Task BroadcastMessage();
        Task SendMessage(string ReceiveMessage ,string to, string message);
        Task ReceiveMessage(Messenger messenger);
        Task TimeKeepingNotification();
        Task<List<ChatModel>> Chat_GetHistoryMessenger(ChatModel input);
        Task<List<Chat_ContentModel>> Chat_GetHistoryMessenger_By_Chat_ID(Chat_ContentModel input);
        Task<List<Chat_ContentModel>> Chat_Inserst(ChatModel input);
        Task<IDictionary<string, object>> Chat_Update(ChatModel input);
        Task<List<Chat_ContentModel>> Chat_Get_New_Messenger_By_Chat_ID(int chat_id);
        Task<List<SYS_Account_Infomation>> Chat_Friend_Search(ChatModel input);
        Task<List<NotificationModel>> HRM_Notification_Search(NotificationModel input);
        Task<IDictionary<string, object>> HRM_Notification_View(int id,int account_id);
        Task<IDictionary<string, object>> HRM_Notification_Read(int account_id);

    }
}
