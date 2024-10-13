using ERP.Common.Controllers;
using Purchase.Infs.Report;
using Purchase.Infs.Report.Dto;
using Purchase.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Purchase.Shared;

namespace Purchase.Impls.Report
{
    public class PurchaseReportService : IPurchaseReportService
    {
        public async Task<List<PUR_Order_Report_ENTITY>> PUR_Order_Report_Search(PUR_Order_Report_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Order_Report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Order_Report_Search, input);
            return result;
        }

        public async Task<List<PUR_Accounts_Payable_Ledger_ENTITY>> PUR_Accounts_Payable_Ledger_Search(PUR_Accounts_Payable_Ledger_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Accounts_Payable_Ledger_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Accounts_Payable_Ledger_Search, input);
            return result;
        }

        public async Task<List<PUR_Accounts_Payable_Report_By_Invoice_ENTITY>> PUR_Accounts_Payable_Report_By_Invoice_Search(PUR_Accounts_Payable_Report_By_Invoice_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Accounts_Payable_Report_By_Invoice_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Accounts_Payable_Report_By_Invoice_Search, input);
            return result;
        }

        public async Task<List<PUR_Aggregate_Cost_Coupon_Print_ENTITY>> PUR_Aggregate_Cost_Coupon_Print_Search(PUR_Aggregate_Cost_Coupon_Print_ENTITY input)
        {
             var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Aggregate_Cost_Coupon_Print_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Aggregate_Cost_Coupon_Print_Search, input);
            return result;
        }

        public async Task<List<PUR_Aggregate_Print_Import_Slips_At_Cost_ENTITY>> PUR_Aggregate_Print_Import_Slips_At_Cost_Search(PUR_Aggregate_Print_Import_Slips_At_Cost_ENTITY input)
        {
             var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Aggregate_Print_Import_Slips_At_Cost_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Aggregate_Print_Import_Slips_At_Cost_Search, input);
            return result;
        }

        public async Task<List<PUR_Combined_Purchases_Imported_Inventory_ENTITY>> PUR_Combined_Purchases_Imported_Inventory_Search(PUR_Combined_Purchases_Imported_Inventory_ENTITY input)
        {
             var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Combined_Purchases_Imported_Inventory_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Combined_Purchases_Imported_Inventory_Search, input);
            return result;
        }

        public async Task<List<PUR_Expense_Report_ENTITY>> PUR_Expense_Report_Search(PUR_Expense_Report_ENTITY input)
        {
             var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Expense_Report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Expense_Report_Search, input);
            return result;
        }

        public async Task<List<PUR_Import_Invoice_Report_ENTITY>> PUR_Import_Invoice_Report_Search(PUR_Import_Invoice_Report_ENTITY input)
        {
             var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Import_Invoice_Report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Import_Invoice_Report_Search, input);
            return result;
        }

        public async Task<List<PUR_Inventory_Return_Report_ENTITY>> PUR_Inventory_Return_Report_Search(PUR_Inventory_Return_Report_ENTITY input)
        {
             var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Inventory_Return_Report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Inventory_Return_Report_Search, input);
            return result;
        }

        public async Task<List<PUR_Journal_ENTITY>> PUR_Journal_Search(PUR_Journal_ENTITY input)
        {
             var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Journal_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Journal_Search, input);
            return result;
        }

        public async Task<List<PUR_Service_Purchase_Invoice_Report_ENTITY>> PUR_Service_Purchase_Invoice_Report_Search(PUR_Service_Purchase_Invoice_Report_ENTITY input)
        {
             var result = await ManagementController.GetDataFromStoredProcedure2<PUR_Service_Purchase_Invoice_Report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.PUR_Service_Purchase_Invoice_Report_Search, input);
            return result;
        }
    }
}
