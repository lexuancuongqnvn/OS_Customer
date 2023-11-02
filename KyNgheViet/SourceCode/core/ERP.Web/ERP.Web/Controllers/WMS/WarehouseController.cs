using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WMS.Intfs.Voucher.Dto;
using WMS.Intfs.Warehouse;
using WMS.Intfs.Warehouse.Dto;

namespace ERP.Web.Controllers.WMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class WarehouseController : ControllerBase
    {
        private readonly IWarehouseService IWarehouseService;
        public WarehouseController(IWarehouseService iWarehouseService)
        {
            this.IWarehouseService = iWarehouseService;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_Goods_Issue_ENTITY>> WMS_Warehouse_Goods_Issue_Bycode(string code)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Issue_Bycode(code);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Delete(string code)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Issue_Delete(code);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_Goods_Issue_ENTITY>> WMS_Warehouse_Goods_Issue_Search([FromBody] WMS_Warehouse_Goods_Issue_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Issue_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Update([FromBody] WMS_Warehouse_Goods_Issue_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Issue_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_Goods_Receipt_ENTITY>> WMS_Warehouse_Goods_Receipt_Bycode(string code, string type)
        {
            List<WMS_Warehouse_Goods_Receipt_ENTITY> result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Bycode(code, type);
            result[0].wMS_Warehouse_Goods_Receipt_Details = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Detail_Bycode(code, "DETAIL");
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_Goods_Receipt_Detail_ENTITY>> WMS_Warehouse_Goods_Receipt_Detail_Bycode(string code, string type)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Detail_Bycode(code, type);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delete(string code)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Delete(code);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Insert([FromBody] WMS_Warehouse_Goods_Receipt_ENTITY input)
        {
            input.xml = input.wMS_Warehouse_Goods_Receipt_Details.ToXmlFromList();
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_Goods_Receipt_ENTITY>> WMS_Warehouse_Goods_Receipt_Search([FromBody] WMS_Warehouse_Goods_Receipt_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Update([FromBody] WMS_Warehouse_Goods_Receipt_ENTITY input)
        {
            input.xml = input.wMS_Warehouse_Goods_Receipt_Details.ToXmlFromList();
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Insert([FromBody] WMS_Warehouse_Goods_Issue_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Issue_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Search([FromBody]WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Insert([FromBody] WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Update([FromBody] WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Delete(string code)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Delete(code);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Bycode(string code)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Bycode(code);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Search([FromBody] WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Insert([FromBody] WMS_Warehouse_Goods_Issue_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_ENTITY>> WMS_Warehouse_Search([FromBody] WMS_Warehouse_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Insert([FromBody] WMS_Warehouse_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Update([FromBody] WMS_Warehouse_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_Delete(string code)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Delete(code);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_ENTITY>> WMS_Warehouse_Bycode(string code)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_Bycode(code);
            return result;
        }
        [HttpPost]
        public async Task<List<WMS_Warehouse_SKU_ENTITY>> WMS_Warehouse_SKU_Search([FromBody] WMS_Warehouse_SKU_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_SKU_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> WMS_Warehouse_SKU_Actions([FromBody] WMS_Warehouse_SKU_ENTITY input)
        {
            var result = await this.IWarehouseService.WMS_Warehouse_SKU_Actions(input);
            return result;
        }
    }
}
