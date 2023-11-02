using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using SignalR.Intfs.HubClient.Dto;

namespace SignalR.Intfs.HubClient
{
    public class NotificationHub : Hub
    {
        public async Task Task_Notifi_All(NotificationModel input)
        {
            await Clients.All.SendAsync("NotifiAll", input);
        }
        public async Task Task_Notifi_Remind(NotificationModel input)
        {
            await Clients.All.SendAsync("ReceiveNotifiRemind", input);
        }
        public async Task Task_Notifi_Message(NotificationModel input)
        {
            await Clients.All.SendAsync("NotifiMessage", input);
        }
        public async Task Soon_Late_Register(NotificationModel input)
        {
            await Clients.All.SendAsync("NotifiRegister", input);
        }
        public async Task HRM_Notification_Checkin(NotificationModel input)
        {
            await Clients.All.SendAsync("NotifiCheckin", input);
        }
    }
}
