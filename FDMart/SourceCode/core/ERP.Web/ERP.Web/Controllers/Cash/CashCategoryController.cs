using CASH.Infs.Category;
using CASH.Infs.Category.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Cash
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CashCategoryController : ControllerBase
    {
        private readonly ICashCategoryService ICashCategoryService;
        public CashCategoryController(ICashCategoryService iCashCategoryService)
        {
            this.ICashCategoryService = iCashCategoryService;
        }

        [HttpPost]
        public async Task<List<CAT_Foreign_Currency_ENTITY>> CAT_Foreign_Currency_Search([FromBody] CAT_Foreign_Currency_ENTITY input)
        {
            return await this.ICashCategoryService.CAT_Foreign_Currency_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Foreign_Currency_Action_By_Type([FromBody] CAT_Foreign_Currency_ENTITY input)
        {
            return await this.ICashCategoryService.CAT_Foreign_Currency_Action_By_Type(input);
        }
    }
}
