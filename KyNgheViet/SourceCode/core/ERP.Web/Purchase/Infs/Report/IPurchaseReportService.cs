using Purchase.Infs.Report.Dto;
using Purchase.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Purchase.Infs.Report
{
    public interface IPurchaseReportService
    {
        Task<List<PUR_Accounts_Payable_Ledger_ENTITY>> PUR_Accounts_Payable_Ledger_Search(PUR_Accounts_Payable_Ledger_ENTITY input);
        Task<List<PUR_Accounts_Payable_Report_By_Invoice_ENTITY>> PUR_Accounts_Payable_Report_By_Invoice_Search(PUR_Accounts_Payable_Report_By_Invoice_ENTITY input);

        Task<List<PUR_Aggregate_Cost_Coupon_Print_ENTITY>> PUR_Aggregate_Cost_Coupon_Print_Search(PUR_Aggregate_Cost_Coupon_Print_ENTITY input);
        Task<List<PUR_Aggregate_Print_Import_Slips_At_Cost_ENTITY>> PUR_Aggregate_Print_Import_Slips_At_Cost_Search(PUR_Aggregate_Print_Import_Slips_At_Cost_ENTITY input);
        Task<List<PUR_Combined_Purchases_Imported_Inventory_ENTITY>> PUR_Combined_Purchases_Imported_Inventory_Search(PUR_Combined_Purchases_Imported_Inventory_ENTITY input);
        Task<List<PUR_Expense_Report_ENTITY>> PUR_Expense_Report_Search(PUR_Expense_Report_ENTITY input);
        Task<List<PUR_Import_Invoice_Report_ENTITY>> PUR_Import_Invoice_Report_Search(PUR_Import_Invoice_Report_ENTITY input);
        Task<List<PUR_Inventory_Return_Report_ENTITY>> PUR_Inventory_Return_Report_Search(PUR_Inventory_Return_Report_ENTITY input);
        Task<List<PUR_Journal_ENTITY>> PUR_Journal_Search(PUR_Journal_ENTITY input);
        Task<List<PUR_Order_Report_ENTITY>> PUR_Order_Report_Search(PUR_Order_Report_ENTITY input);
        Task<List<PUR_Service_Purchase_Invoice_Report_ENTITY>> PUR_Service_Purchase_Invoice_Report_Search(PUR_Service_Purchase_Invoice_Report_ENTITY input);

    }
}
