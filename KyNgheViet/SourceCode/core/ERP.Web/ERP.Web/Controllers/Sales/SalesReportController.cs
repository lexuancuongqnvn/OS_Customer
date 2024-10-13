using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Infs.Report;
using Sales.Infs.Report.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Sales
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SalesReportController : ControllerBase
    {
        private readonly ISaleReportService ISaleReportService;
        public SalesReportController(ISaleReportService iSaleReportService)
        {
            this.ISaleReportService = iSaleReportService;
        }
        [HttpPost]//Số dư công nợ phải thu (Report of Accounts Receivable Balances)
        public async Task<List<Sales_Report_Of_Accounts_Receivable_Balances_ENTITY>> Sales_Report_Of_Accounts_Receivable_Balances_Search([FromBody]Sales_Report_Of_Accounts_Receivable_Balances_ENTITY input)
        {
            var result = await this.ISaleReportService.Sales_Report_Of_Accounts_Receivable_Balances_Search(input);
            return result;
        }

        [HttpPost]//Tồn kho vật tư (Inventory Materials Report)
        public async Task<List<Sales_Report_Inventory_Materials_ENTITY>> Sales_Report_Inventory_Materials_Search([FromBody] Sales_Report_Inventory_Materials_ENTITY input)
        {
            var result = await this.ISaleReportService.Sales_Report_Inventory_Materials_Search(input);
            return result;
        }

        //Báo cáo hóa đơn bán hàng (Report on Sales Invoices)
        [HttpPost]
        public async Task<List<SALES_Report_S32_ENTITY>> SALES_Report_S32_Search([FromBody] SALES_Report_S32_ENTITY input)
        {
            var result = await this.ISaleReportService.SALES_Report_S32_Search(input);
            return result;
        }

        //Báo cáo phiếu nhập hàng trả lại (Report of Goods Return Note)
        [HttpPost]
        public async Task<List<SALES_Report_S33_ENTITY>> SALES_Report_S33_Search([FromBody] SALES_Report_S33_ENTITY input)
        {
            var result = await this.ISaleReportService.SALES_Report_S33_Search(input);
            return result;
        }
        //Báo cáo hóa đơn dịch vụ (Report on Service Invoices)

        //Báo cáo doanh số bán hàng (Sales Revenue Report)
        [HttpPost]
        public async Task<List<SALES_Report_S32_Sales_ENTITY>> SALES_Report_S32_Sales_Search([FromBody] SALES_Report_S32_Sales_ENTITY input)
        {
            var result = await this.ISaleReportService.SALES_Report_S32_Sales_Search(input);
            return result;
        }
        //Báo cáo lãi gộp hàng hóa (Merchandise Gross Profit Report)
        [HttpPost]
        public async Task<List<SALES_Report_Gross_Profit_ENTITY>> SALES_Report_Gross_Profit_Search([FromBody] SALES_Report_Gross_Profit_ENTITY input)
        {
            var result = await this.ISaleReportService.SALES_Report_Gross_Profit_Search(input);
            return result;
        }
        //Sổ nhật ký bán hàng (Sales Day Book)
        [HttpPost]
        public async Task<List<SALES_Report_Sales_Daybook_ENTITY>> SALES_Report_Sales_Daybook_Search([FromBody] SALES_Report_Sales_Daybook_ENTITY input)
        {
            var result = await this.ISaleReportService.SALES_Report_Sales_Daybook_Search(input);
            return result;
        }
        //Số chi tiết công nợ phải thu (Accounts Receivable Subsidiary Ledger)

        //Chi tiết công nợ phải thu theo hóa đơn (Invoice-specific Accounts Receivable Details)

        //Bảng cân đối phát sinh công nợ (Statement of Changes in Accounts Payable and Receivable)

        //Tổng hợp số dư công nợ cuối kỳ (Summary of Ending Balances of Accounts Payable and Receivable)
        //Báo cáo chi tiết cấu hình máy sau khi bán
        [HttpPost]
        public async Task<List<Sales_CAT_Goods_Configuration_Report_ENTITY>> Sales_CAT_Goods_Configuration_Report_Search([FromBody] Sales_CAT_Goods_Configuration_Report_ENTITY input)
        {
            var result = await this.ISaleReportService.Sales_CAT_Goods_Configuration_Report_Search(input);
            return result;
        }

        [HttpPost]
        public async Task<List<SALE_Accounts_Receivable_Ledger_ENTITY>> SALE_Accounts_Receivable_Ledger_Search([FromBody] SALE_Accounts_Receivable_Ledger_ENTITY input)
        {
            var result = await this.ISaleReportService.SALE_Accounts_Receivable_Ledger_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SALE_Statement_Of_Changes_In_Financial_Position_ENTITY>> SALE_Statement_Of_Changes_In_Financial_Position_Search([FromBody] SALE_Statement_Of_Changes_In_Financial_Position_ENTITY input)
        {
            var result = await this.ISaleReportService.SALE_Statement_Of_Changes_In_Financial_Position_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_ENTITY>> SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_Search([FromBody] SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_ENTITY input)
        {
            var result = await this.ISaleReportService.SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SALE_Year_End_Balance_Sheet_Compilation_ENTITY>> SALE_Year_End_Balance_Sheet_Compilation_Search([FromBody] SALE_Year_End_Balance_Sheet_Compilation_ENTITY input)
        {
            var result = await this.ISaleReportService.SALE_Year_End_Balance_Sheet_Compilation_Search(input);
            return result;
        }
    }
}
