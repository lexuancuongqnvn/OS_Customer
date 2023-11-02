using ERP.Common.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS.Impls.Product;
using POS.Intfs.Product;
using POS.Intfs.Product.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.POS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class ProductController : ControllerBase
    {
        private readonly IProductService IProducService;

        public ProductController(IProductService IProducService)
        {
            this.IProducService = IProducService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> POS_Product_Update([FromBody] POS_Product_ENTITY input)
        {
            var result = await IProducService.POS_Product_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> POS_Product_Insert([FromBody] POS_Product_ENTITY input)
        {
            var result = await IProducService.POS_Product_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> POS_Product_Delete(string code)
        {
            var result = await IProducService.POS_Product_Delete(code);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> POS_Product_Color_Actions([FromBody]POS_Product_Color_ENTITY input)
        {
            var result = await IProducService.POS_Product_Color_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> POS_Product_Group_Actions([FromBody]POS_Product_Group_ENTITY input)
        {
            var result = await IProducService.POS_Product_Group_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<POS_Product_Group_ENTITY>> POS_Product_Group_Search([FromBody] POS_Product_Group_ENTITY input)
        {
            var result = await IProducService.POS_Product_Group_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<POS_Product_ENTITY>> POS_Product_Search([FromBody]POS_Product_ENTITY input)
        {
            var result = await IProducService.POS_Product_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> POS_Product_Size_Actions([FromBody]POS_Product_Size_ENTITY input)
        {
            var result = await IProducService.POS_Product_Size_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> POS_Product_Unit_Actions([FromBody]POS_Product_Unit_ENTITY input)
        {
            var result = await IProducService.POS_Product_Unit_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<POS_Product_Color_ENTITY>> POS_Product_Color_Search([FromBody] POS_Product_Color_ENTITY input)
        {
            var result = await IProducService.POS_Product_Color_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<POS_Product_Size_ENTITY>> POS_Product_Size_Search([FromBody] POS_Product_Size_ENTITY input)
        {
            var result = await IProducService.POS_Product_Size_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<POS_Product_Unit_ENTITY>> POS_Product_Unit_Search([FromBody]POS_Product_Unit_ENTITY input)
        {
            var result = await IProducService.POS_Product_Unit_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> POS_Product_Gift_Actions([FromBody] POS_Product_Gift_ENTITY input)
        {
            var result = await IProducService.POS_Product_Gift_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<POS_Product_Gift_ENTITY>> POS_Product_Gift_Search([FromBody] POS_Product_Gift_ENTITY input)
        {
            input.type = "SEARCH";
            var result = await IProducService.POS_Product_Gift_Search(input);
            return result;
        }
    }
}
