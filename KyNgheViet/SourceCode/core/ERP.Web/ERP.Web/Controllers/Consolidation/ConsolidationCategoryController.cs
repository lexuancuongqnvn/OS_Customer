using Consolidation.Infs.Category;
using Consolidation.Infs.Category.Dto;
using ERP.Common.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Consolidation
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class ConsolidationCategoryController : ControllerBase
    {
        private readonly IConsolidationCategoryService IConsolidationCategoryService;

        public ConsolidationCategoryController(IConsolidationCategoryService iConsolidationCategoryService)
        {
            this.IConsolidationCategoryService = iConsolidationCategoryService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Account_Delete([FromBody] CAT_Account_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Account_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Account_Insert([FromBody] CAT_Account_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Account_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<CAT_Account_ENTITY>> CAT_Account_Search([FromBody] CAT_Account_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Account_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Account_Update([FromBody] CAT_Account_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Account_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Profession_Delete([FromBody] CAT_Profession_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Profession_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Profession_Insert([FromBody] CAT_Profession_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Profession_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<CAT_Profession_ENTITY>> CAT_Profession_Search([FromBody] CAT_Profession_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Profession_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Profession_Update([FromBody] CAT_Profession_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Profession_Update(input);
            return result;
        }

        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Carry_Forward_Delete([FromBody] CAT_Carry_Forward_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Carry_Forward_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Carry_Forward_Insert([FromBody] CAT_Carry_Forward_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Carry_Forward_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<CAT_Carry_Forward_ENTITY>> CAT_Carry_Forward_Search([FromBody] CAT_Carry_Forward_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Carry_Forward_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Carry_Forward_Update([FromBody] CAT_Carry_Forward_ENTITY input)
        {
            var result = await this.IConsolidationCategoryService.CAT_Carry_Forward_Update(input);
            return result;
        }
    }
}
