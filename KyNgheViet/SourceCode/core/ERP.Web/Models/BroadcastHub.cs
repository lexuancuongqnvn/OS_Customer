using Microsoft.AspNetCore.SignalR;
using SignalR.Intfs.HubClient;
using System.Threading.Tasks;

namespace ERP.Web.Models
{
    public class BroadcastHub : Hub<IHubClient>
    {
    }
}
