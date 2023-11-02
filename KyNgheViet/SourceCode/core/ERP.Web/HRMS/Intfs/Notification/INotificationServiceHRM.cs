using HRMS.Intfs.Notification.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Intfs.Notification
{
    public interface INotificationServiceHRM
    {
        Task<List<Notification_HRM_ENTITY>> Notification_HRM_Search(Notification_HRM_ENTITY input);
        Task<IDictionary<string, object>> HRM_Notification_Read(Notification_HRM_ENTITY input);
        Task<IDictionary<string, object>> HRM_Notification_View(Notification_HRM_ENTITY input);
    }
}
