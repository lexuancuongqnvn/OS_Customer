using CASH.Infs.Report;
using CASH.Infs.Report.Dto;
using CASH.Infs.Voucher.Dto;
using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CASH.Shared;

namespace CASH.Impls.Report
{
    public class CashReportService : ICashReportService
    {
        public async Task<List<CASH_Bank_Deposit_Ledger_ENTITY>> CASH_Bank_Deposit_Ledger_Search(CASH_Bank_Deposit_Ledger_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CASH_Bank_Deposit_Ledger_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CASH_Bank_Deposit_Ledger_Search, input);
            return result;
        }

        public async Task<List<CASH_Disbursement_Journal_ENTITY>> CASH_Disbursement_Journal_Search(CASH_Disbursement_Journal_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CASH_Disbursement_Journal_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CASH_Disbursement_Journal_Search, input);
            return result;
        }

        public async Task<List<CASH_Ledger_Report_ENTITY>> CASH_Ledger_Report_Search(CASH_Ledger_Report_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CASH_Ledger_Report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CASH_Ledger_Report_Search, input);
            return result;
        }

        public async Task<List<CASH_Receipts_Ledger_ENTITY>> CASH_Receipts_Ledger_Search(CASH_Receipts_Ledger_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CASH_Receipts_Ledger_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CASH_Receipts_Ledger_Search, input);
            return result;
        }

        public async Task<List<CASH_Payment_voucher_report_ENTITY>> CASH_Payment_voucher_report_Search(CASH_Payment_voucher_report_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CASH_Payment_voucher_report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CASH_Payment_voucher_report_Search, input);
            return result;
        }

        public async Task<List<CASH_Receipt_report_ENTITY>> CASH_Receipt_report_Search(CASH_Receipt_report_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CASH_Receipt_report_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CASH_Receipt_report_Search, input);
            return result;
        }
    }
}
