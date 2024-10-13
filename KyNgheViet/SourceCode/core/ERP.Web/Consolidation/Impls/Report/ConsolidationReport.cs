using Consolidation.Infs.Category.Dto;
using Consolidation.Infs.Report;
using Consolidation.Infs.Report.Dto;
using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Consolidation.Shared;

namespace Consolidation.Impls.Report
{
    public class ConsolidationReport : IConsolidationReport
    {
        public async Task<List<CON_Statement_Of_Cash_Flows_Report_ENTITY>> CON_Statement_Of_Cash_Flows_Report_Search(CON_Statement_Of_Cash_Flows_Report_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CON_Statement_Of_Cash_Flows_Report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CON_Statement_Of_Cash_Flows_Report_Search, input);
            return result;
        }
        public async Task<List<CON_Account_Consolidation_By_A_Account_ENTITY>> CON_Account_Consolidation_By_A_Account_Search(CON_Account_Consolidation_By_A_Account_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CON_Account_Consolidation_By_A_Account_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CON_Account_Consolidation_By_A_Account_Search, input);
            return result;
        }
        public async Task<List<CON_Account_Book_Detail_ENTITY>> CON_Account_Book_Detail_Search(CON_Account_Book_Detail_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CON_Account_Book_Detail_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CON_Account_Book_Detail_Search, input);
            return result;
        } 
        public async Task<List<CON_General_Ledger_ENTITY>> CON_General_Ledger_Search(CON_General_Ledger_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CON_General_Ledger_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CON_General_Ledger_Search, input);
            return result;
        }

        public async Task<List<CON_Voucher_Ledger_Book_ENTITY>> CON_Voucher_Ledger_Book_Search(CON_Voucher_Ledger_Book_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CON_Voucher_Ledger_Book_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CON_Voucher_Ledger_Book_Search, input);
            return result;
        }

        public async Task<List<CON_General_Accounting_Ledger_Book_ENTITY>> CON_General_Accounting_Ledger_Book_Search(CON_General_Accounting_Ledger_Book_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CON_General_Accounting_Ledger_Book_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CON_General_Accounting_Ledger_Book_Search, input);
            return result;
        }

        public async Task<List<CON_General_Accounting_Ledger_ENTITY>> CON_General_Accounting_Ledger_Search(CON_General_Accounting_Ledger_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CON_General_Accounting_Ledger_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CON_General_Accounting_Ledger_Search, input);
            return result;
        }
    }
}
