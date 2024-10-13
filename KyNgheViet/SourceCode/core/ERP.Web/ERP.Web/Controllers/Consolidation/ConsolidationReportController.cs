using Consolidation.Infs.Category.Dto;
using Consolidation.Infs.Report;
using Consolidation.Infs.Report.Dto;
using Consolidation.Infs.Voucher;
using Consolidation.Infs.Voucher.Dto;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Common.Intfs.ERP;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Infs.VAT;
using Sales.Infs.VAT.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Consolidation
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class ConsolidationReportController : ControllerBase
    {
        private readonly IConsolidationReport ConsolidationReport;

        public ConsolidationReportController(IConsolidationReport ConsolidationReport)
        {
            this.ConsolidationReport = ConsolidationReport;
        }
        [HttpPost]
        public async Task<List<CON_Statement_Of_Cash_Flows_Report_ENTITY>> CON_Statement_Of_Cash_Flows_Report_Search([FromBody] CON_Statement_Of_Cash_Flows_Report_ENTITY input)
        {
            var result = await this.ConsolidationReport.CON_Statement_Of_Cash_Flows_Report_Search(input);
            return result;
        }  
        [HttpPost]
        public async Task<List<CON_Account_Consolidation_By_A_Account_ENTITY>> CON_Account_Consolidation_By_A_Account_Search([FromBody] CON_Account_Consolidation_By_A_Account_ENTITY input)
        {
            var result = await this.ConsolidationReport.CON_Account_Consolidation_By_A_Account_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<CON_Account_Book_Detail_ENTITY>> CON_Account_Book_Detail_Search([FromBody] CON_Account_Book_Detail_ENTITY input)
        {
            var result = await this.ConsolidationReport.CON_Account_Book_Detail_Search(input);
            return result;
        }
        [HttpPost]//Nhật ký - sổ cái
        public async Task<List<CON_General_Ledger_ENTITY>> CON_General_Ledger_Search([FromBody] CON_General_Ledger_ENTITY input)
        {
            var result = await this.ConsolidationReport.CON_General_Ledger_Search(input);
            return result;
        }
        [HttpPost]//Chứng từ ghi sổ
        public async Task<List<CON_Voucher_Ledger_Book_ENTITY>> CON_Voucher_Ledger_Book_Search([FromBody] CON_Voucher_Ledger_Book_ENTITY input)
        {
            var result = await this.ConsolidationReport.CON_Voucher_Ledger_Book_Search(input);
            return result;
        }

        [HttpPost]//Sổ cái nhật ký chung
        public async Task<List<CON_General_Accounting_Ledger_Book_ENTITY>> CON_General_Accounting_Ledger_Book_Search([FromBody] CON_General_Accounting_Ledger_Book_ENTITY input)
        {
            var result = await this.ConsolidationReport.CON_General_Accounting_Ledger_Book_Search(input);
            return result;
        }
        [HttpPost]//Sổ nhật ký chung
        public async Task<List<CON_General_Accounting_Ledger_ENTITY>> CON_General_Accounting_Ledger_Search([FromBody] CON_General_Accounting_Ledger_ENTITY input)
        {
            var result = await this.ConsolidationReport.CON_General_Accounting_Ledger_Search(input);
            return result;
        }
    }
}
