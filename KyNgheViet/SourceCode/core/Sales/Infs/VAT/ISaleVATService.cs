using Sales.Infs.VAT.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Infs.VAT
{
    public interface ISaleVATService
    {
        Task<List<Accounting_VAT_Output_ENTITY>> Accounting_VAT_Output_Search(Accounting_VAT_Output_ENTITY input);
        Task<IDictionary<string, object>> Accounting_VAT_Output_Insert(Accounting_VAT_Output_ENTITY input);
        Task<IDictionary<string, object>> Accounting_VAT_Output_Update(Accounting_VAT_Output_ENTITY input);
        Task<IDictionary<string, object>> Accounting_VAT_Output_Delete(Accounting_VAT_Output_ENTITY input);

        Task<List<Accounting_VAT_Input_ENTITY>> Accounting_VAT_Input_Search(Accounting_VAT_Input_ENTITY input);
        Task<IDictionary<string, object>> Accounting_VAT_Input_Insert(Accounting_VAT_Input_ENTITY input);
        Task<IDictionary<string, object>> Accounting_VAT_Input_Update(Accounting_VAT_Input_ENTITY input);
        Task<IDictionary<string, object>> Accounting_VAT_Input_Delete(Accounting_VAT_Input_ENTITY input);     
        
        Task<List<CAT_Tax_ENTITY>> CAT_Tax_Search(CAT_Tax_ENTITY input);
        Task<IDictionary<string, object>> CAT_Tax_Insert(CAT_Tax_ENTITY input);
        Task<IDictionary<string, object>> CAT_Tax_Update(CAT_Tax_ENTITY input);
        Task<IDictionary<string, object>> CAT_Tax_Delete(CAT_Tax_ENTITY input);
    }
}
