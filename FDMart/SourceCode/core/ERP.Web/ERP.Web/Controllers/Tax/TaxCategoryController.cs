using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Infs.VAT.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
using TAX.Infs.Category;

namespace ERP.Web.Controllers.Tax
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TaxCategoryController : ControllerBase
    {
        private readonly ITaxCategoryService ITaxCategoryService;
        public TaxCategoryController(ITaxCategoryService iTaxCategoryService)
        {
            this.ITaxCategoryService = iTaxCategoryService;
        }

       
    }
}
