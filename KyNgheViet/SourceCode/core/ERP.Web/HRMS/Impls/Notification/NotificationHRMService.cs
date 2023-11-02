using ERP.Common.Controllers;
using HRMS.Intfs.Notification;
using HRMS.Intfs.Notification.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Impls.Notification
{
    public class NotificationHRMService : INotificationServiceHRM
    {
        public async Task<IDictionary<string, object>> HRM_Notification_Read(Notification_HRM_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Notification_Read, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Notification_View(Notification_HRM_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Notification_View, input);
            return result;
        }

        public async Task<List<Notification_HRM_ENTITY>> Notification_HRM_Search(Notification_HRM_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Notification_HRM_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.Notification_HRM_Search, input);
            return result;
        }
    }
}
