using ERP.Warranty.Intfs.Laptop.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Warranty.Intfs.Laptop
{
    public interface IWarrantyService
    {
        Task<List<Warranty_Laptop_ENTITY>> Warranty_Laptop_Search(Warranty_Laptop_ENTITY input);
        Task<List<Warranty_Laptop_ENTITY>> Warranty_Laptop_History_Search(Warranty_Laptop_ENTITY input);
        Task<IDictionary<string, object>> Warranty_Laptop_Update(Warranty_Laptop_ENTITY input);
        Task<IDictionary<string, object>> Warranty_Laptop_Inserst(Warranty_Laptop_ENTITY input);
        Task<List<Warranty_Laptop_Print_History_ENTITY>> Warranty_Laptop_Print_History_Search(Warranty_Laptop_Print_History_ENTITY input);
        Task<List<Warranty_Laptop_Log_Update_ENTITY>> Warranty_Laptop_Log_Update_Search(Warranty_Laptop_Log_Update_ENTITY input);
    }
}
