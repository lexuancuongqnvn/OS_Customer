using CASH.Infs.Report;
using CASH.Infs.Report.Dto;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Common.Intfs.ERP;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WMS.Intfs.Category;
using WMS.Intfs.Voucher;

namespace ERP.Web.Controllers.Cash
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class CashReportController : ControllerBase
    {
        private readonly ICashReportService ICashReportService;
        public CashReportController(ICashReportService iCashReportService)
        {
            this.ICashReportService = iCashReportService;
        }
        [HttpPost]
        public async Task<List<CASH_Bank_Deposit_Ledger_ENTITY>> CASH_Bank_Deposit_Ledger_Search([FromBody]CASH_Bank_Deposit_Ledger_ENTITY input)
        {
            return await this.ICashReportService.CASH_Bank_Deposit_Ledger_Search(input);
        }
        [HttpPost]
        public async Task<List<CASH_Disbursement_Journal_ENTITY>> CASH_Disbursement_Journal_Search([FromBody] CASH_Disbursement_Journal_ENTITY input)
        {
            return await this.ICashReportService.CASH_Disbursement_Journal_Search(input);
        }
        [HttpPost]
        public async Task<List<CASH_Ledger_Report_ENTITY>> CASH_Ledger_Report_Search([FromBody] CASH_Ledger_Report_ENTITY input)
        {
            return await this.ICashReportService.CASH_Ledger_Report_Search(input);
        }
        [HttpPost]
        public async Task<List<CASH_Receipts_Ledger_ENTITY>> CASH_Receipts_Ledger_Search([FromBody] CASH_Receipts_Ledger_ENTITY input)
        {
            return await this.ICashReportService.CASH_Receipts_Ledger_Search(input);
        }
        [HttpPost]
        public async Task<List<CASH_Payment_voucher_report_ENTITY>> CASH_Payment_voucher_report_Search([FromBody] CASH_Payment_voucher_report_ENTITY input)
        {
            return await this.ICashReportService.CASH_Payment_voucher_report_Search(input);
        }
        [HttpPost]
        public async Task<List<CASH_Receipt_report_ENTITY>> CASH_Receipt_report_Search([FromBody] CASH_Receipt_report_ENTITY input)
        {
            return await this.ICashReportService.CASH_Receipt_report_Search(input);
        }
    }
}
