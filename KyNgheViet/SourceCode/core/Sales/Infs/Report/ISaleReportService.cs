using Sales.Infs.Report.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Infs.Report
{
    public interface ISaleReportService
    {
        //Số dư công nợ phải thu (Report of Accounts Receivable Balances)
        Task<List<Sales_Report_Of_Accounts_Receivable_Balances_ENTITY>> Sales_Report_Of_Accounts_Receivable_Balances_Search(Sales_Report_Of_Accounts_Receivable_Balances_ENTITY input);
        //Tồn kho vật tư (Inventory Materials Report)
        Task<List<Sales_Report_Inventory_Materials_ENTITY>> Sales_Report_Inventory_Materials_Search(Sales_Report_Inventory_Materials_ENTITY input);

        //Báo cáo hóa đơn bán hàng (Report on Sales Invoices)
        Task<List<SALES_Report_S32_ENTITY>> SALES_Report_S32_Search(SALES_Report_S32_ENTITY input);

        //Báo cáo phiếu nhập hàng trả lại (Report of Goods Return Note)
        Task<List<SALES_Report_S33_ENTITY>> SALES_Report_S33_Search(SALES_Report_S33_ENTITY input);
        //Báo cáo hóa đơn dịch vụ (Report on Service Invoices)

        //Báo cáo doanh số bán hàng (Sales Revenue Report)
        Task<List<SALES_Report_S32_Sales_ENTITY>> SALES_Report_S32_Sales_Search(SALES_Report_S32_Sales_ENTITY input);
        //Báo cáo lãi gộp hàng hóa (Merchandise Gross Profit Report)
        Task<List<SALES_Report_Gross_Profit_ENTITY>> SALES_Report_Gross_Profit_Search(SALES_Report_Gross_Profit_ENTITY input);
        //Sổ nhật ký bán hàng (Sales Day Book)
         Task<List<SALES_Report_Sales_Daybook_ENTITY>> SALES_Report_Sales_Daybook_Search(SALES_Report_Sales_Daybook_ENTITY input);
        //Số chi tiết công nợ phải thu (Accounts Receivable Subsidiary Ledger)
        Task<List<SALES_Report_Accounts_Receivable_Subsidiary_Ledger_ENTITY>> SALES_Report_Accounts_Receivable_Subsidiary_Ledger_Search(SALES_Report_Accounts_Receivable_Subsidiary_Ledger_ENTITY input);
        //Chi tiết công nợ phải thu theo hóa đơn (Invoice-specific Accounts Receivable Details)

        //Bảng cân đối phát sinh công nợ (Statement of Changes in Accounts Payable and Receivable)

        //Tổng hợp số dư công nợ cuối kỳ (Summary of Ending Balances of Accounts Payable and Receivable)
        //Báo cáo chi tiết cấu hình máy sau khi bán
        Task<List<Sales_CAT_Goods_Configuration_Report_ENTITY>> Sales_CAT_Goods_Configuration_Report_Search(Sales_CAT_Goods_Configuration_Report_ENTITY input);
        Task<List<SALE_Accounts_Receivable_Ledger_ENTITY>> SALE_Accounts_Receivable_Ledger_Search(SALE_Accounts_Receivable_Ledger_ENTITY input);
        Task<List<SALE_Statement_Of_Changes_In_Financial_Position_ENTITY>> SALE_Statement_Of_Changes_In_Financial_Position_Search(SALE_Statement_Of_Changes_In_Financial_Position_ENTITY input);
        Task<List<SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_ENTITY>> SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_Search(SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_ENTITY input);
        Task<List<SALE_Year_End_Balance_Sheet_Compilation_ENTITY>> SALE_Year_End_Balance_Sheet_Compilation_Search(SALE_Year_End_Balance_Sheet_Compilation_ENTITY input);
    }
}
