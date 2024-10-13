using Consolidation.Infs.Category.Dto;
using Consolidation.Infs.Report.Dto;
using Consolidation.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Consolidation.Infs.Report
{
    public interface IConsolidationReport
    {
        //report
        Task<List<CON_Statement_Of_Cash_Flows_Report_ENTITY>> CON_Statement_Of_Cash_Flows_Report_Search(CON_Statement_Of_Cash_Flows_Report_ENTITY input);
        Task<List<CON_Account_Consolidation_By_A_Account_ENTITY>> CON_Account_Consolidation_By_A_Account_Search(CON_Account_Consolidation_By_A_Account_ENTITY input);
        Task<List<CON_Account_Book_Detail_ENTITY>> CON_Account_Book_Detail_Search(CON_Account_Book_Detail_ENTITY input);
        Task<List<CON_General_Ledger_ENTITY>> CON_General_Ledger_Search(CON_General_Ledger_ENTITY input);

        Task<List<CON_Voucher_Ledger_Book_ENTITY>> CON_Voucher_Ledger_Book_Search(CON_Voucher_Ledger_Book_ENTITY input);
        Task<List<CON_General_Accounting_Ledger_Book_ENTITY>> CON_General_Accounting_Ledger_Book_Search(CON_General_Accounting_Ledger_Book_ENTITY input);
        Task<List<CON_General_Accounting_Ledger_ENTITY>> CON_General_Accounting_Ledger_Search(CON_General_Accounting_Ledger_ENTITY input);
    }
}
