using Consolidation.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Consolidation.Infs.Voucher
{
    public interface IConsolidationVoucherService
    {
        Task<List<C51_M_ENTITY>> C51_M_Search(C51_M_ENTITY input);
        Task<List<C51_D_ENTITY>> C51_D_Search(C51_D_ENTITY input);
        Task<IDictionary<string, object>> C51_M_Insert(C51_M_ENTITY input);
        Task<IDictionary<string, object>> C51_M_Update(C51_M_ENTITY input);
        Task<IDictionary<string, object>> C51_M_Delete(C51_M_ENTITY input);

        Task<List<Carry_Forward_Execute_ENTITY>> Carry_Forward_Execute(Carry_Forward_Execute_ENTITY input);
        Task<IDictionary<string, object>> Carry_Forward_Delete_Executed(Carry_Forward_Execute_ENTITY input);
    }
}
