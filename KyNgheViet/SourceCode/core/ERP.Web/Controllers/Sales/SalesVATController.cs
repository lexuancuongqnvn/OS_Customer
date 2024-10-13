using ERP.Common.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Infs.VAT;
using Sales.Infs.VAT.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Sales
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class SalesVATController : ControllerBase
    {
        private readonly ISaleVATService ISaleVATService;
        public SalesVATController(ISaleVATService iSaleVATService)
        {
            this.ISaleVATService = iSaleVATService;
        }
        [HttpPost]
        public async Task<List<Accounting_VAT_Output_ENTITY>> Accounting_VAT_Output_Search([FromBody] Accounting_VAT_Output_ENTITY input)
        {
            var result = await ISaleVATService.Accounting_VAT_Output_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Accounting_VAT_Output_Insert([FromBody] Accounting_VAT_Output_ENTITY input)
        {
            var result = await ISaleVATService.Accounting_VAT_Output_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Accounting_VAT_Output_Update([FromBody] Accounting_VAT_Output_ENTITY input)
        {
            var result = await ISaleVATService.Accounting_VAT_Output_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Accounting_VAT_Output_Delete([FromBody] Accounting_VAT_Output_ENTITY input)
        {
            var result = await ISaleVATService.Accounting_VAT_Output_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Accounting_VAT_Input_ENTITY>> Accounting_VAT_Input_Search([FromBody] Accounting_VAT_Input_ENTITY input)
        {
            var result = await ISaleVATService.Accounting_VAT_Input_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Accounting_VAT_Input_Insert([FromBody] Accounting_VAT_Input_ENTITY input)
        {
            var result = await ISaleVATService.Accounting_VAT_Input_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Accounting_VAT_Input_Update([FromBody] Accounting_VAT_Input_ENTITY input)
        {
            var result = await ISaleVATService.Accounting_VAT_Input_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Accounting_VAT_Input_Delete([FromBody]Accounting_VAT_Input_ENTITY input)
        {
            var result = await ISaleVATService.Accounting_VAT_Input_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<List<CAT_Tax_ENTITY>> CAT_Tax_Search([FromBody] CAT_Tax_ENTITY input)
        {
            var result = await ISaleVATService.CAT_Tax_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Tax_Insert([FromBody] CAT_Tax_ENTITY input)
        {
            var result = await ISaleVATService.CAT_Tax_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Tax_Update([FromBody] CAT_Tax_ENTITY input)
        {
            var result = await ISaleVATService.CAT_Tax_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CAT_Tax_Delete([FromBody] CAT_Tax_ENTITY input)
        {
            var result = await ISaleVATService.CAT_Tax_Delete(input);
            return result;
        }
    }
}
