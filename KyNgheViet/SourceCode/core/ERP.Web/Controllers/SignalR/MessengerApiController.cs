using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.System.Impls.Account.Dto;
using ERP.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Intfs.HubClient;
using SignalR.Intfs.HubClient.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.SignalR
{
    [Route("api/[controller]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class MessengerApiController : ControllerBase
    {
        private readonly IHubClient HubClient;
        public MessengerApiController(IHubClient HubClient)
        {
            this.HubClient = HubClient;
        }

        [HttpGet]
        [Route("Realtime_Messenger")]
        public async Task<List<Messenger>> Realtime_Messenger([FromBody] Messenger input)
        {
            throw new NotImplementedException();
        }
        [HttpGet]
        [Route("Get_Messenger")]
        public async Task<List<ChatModel>> Get_Messenger([FromBody] ChatModel input)
        {
            throw new NotImplementedException();
        }
        [HttpPost]
        [Route("Chat_GetHistoryMessenger")]
        public async Task<List<ChatModel>> Chat_GetHistoryMessenger([FromBody] ChatModel input)
        {
            var result = await HubClient.Chat_GetHistoryMessenger(input);
            return result;
        }
        [HttpPost]
        [Route("GetTokenFirebase")]
        public async Task<List<string>> GetTokenFirebase(string list_employee,string type)
        {
            List<string> result = new List<string>();
            string qr = @"EXEC [dbo].[GetTokenFirebase] @p_list_employee = N'" + list_employee + @"' ,@p_type = N'"+type+@"' ";

            DataTable dataTable = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("ID"), "SYS_Account_Infomation_Token_CheckLogin", qr);
            foreach (DataRow row in dataTable.Rows)
                result.Add(row["token"].ToString()) ;
            return result;
        }
        [HttpPost]
        [Route("Chat_Friend_Search")]
        public async Task<List<SYS_Account_Infomation>> Chat_Friend_Search([FromBody] ChatModel input)
        {
            var result = await HubClient.Chat_Friend_Search(input);
            return result;
        }
        [HttpPost]
        [Route("Chat_GetHistoryMessenger_By_Chat_ID")]
        public async Task<List<Chat_ContentModel>> Chat_GetHistoryMessenger_By_Chat_ID([FromBody] Chat_ContentModel input)
        {
            var result = await HubClient.Chat_GetHistoryMessenger_By_Chat_ID(input);
            return result;
        }
        [HttpPost]
        [Route("Chat_Inserst")]
        public async Task<List<Chat_ContentModel>> Chat_Inserst([FromBody] ChatModel input)
        {
            input.XML = input.Chat_Content.ToXmlFromList();
            var result = await HubClient.Chat_Inserst(input);
            input.Chat_Content = result;
            return result;
        }
        [HttpPost]
        [Route("Chat_Update")]
        public async Task<IDictionary<string, object>> Chat_Update([FromBody] ChatModel input)
        {
            var result = await HubClient.Chat_Update(input);
            return result;
        }
        [HttpPost]
        [Route("Chat_Get_New_Messenger_By_Chat_ID")]
        public async Task<List<Chat_ContentModel>> Chat_Get_New_Messenger_By_Chat_ID(int chat_id)
        {
            var result = await HubClient.Chat_Get_New_Messenger_By_Chat_ID(chat_id);
            return result;
        }
        [HttpPost]
        [Route("HRM_Notification_Search")]
        public async Task<List<NotificationModel>> HRM_Notification_Search([FromBody] NotificationModel input)
        {
            var result = await HubClient.HRM_Notification_Search(input);
            return result;
        }
        [HttpPost]
        [Route("HRM_Notification_Read")]
        public async Task<IDictionary<string, object>> HRM_Notification_Read(int account_id)
        {
            var result = await HubClient.HRM_Notification_Read(account_id);
            return result;
        }
        [HttpPost]
        [Route("HRM_Notification_View")]
        public async Task<IDictionary<string, object>> HRM_Notification_View(int id, int account_id)
        {
            var result = await HubClient.HRM_Notification_View(id, account_id);
            return result;
        }
    }
}
