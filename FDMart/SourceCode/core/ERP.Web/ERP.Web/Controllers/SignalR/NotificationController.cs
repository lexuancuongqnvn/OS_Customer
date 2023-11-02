using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using SignalR.Intfs.Notification;
using SignalR.Intfs.Notification.Dto;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.SignalR
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService NotificationService;
        public NotificationController(INotificationService NotificationService)
        {
            this.NotificationService = NotificationService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Notification_Setting_Update([FromBody] Notification_Setting_ENTITY input)
        {
            var result = await this.NotificationService.Notification_Setting_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Notification_Setting_Group_ENTITY>> Notification_Setting_Search([FromBody] Notification_Setting_Group_ENTITY input)
        {
            List<Notification_Setting_Group_ENTITY> list_Groups = await this.NotificationService.Notification_Setting_Group_Search(input);
            foreach (var group in list_Groups)
            {
                Notification_Setting_ENTITY pr = new Notification_Setting_ENTITY();
                pr.group_id = group.id;
                pr.employee_code = input.employee_code;
                group.notification_Settings = new List<Notification_Setting_ENTITY>();
                group.notification_Settings = await this.NotificationService.Notification_Setting_Search(pr);
            }
            return list_Groups;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public static void SendNotificationFirebase(string to, string type, string content, string title,string notifi_code,string message,string idbigText)
        {
            DataTable Notification = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"),"Notification", "SELECT TOP 1 A.*,B.FIRST_NAME+' '+B.LAST_NAME FULL_NAME FROM [Notification] A LEFT JOIN SYS_Account_Infomation B ON A.account_id_send=B.ID WHERE A.code = '" + notifi_code+@"'");
            content = Notification.Rows[0]["message_app"].ToString();
            title = Notification.Rows[0]["FULL_NAME"].ToString();
            string id = Notification.Rows[0]["id"].ToString();
            string subText = Notification.Rows[0]["title"].ToString();

            DataTable TokenFirebase = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "getTokenFirebase", @"EXEC [dbo].[GetTokenFirebase]
		        @p_list_employee = '"+ to + @"',
		        @p_type = '" + type + @"'");
            string list_tokens = "";
            foreach(DataRow item in TokenFirebase.Rows)
            {
                if (list_tokens != "") list_tokens += ",";
                list_tokens += item["fire_base_token"].ToString();
            }
            if (type == "multi")
            {
                var client = new RestClient("https://fcm.googleapis.com/fcm/send");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Authorization", "key=AAAATjeyE1I:APA91bGFxL-OLFuQv35vAAX49ZeeuuxXixgjHf6FE5KRMN6KSR0zfN85Kh77CF_B5yMwEGmDUJZ38z_B_K-e_RRR9sPBTX5J8uflHljgrcnRoc2zsYqmj4av_cNlFliD3eOK6eDss_iV");
                var body = @"{
                " + "\n" +
                        @"    ""data"": {
                        " + "\n" +
                        @"        ""id"":""" + id + @""",
                        " + "\n" +
                        @"        ""subText"":""" + subText + @""",
                        " + "\n" +
                        @"        ""message"":""" + message + @""",
                        " + "\n" +
                        @"        ""idbigText"":""" + idbigText + @""",
                        " + "\n" +
                        @"        ""title"":""" + title + @"""
                        " + "\n" +
                                @"},
                " + "\n" +
                                @"    ""notification"": {
                " + "\n" +
                                @"        ""body"": """+ content + @""",
                " + "\n" +
                                @"        ""title"": """ + subText + @"""
                " + "\n" +
                                @"    },
                " + "\n" +
                    @"    ""registration_ids"": ["""+ list_tokens + @"""]
                " + "\n" +
                @"}";
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
            }
            else if(type == "single")
            {
                var client = new RestClient("https://fcm.googleapis.com/fcm/send");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Authorization", "key=AAAATjeyE1I:APA91bGFxL-OLFuQv35vAAX49ZeeuuxXixgjHf6FE5KRMN6KSR0zfN85Kh77CF_B5yMwEGmDUJZ38z_B_K-e_RRR9sPBTX5J8uflHljgrcnRoc2zsYqmj4av_cNlFliD3eOK6eDss_iV");
                var body = @"{
                " + "\n" +
                        @"    ""data"": {
                        " + "\n" +
                        @"        ""id"":""" + id + @""",
                        " + "\n" +
                        @"        ""subText"":""" + subText + @""",
                        " + "\n" +
                        @"        ""message"":""" + message + @""",
                        " + "\n" +
                        @"        ""idbigText"":""" + idbigText + @""",
                        " + "\n" +
                        @"        ""title"":""" + title + @"""
                        " + "\n" +
                                @"    },
                " + "\n" +
                                @"    ""notification"": {
                " + "\n" +
                                @"        ""body"": """ + content + @""",
                " + "\n" +
                                @"        ""title"": """ + subText + @"""
                " + "\n" +
                                @"    },
                " + "\n" +
                                @"    ""to"": """ + list_tokens + @"""
                " + "\n" +
                                @"}";
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
            }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public static void SendNotificationFullAppFirebase(string to, string type, string content, string title, string notifi_code, string message, string idbigText)
        {
            DataTable Notification = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "Notification", "SELECT TOP 1 A.*,B.FIRST_NAME+' '+B.LAST_NAME FULL_NAME FROM [Notification] A LEFT JOIN SYS_Account_Infomation B ON A.account_id_send=B.ID WHERE A.code = '" + notifi_code + @"'");
            content = Notification.Rows[0]["message_app"].ToString();
            title = Notification.Rows[0]["FULL_NAME"].ToString();
            string id = Notification.Rows[0]["id"].ToString();
            string subText = Notification.Rows[0]["title"].ToString();

            DataTable TokenFirebase = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "getTokenFirebase", @"EXEC [dbo].[GetTokenFullAppFirebase]
		        @p_list_employee = '" + to + @"',
		        @p_type = '" + type + @"'");
            string list_tokens = "";
            foreach (DataRow item in TokenFirebase.Rows)
            {
                if (list_tokens != "") list_tokens += ",";
                list_tokens +="\"" +item["fire_base_token"].ToString()+"\"";
            }
            var client = new RestClient("https://fcm.googleapis.com/fcm/send");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", "key=AAAATjeyE1I:APA91bGFxL-OLFuQv35vAAX49ZeeuuxXixgjHf6FE5KRMN6KSR0zfN85Kh77CF_B5yMwEGmDUJZ38z_B_K-e_RRR9sPBTX5J8uflHljgrcnRoc2zsYqmj4av_cNlFliD3eOK6eDss_iV");
            var body = @"{
                " + "\n" +
                    @"    ""data"": {
                        " + "\n" +
                    @"        ""id"":""" + id + @""",
                        " + "\n" +
                    @"        ""subText"":""" + subText + @""",
                        " + "\n" +
                    @"        ""message"":""" + message + @""",
                        " + "\n" +
                    @"        ""idbigText"":""" + idbigText + @""",
                        " + "\n" +
                    @"        ""title"":""" + title + @"""
                        " + "\n" +
                            @"},
                " + "\n" +
                            @"    ""notification"": {
                " + "\n" +
                            @"        ""body"": """ + content + @""",
                " + "\n" +
                            @"        ""title"": """ + subText + @"""
                " + "\n" +
                            @"    },
                " + "\n" +
                @"    ""registration_ids"": [" + list_tokens + @"]
                " + "\n" +
            @"}";
            request.AddParameter("application/json", body, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
        }
    }
}
