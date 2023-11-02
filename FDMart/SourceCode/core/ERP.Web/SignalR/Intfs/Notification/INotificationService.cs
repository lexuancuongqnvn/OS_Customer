using SignalR.Intfs.Notification.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Intfs.Notification
{
    public interface INotificationService
    {
        Task<IDictionary<string, object>> Notification_Setting_Update(Notification_Setting_ENTITY input);
        Task<List<Notification_Setting_ENTITY>> Notification_Setting_Search(Notification_Setting_ENTITY input);
        Task<List<Notification_Setting_Group_ENTITY>> Notification_Setting_Group_Search(Notification_Setting_Group_ENTITY input);
    }
}
