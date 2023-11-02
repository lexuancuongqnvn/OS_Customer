using ERP.Common.Controllers;
using ERP.System.Impls.Account.Dto;
using HRMS.Intfs.Workspace.Dto;
using SignalR.Intfs.HubClient;
using SignalR.Intfs.HubClient.Dto;
using SignalR.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Impls.HubClient
{
    public class BroadcastHub : IHubClient
    {
        public Task BroadcastMessage()
        {
            throw new NotImplementedException();
        }

        public async Task<List<SYS_Account_Infomation>> Chat_Friend_Search(ChatModel input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_Account_Infomation>(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.Chat_Friend_Search, input);
            return result;
        }

        public async Task<List<ChatModel>> Chat_GetHistoryMessenger(ChatModel input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<ChatModel>(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.Chat_GetHistoryMessenger, input);
            return result;
        }

        public async Task<List<Chat_ContentModel>> Chat_GetHistoryMessenger_By_Chat_ID(Chat_ContentModel input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Chat_ContentModel>(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.Chat_GetHistoryMessenger_By_Chat_ID, input);
            return result;
        }

        public async Task<List<Chat_ContentModel>> Chat_Get_New_Messenger_By_Chat_ID(int chat_id)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Chat_ContentModel>(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.Chat_Get_New_Messenger_By_Chat_ID, new { chat_id =chat_id});
            return result;
        }

        public async Task<List<Chat_ContentModel>> Chat_Inserst(ChatModel input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Chat_ContentModel>(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.Chat_Inserst, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Notification_Read(int account_id)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.HRM_Notification_Read, new { account_id = account_id });
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Notification_View(int id, int account_id)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.HRM_Notification_View, new { id = id, account_id = account_id });
            return result;
        }
        public async Task<List<NotificationModel>> HRM_Notification_Search(NotificationModel input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<NotificationModel>(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.HRM_Notification_Search, input);
            return result;
        }

        public Task ReceiveMessage(Messenger messenger)
        {
            throw new NotImplementedException();
        }

        public async Task SendMessage(string ReceiveMessage, string to, string message)
        {
            throw new NotImplementedException();
        }

        public async Task<IDictionary<string, object>> Chat_Update(ChatModel input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("SIGNALR"), CommonStoredProcedule.Chat_Update, input);
            return result;
        }

        public Task TimeKeepingNotification()
        {
            throw new NotImplementedException();
        }
    }
}
