using ERP.Common.Controllers;
using ERP.System.Intfs.Department;
using ERP.System.Intfs.Department.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Impls.Department
{
    public class DepartmentService : IDepartmentService
    {
        public async Task<IDictionary<string, object>> Department_Actions(Department_ENTITY input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Department_Actions, input));
            return result;
        }

        public async Task<List<Department_Position_ENTITY>> Department_Position_Search(Department_Position_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Department_Position_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Department_Position_Actions, input);
            return result;
        }
        public async Task<IDictionary<string, object>> Department_Position_Actions(Department_Position_ENTITY input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Department_Position_Actions, input));
            return result;
        }
        public async Task<List<Department_ENTITY>> Department_Search(Department_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Department_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Department_Search, input);
            return result;
        }

        public async Task<List<Department_Title_ENTITY>> Department_Title_Search(Department_Title_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Department_Title_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Department_Title_Search, input);
            return result;
        }
    }
}
