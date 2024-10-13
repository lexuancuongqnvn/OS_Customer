using ERP.Common.Controllers;
using SignalR.Intfs.Notification;
using SignalR.Intfs.Notification.Dto;
using SignalR.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Impls.Notification
{
    public class NotificationService : INotificationService
    {
        public async Task<List<Notification_Setting_Group_ENTITY>> Notification_Setting_Group_Search(Notification_Setting_Group_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Notification_Setting_Group_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.Notification_Setting_Group_Search, input);
            return result;
        }

        public async Task<List<Notification_Setting_ENTITY>> Notification_Setting_Search(Notification_Setting_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Notification_Setting_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.Notification_Setting_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Notification_Setting_Update(Notification_Setting_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.Notification_Setting_Update, input);
            return result;
        }
    }
}
