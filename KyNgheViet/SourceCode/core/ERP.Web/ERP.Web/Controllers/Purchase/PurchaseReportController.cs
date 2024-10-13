using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Purchase.Infs.Report;
using Purchase.Infs.Report.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
using WMS.Intfs.OB;

namespace ERP.Web.Controllers.Purchase
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PurchaseReportController : ControllerBase
    {
        private readonly IPurchaseReportService IPurchaseReportService;
        public PurchaseReportController(IPurchaseReportService iPurchaseReportService)
        {
            this.IPurchaseReportService = iPurchaseReportService;
        }
        [HttpPost]
        public async Task<List<PUR_Accounts_Payable_Ledger_ENTITY>> PUR_Accounts_Payable_Ledger_Search([FromBody] PUR_Accounts_Payable_Ledger_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Accounts_Payable_Ledger_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Accounts_Payable_Report_By_Invoice_ENTITY>> PUR_Accounts_Payable_Report_By_Invoice_Search([FromBody] PUR_Accounts_Payable_Report_By_Invoice_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Accounts_Payable_Report_By_Invoice_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Aggregate_Cost_Coupon_Print_ENTITY>> PUR_Aggregate_Cost_Coupon_Print_Search([FromBody] PUR_Aggregate_Cost_Coupon_Print_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Aggregate_Cost_Coupon_Print_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Aggregate_Print_Import_Slips_At_Cost_ENTITY>> PUR_Aggregate_Print_Import_Slips_At_Cost_Search([FromBody] PUR_Aggregate_Print_Import_Slips_At_Cost_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Aggregate_Print_Import_Slips_At_Cost_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Combined_Purchases_Imported_Inventory_ENTITY>> PUR_Combined_Purchases_Imported_Inventory_Search([FromBody] PUR_Combined_Purchases_Imported_Inventory_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Combined_Purchases_Imported_Inventory_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Expense_Report_ENTITY>> PUR_Expense_Report_Search([FromBody] PUR_Expense_Report_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Expense_Report_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Import_Invoice_Report_ENTITY>> PUR_Import_Invoice_Report_Search([FromBody] PUR_Import_Invoice_Report_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Import_Invoice_Report_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Inventory_Return_Report_ENTITY>> PUR_Inventory_Return_Report_Search([FromBody] PUR_Inventory_Return_Report_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Inventory_Return_Report_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Journal_ENTITY>> PUR_Journal_Search([FromBody] PUR_Journal_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Journal_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Order_Report_ENTITY>> PUR_Order_Report_Search([FromBody] PUR_Order_Report_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Order_Report_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<PUR_Service_Purchase_Invoice_Report_ENTITY>> PUR_Service_Purchase_Invoice_Report_Search([FromBody] PUR_Service_Purchase_Invoice_Report_ENTITY input)
        {
            var result = await this.IPurchaseReportService.PUR_Service_Purchase_Invoice_Report_Search(input);
            return result;
        }
    }
}
