using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WMS.Intfs.Category;
using WMS.Intfs.Category.Dto;

namespace ERP.Web.Controllers.WMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WMSCategoryController : ControllerBase
    {
        private readonly ICategoryService ICategoryService;
        public WMSCategoryController(ICategoryService iCategoryService)
        {
            this.ICategoryService = iCategoryService;
        }
        [HttpPost]
        public async Task<List<CAT_Warehouse_ENTITY>> CAT_Warehouse_Search([FromBody]CAT_Warehouse_ENTITY input)
        {
            return await this.ICategoryService.CAT_Warehouse_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Warehouse_Action_By_Type([FromBody]CAT_Warehouse_ENTITY input)
        {
            return await this.ICategoryService.CAT_Warehouse_Action_By_Type(input);
        }
        [HttpPost]
        public async Task<List<CAT_Goods_ENTITY>> CAT_Goods_Search([FromBody] CAT_Goods_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Goods_Delete([FromBody] CAT_Goods_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Delete(input);
        } 
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Goods_Update([FromBody] CAT_Goods_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Update(input);
        } 
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Goods_Insert([FromBody] CAT_Goods_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Insert(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Goods_Group_Action_By_Type([FromBody] CAT_Goods_Group_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Group_Action_By_Type(input);
        } 
        [HttpPost]
        public async Task<List<CAT_Goods_Group_ENTITY>> CAT_Goods_Group_Search([FromBody] CAT_Goods_Group_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Group_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Goods_Unit_Action_By_Type([FromBody] CAT_Goods_Unit_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Unit_Action_By_Type(input);
        }
        [HttpPost]
        public async Task<List<CAT_Goods_Unit_ENTITY>> CAT_Goods_Unit_Search([FromBody] CAT_Goods_Unit_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Unit_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Delete([FromBody] CAT_Goods_Unit_Conversion_Factor_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Unit_Conversion_Factor_Delete(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Update([FromBody] CAT_Goods_Unit_Conversion_Factor_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Unit_Conversion_Factor_Update(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Insert([FromBody] CAT_Goods_Unit_Conversion_Factor_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Unit_Conversion_Factor_Insert(input);
        }
        [HttpPost]
        public async Task<List<CAT_Goods_Unit_Conversion_Factor_ENTITY>> CAT_Goods_Unit_Conversion_Factor_Search([FromBody] CAT_Goods_Unit_Conversion_Factor_ENTITY input)
        {
            return await this.ICategoryService.CAT_Goods_Unit_Conversion_Factor_Search(input);
        }
    }
}
