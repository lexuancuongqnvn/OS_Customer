using CASH.Infs.Voucher.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CASH.Infs.Voucher
{
    public interface ICashVoucherService
    {
        Task<List<C11_M_ENTITY>> C11_M_Search(C11_M_ENTITY input);
        Task<List<C11_D_ENTITY>> C11_D_Search(C11_D_ENTITY input);
        Task<IDictionary<string, object>> C11_M_Insert(C11_M_ENTITY input);
        Task<IDictionary<string, object>> C11_M_Update(C11_M_ENTITY input);
        Task<IDictionary<string, object>> C11_M_Delete(C11_M_ENTITY input);

        Task<List<C12_M_ENTITY>> C12_M_Search(C12_M_ENTITY input);
        Task<List<C12_D_ENTITY>> C12_D_Search(C12_D_ENTITY input);
        Task<IDictionary<string, object>> C12_M_Insert(C12_M_ENTITY input);
        Task<IDictionary<string, object>> C12_M_Update(C12_M_ENTITY input);
        Task<IDictionary<string, object>> C12_M_Delete(C12_M_ENTITY input);

        Task<List<C15_M_ENTITY>> C15_M_Search(C15_M_ENTITY input);
        Task<List<C15_D_ENTITY>> C15_D_Search(C15_D_ENTITY input);
        Task<IDictionary<string, object>> C15_M_Insert(C15_M_ENTITY input);
        Task<IDictionary<string, object>> C15_M_Update(C15_M_ENTITY input);
        Task<IDictionary<string, object>> C15_M_Delete(C15_M_ENTITY input);

        Task<List<C16_M_ENTITY>> C16_M_Search(C16_M_ENTITY input);
        Task<List<C16_D_ENTITY>> C16_D_Search(C16_D_ENTITY input);
        Task<IDictionary<string, object>> C16_M_Insert(C16_M_ENTITY input);
        Task<IDictionary<string, object>> C16_M_Update(C16_M_ENTITY input);
        Task<IDictionary<string, object>> C16_M_Delete(C16_M_ENTITY input);
    }
}
