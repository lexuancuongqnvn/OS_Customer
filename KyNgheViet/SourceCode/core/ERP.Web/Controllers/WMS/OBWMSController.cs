using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WMS.Intfs.OB;
using WMS.Intfs.OB.Dto;

namespace ERP.Web.Controllers.WMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OBWMSController : ControllerBase
    {
        private readonly IOBWMSService IOBWMSService;
        public OBWMSController(IOBWMSService iOBWMSService)
        {
            this.IOBWMSService = iOBWMSService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Goods_Delete([FromBody] OB_Goods_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Goods_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Goods_Update([FromBody] OB_Goods_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Goods_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Goods_Insert([FromBody] OB_Goods_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Goods_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<OB_Goods_ENTITY>> OB_Goods_Search([FromBody]OB_Goods_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Goods_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Input_Output_Inventory_Delete([FromBody] OB_Input_Output_Inventory_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Input_Output_Inventory_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Input_Output_Inventory_Update([FromBody] OB_Input_Output_Inventory_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Input_Output_Inventory_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Input_Output_Inventory_Insert([FromBody] OB_Input_Output_Inventory_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Input_Output_Inventory_Insert(input);
            return result;
        } 
        [HttpPost]
        public async Task<IDictionary<string, object>> OB_Input_Output_Inventory_Synchronized([FromBody] OB_Input_Output_Inventory_Synchronized_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Input_Output_Inventory_Synchronized(input);
            return result;
        }
        [HttpPost]
        public async Task<List<OB_Input_Output_Inventory_ENTITY>> OB_Input_Output_Inventory_Search([FromBody] OB_Input_Output_Inventory_ENTITY input)
        {
            var result = await this.IOBWMSService.OB_Input_Output_Inventory_Search(input);
            return result;
        }
    }
}
