using HRMS.Intfs.Branch.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Intfs.Branch
{
    public interface IHRM_BranchService
    {
        Task<List<HRM_Branch_ENTITY>> HRM_Branch_Search(HRM_Branch_ENTITY input);
        Task<IDictionary<string, object>> HRM_Branch_Actions(HRM_Branch_ENTITY input);
    }
}
