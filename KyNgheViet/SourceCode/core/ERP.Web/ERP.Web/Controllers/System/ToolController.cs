using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.System
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class ToolController : ControllerBase
    {
        [HttpPost]
        public Task<CRYPTModel> DeCryptString([FromBody] CRYPTModel input)
        {
            CRYPTModel CRYPTModel = new CRYPTModel();
            CRYPTModel.textResult = ManagementController.DecryptString(input.Text);
            return Task.FromResult(CRYPTModel);
        }
        [HttpPost]
        public Task<CRYPTModel> EnCryptString([FromBody] CRYPTModel input)
        {
            CRYPTModel CRYPTModel = new CRYPTModel();
            CRYPTModel.textResult = ManagementController.EncryptString(input.Text);
            return Task.FromResult(CRYPTModel);
        }
    }
}
