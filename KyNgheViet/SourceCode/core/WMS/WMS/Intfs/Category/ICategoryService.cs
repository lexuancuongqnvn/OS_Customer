using ERP.Common.Shared.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.Category.Dto;

namespace WMS.Intfs.Category
{
    public interface ICategoryService
    {
        Task<IDictionary<string, object>> CAT_Warehouse_Action_By_Type(CAT_Warehouse_ENTITY input);
        Task<List<CAT_Warehouse_ENTITY>> CAT_Warehouse_Search(CAT_Warehouse_ENTITY input);

        Task<IDictionary<string, object>> CAT_Goods_Delete(CAT_Goods_ENTITY input);
        Task<IDictionary<string, object>> CAT_Goods_Update(CAT_Goods_ENTITY input);
        Task<IDictionary<string, object>> CAT_Goods_Insert(CAT_Goods_ENTITY input);
        Task<List<CAT_Goods_ENTITY>> CAT_Goods_Search(CAT_Goods_ENTITY input);

        Task<IDictionary<string, object>> CAT_Goods_Unit_Action_By_Type(CAT_Goods_Unit_ENTITY input);
        Task<List<CAT_Goods_Unit_ENTITY>> CAT_Goods_Unit_Search(CAT_Goods_Unit_ENTITY input);

        Task<IDictionary<string, object>> CAT_Goods_Group_Action_By_Type(CAT_Goods_Group_ENTITY input);
        Task<List<CAT_Goods_Group_ENTITY>> CAT_Goods_Group_Search(CAT_Goods_Group_ENTITY input);

        Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Delete(CAT_Goods_Unit_Conversion_Factor_ENTITY input);
        Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Update(CAT_Goods_Unit_Conversion_Factor_ENTITY input);
        Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Insert(CAT_Goods_Unit_Conversion_Factor_ENTITY input);
        Task<List<CAT_Goods_Unit_Conversion_Factor_ENTITY>> CAT_Goods_Unit_Conversion_Factor_Search(CAT_Goods_Unit_Conversion_Factor_ENTITY input);

        Task<IDictionary<string, object>> CAT_Goods_Serial_Delete(CAT_Goods_Serial_ENTITY input);
        Task<IDictionary<string, object>> CAT_Goods_Serial_Update(CAT_Goods_Serial_ENTITY input);
        Task<IDictionary<string, object>> CAT_Goods_Serial_Insert(CAT_Goods_Serial_ENTITY input);
        Task<List<CAT_Goods_Serial_ENTITY>> CAT_Goods_Serial_Search(CAT_Goods_Serial_ENTITY input);

        Task<IDictionary<string, object>> CAT_Goods_Configuration_Delete(CAT_Goods_Configuration_ENTITY input);
        Task<IDictionary<string, object>> CAT_Goods_Configuration_Update(CAT_Goods_Configuration_ENTITY input);
        Task<IDictionary<string, object>> CAT_Goods_Configuration_Insert(CAT_Goods_Configuration_ENTITY input);
        Task<List<CAT_Goods_Configuration_ENTITY>> CAT_Goods_Configuration_Search(CAT_Goods_Configuration_ENTITY input);
        Task<List<CAT_Goods_Configuration_ENTITY>> CAT_Goods_Configuration_Search_By_Goods(CAT_Goods_Configuration_ENTITY input);

    }
}
