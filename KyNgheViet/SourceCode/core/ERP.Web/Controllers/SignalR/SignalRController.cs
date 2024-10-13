using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
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
    public class SignalRController : ControllerBase
    {

        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public SignalRController(IHubContext<BroadcastHub, IHubClient> _hubContext)
        {
            this._hubContext = _hubContext;
        }

        [HttpPost]
        [Route("messenger_notification")]
        public async Task<ActionResult<Messenger>> PostMessage([FromBody] Messenger messenger)
        {
            messenger.Id = Guid.NewGuid().ToString();

            Notification notification = new Notification()
            {
                EmployeeName = messenger.message,
                TranType = "Add"
            };

            try
            {
                messenger.time_add = DateTime.Now;
                await _hubContext.Clients.All.ReceiveMessage(messenger);
            }
            catch (Exception ex)
            {

            }

            return CreatedAtAction("GetMessage", new { id = messenger.Id }, messenger);
        }
        [HttpPost]
        [Route("Notification")]
        public async Task Notification(string to, string body, string image)
        {
            Notification notification = new Notification()
            {
                to = to,
                body = body,
                image_url = image
            };

            try
            {
                await _hubContext.Clients.All.SendMessage("ReceiveMessage", to, body);
                //await _hubContext.Clients.All.BroadcastMessage();
            }
            catch (Exception ex)
            {

            }
        }
        [HttpPost]
        [Route("TimeKeepingNotification")]
        public async Task TimeKeepingNotification()
        {
            //Notification notification = new Notification()
            //{
            //    to = to,
            //    body = body,
            //    image_url = image
            //};

            try
            {
                await _hubContext.Clients.All.TimeKeepingNotification();
                //await _hubContext.Clients.All.BroadcastMessage();
            }
            catch (Exception ex)
            {

            }
        }
        [HttpPost]
        [Route("chat_history")]
        public async Task<List<ChatModel>> Chat_History([FromBody] Messenger ChatModel)
        {
            DataTable data = ManagementController.GetDataTable("SIGNALRConnection", "select * from Chat");
            var result = ManagementController.ConvertDataTable<ChatModel>(data);
            return result;
        }
    }
}
