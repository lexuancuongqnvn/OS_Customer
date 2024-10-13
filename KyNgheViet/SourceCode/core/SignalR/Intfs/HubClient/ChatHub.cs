using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using ERP.Common.Controllers;
using Microsoft.AspNetCore.SignalR;
using SignalR.Intfs.HubClient.Dto;

namespace SignalR.Intfs.HubClient
{
    public class ChatHub : Hub
    {
        public async Task<ChatModel> SendMessage(ChatModel model)
        {
            //await Clients.All.SendAsync("ReceiveMessage", model);
            return await Task.Run(()=> Render(model));
        }
        public async Task<ChatModel> Render(ChatModel model)
        {
            DataTable dataTable = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("SIGNALR"), "chat", "select list_user from Chat where chat_id = "+ model.to);
            string[] to = dataTable.Rows[0]["list_user"].ToString().Split(';');
            model.arr_to = new ArrayList();
            foreach (string s in to)
            {
                model.arr_to.Add(s);    
            }
            await Clients.All.SendAsync("ReceiveMessage", model);
            return model;
        }
        
    }
}
