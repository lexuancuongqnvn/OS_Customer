using ERP.Common.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Infs.Category;
using Sales.Infs.Category.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Sales
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class SalesCategoryController : ControllerBase
    {
        private readonly ISalesCategoryService ISalesCategoryService;
        public SalesCategoryController(ISalesCategoryService iSalesCategoryService)
        {
            this.ISalesCategoryService = iSalesCategoryService;
        }

        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Contract_Action_By_Type([FromBody] CAT_Contract_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Contract_Action_By_Type(input);
        }
        [HttpPost]
        public async Task<List<CAT_Contract_ENTITY>> CAT_Contract_Search([FromBody] CAT_Contract_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Contract_Search(input);
        }

        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Customer_Group_Action_By_Type([FromBody] CAT_Customer_Group_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Customer_Group_Action_By_Type(input);
        }
        [HttpPost]
        public async Task<List<CAT_Customer_Group_ENTITY>> CAT_Customer_Group_Search([FromBody] CAT_Customer_Group_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Customer_Group_Search(input);
        }

        [HttpPost]
        public async Task<List<CAT_Customer_ENTITY>> CAT_Customer_Search([FromBody] CAT_Customer_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Customer_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Customer_Insert([FromBody] CAT_Customer_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Customer_Insert(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Customer_Update([FromBody] CAT_Customer_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Customer_Update(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Customer_Delete([FromBody] CAT_Customer_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Customer_Delete(input);
        }

        [HttpPost]
        public async Task<List<CAT_Warranty_Certificate_ENTITY>> CAT_Warranty_Certificate_Search([FromBody] CAT_Warranty_Certificate_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Warranty_Certificate_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Warranty_Certificate_Insert([FromBody] CAT_Warranty_Certificate_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Warranty_Certificate_Insert(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Warranty_Certificate_Update([FromBody] CAT_Warranty_Certificate_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Warranty_Certificate_Update(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Warranty_Certificate_Delete([FromBody] CAT_Warranty_Certificate_ENTITY input)
        {
            return await this.ISalesCategoryService.CAT_Warranty_Certificate_Delete(input);
        }
    }
}
