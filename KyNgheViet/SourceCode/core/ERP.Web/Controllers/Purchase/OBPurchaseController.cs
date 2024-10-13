using ERP.Common.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WMS.Intfs.OB;
using WMS.Intfs.OB.Dto;

namespace ERP.Web.Controllers.Purchase
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class OBPurchaseController : ControllerBase
    {
        private readonly IOBWMSService IOBWMSService;
        public OBPurchaseController(IOBWMSService iOBWMSService)
        {
            this.IOBWMSService = iOBWMSService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Account_Delete([FromBody] OB_Account_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Account_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Account_Insert([FromBody]OB_Account_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Account_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<OB_Account_ENTITY>> OB_Account_Search([FromBody] OB_Account_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Account_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Account_Update([FromBody] OB_Account_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Account_Update(input);
            return result;
        }
        #region Số dư khách hàng
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Customer_Delete([FromBody] OB_Customer_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Customer_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Customer_Insert([FromBody] OB_Customer_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Customer_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<OB_Customer_ENTITY>> OB_Customer_Search([FromBody] OB_Customer_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Customer_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Customer_Update([FromBody] OB_Customer_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Customer_Update(input);
            return result;
        }
        #endregion
    }
}
