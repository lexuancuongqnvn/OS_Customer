using CASH.Infs.Report.Dto;
using CASH.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CASH.Infs.Report
{
    public interface ICashReportService
    {
        Task<List<CASH_Receipt_report_ENTITY>> CASH_Receipt_report_Search(CASH_Receipt_report_ENTITY input);
        Task<List<CASH_Payment_voucher_report_ENTITY>> CASH_Payment_voucher_report_Search(CASH_Payment_voucher_report_ENTITY input);
        Task<List<CASH_Receipts_Ledger_ENTITY>> CASH_Receipts_Ledger_Search(CASH_Receipts_Ledger_ENTITY input);
        Task<List<CASH_Ledger_Report_ENTITY>> CASH_Ledger_Report_Search(CASH_Ledger_Report_ENTITY input);
        Task<List<CASH_Disbursement_Journal_ENTITY>> CASH_Disbursement_Journal_Search(CASH_Disbursement_Journal_ENTITY input);
        Task<List<CASH_Bank_Deposit_Ledger_ENTITY>> CASH_Bank_Deposit_Ledger_Search(CASH_Bank_Deposit_Ledger_ENTITY input);
    }
}
