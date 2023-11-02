using ERP.Common.Filters;
using HRMS.Intfs.Notification;
using HRMS.Intfs.Notification.Dto;
using HRMS.Intfs.ProjectManagement;
using HRMS.Intfs.ProjectManagement.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.HRMS.Notification
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class NotificationHRMController : ControllerBase
    {
        private readonly INotificationServiceHRM iNotificationService;
        public NotificationHRMController(INotificationServiceHRM iNotificationService)
        {
            this.iNotificationService = iNotificationService;
        }
        [HttpPost]
        public async Task<List<Notification_HRM_ENTITY>> Notification_HRM_Search([FromBody] Notification_HRM_ENTITY input)
        {
            var result = await iNotificationService.Notification_HRM_Search(input);
 
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Notification_Read([FromBody] Notification_HRM_ENTITY input)
        {
            var result = await iNotificationService.HRM_Notification_Read(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Notification_View([FromBody] Notification_HRM_ENTITY input)
        {
            var result = await iNotificationService.HRM_Notification_View(input);
            return result;
        }
        
    }
}
