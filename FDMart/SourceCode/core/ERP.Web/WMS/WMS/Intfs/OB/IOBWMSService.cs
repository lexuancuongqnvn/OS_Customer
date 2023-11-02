using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.OB.Dto;

namespace WMS.Intfs.OB
{
    public interface IOBWMSService
    {
        Task<IDictionary<string, object>> OB_Goods_Delete(OB_Goods_ENTITY input);
        Task<IDictionary<string, object>> OB_Goods_Update(OB_Goods_ENTITY input);
        Task<IDictionary<string, object>> OB_Goods_Insert(OB_Goods_ENTITY input);
        Task<List<OB_Goods_ENTITY>> OB_Goods_Search(OB_Goods_ENTITY input);

        Task<IDictionary<string, object>> OB_Input_Output_Inventory_Delete(OB_Input_Output_Inventory_ENTITY input);
        Task<IDictionary<string, object>> OB_Input_Output_Inventory_Update(OB_Input_Output_Inventory_ENTITY input);
        Task<IDictionary<string, object>> OB_Input_Output_Inventory_Insert(OB_Input_Output_Inventory_ENTITY input);
        Task<List<OB_Input_Output_Inventory_ENTITY>> OB_Input_Output_Inventory_Search(OB_Input_Output_Inventory_ENTITY input);

        Task<IDictionary<string, object>> OB_Account_Delete(OB_Account_ENTITY input);
        Task<IDictionary<string, object>> OB_Account_Update(OB_Account_ENTITY input);
        Task<IDictionary<string, object>> OB_Account_Insert(OB_Account_ENTITY input);
        Task<List<OB_Account_ENTITY>> OB_Account_Search(OB_Account_ENTITY input);
    }
}
