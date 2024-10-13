using ERP.System.Intfs.Department.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Department
{
    public interface IDepartmentService
    {
        Task<IDictionary<string, object>> Department_Actions(Department_ENTITY input);
        Task<List<Department_ENTITY>> Department_Search(Department_ENTITY input);
        Task<List<Department_Title_ENTITY>> Department_Title_Search(Department_Title_ENTITY input);
        Task<List<Department_Position_ENTITY>> Department_Position_Search(Department_Position_ENTITY input);
        Task<IDictionary<string, object>> Department_Position_Actions(Department_Position_ENTITY input);
    }
}
