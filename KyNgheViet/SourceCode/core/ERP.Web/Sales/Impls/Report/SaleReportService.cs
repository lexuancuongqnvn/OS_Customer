using ERP.Common.Controllers;
using Sales.Infs.Report;
using Sales.Infs.Report.Dto;
using Sales.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Impls.Report
{
    public class SaleReportService : ISaleReportService
    {
        public async Task<List<Sales_Report_Of_Accounts_Receivable_Balances_ENTITY>> Sales_Report_Of_Accounts_Receivable_Balances_Search(Sales_Report_Of_Accounts_Receivable_Balances_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<Sales_Report_Of_Accounts_Receivable_Balances_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Sales_Report_Of_Accounts_Receivable_Balances_Search, input);
            return result;
        }

        public async Task<List<Sales_Report_Inventory_Materials_ENTITY>> Sales_Report_Inventory_Materials_Search(Sales_Report_Inventory_Materials_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<Sales_Report_Inventory_Materials_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Sales_Report_Inventory_Materials_Search, input);
            return result;
        } 
        public async Task<List<SALES_Report_S32_ENTITY>> SALES_Report_S32_Search(SALES_Report_S32_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALES_Report_S32_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALES_Report_S32_Search, input);
            return result;
        } 
        public async Task<List<SALES_Report_S33_ENTITY>> SALES_Report_S33_Search(SALES_Report_S33_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALES_Report_S33_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALES_Report_S33_Search, input);
            return result;
        } 
        public async Task<List<SALES_Report_S32_Sales_ENTITY>> SALES_Report_S32_Sales_Search(SALES_Report_S32_Sales_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALES_Report_S32_Sales_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALES_Report_S32_Sales_Search, input);
            return result;
        } 
        public async Task<List<SALES_Report_Gross_Profit_ENTITY>> SALES_Report_Gross_Profit_Search(SALES_Report_Gross_Profit_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALES_Report_Gross_Profit_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALES_Report_Gross_Profit_Search, input);
            return result;
        }  
        public async Task<List<SALES_Report_Sales_Daybook_ENTITY>> SALES_Report_Sales_Daybook_Search(SALES_Report_Sales_Daybook_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALES_Report_Sales_Daybook_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALES_Report_Sales_Daybook_Search, input);
            return result;
        } 
        public async Task<List<SALES_Report_Accounts_Receivable_Subsidiary_Ledger_ENTITY>> SALES_Report_Accounts_Receivable_Subsidiary_Ledger_Search(SALES_Report_Accounts_Receivable_Subsidiary_Ledger_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALES_Report_Accounts_Receivable_Subsidiary_Ledger_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALES_Report_Accounts_Receivable_Subsidiary_Ledger_Search, input);
            return result;
        } 
        public async Task<List<Sales_CAT_Goods_Configuration_Report_ENTITY>> Sales_CAT_Goods_Configuration_Report_Search(Sales_CAT_Goods_Configuration_Report_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<Sales_CAT_Goods_Configuration_Report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Sales_CAT_Goods_Configuration_Report_Search, input);
            return result;
        }

        public async Task<List<SALE_Accounts_Receivable_Ledger_ENTITY>> SALE_Accounts_Receivable_Ledger_Search(SALE_Accounts_Receivable_Ledger_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALE_Accounts_Receivable_Ledger_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALE_Accounts_Receivable_Ledger_Search, input);
            return result;
        }

        public async Task<List<SALE_Statement_Of_Changes_In_Financial_Position_ENTITY>> SALE_Statement_Of_Changes_In_Financial_Position_Search(SALE_Statement_Of_Changes_In_Financial_Position_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALE_Statement_Of_Changes_In_Financial_Position_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALE_Statement_Of_Changes_In_Financial_Position_Search, input);
            return result;
        }

        public async Task<List<SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_ENTITY>> SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_Search(SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_Search, input);
            return result;
        }

        public async Task<List<SALE_Year_End_Balance_Sheet_Compilation_ENTITY>> SALE_Year_End_Balance_Sheet_Compilation_Search(SALE_Year_End_Balance_Sheet_Compilation_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SALE_Year_End_Balance_Sheet_Compilation_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.SALE_Year_End_Balance_Sheet_Compilation_Search, input);
            return result;
        }
    }
}
