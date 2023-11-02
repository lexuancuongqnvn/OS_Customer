using ERP.Common.Controllers;
using ERP.System.Intfs.Reference;
using ERP.System.Intfs.Reference.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Impls.Reference
{
    public class ReferenceService: IReferenceService
    {
        public async Task<List<REFERENCE_ENTITY>> Reference_Search(REFERENCE_ENTITY input)
        {
            return await ManagementController.GetDataFromStoredProcedure<REFERENCE_ENTITY>(ConnectController.GetConnectStringByKey("ID"), input.Stored, input);
        }
    }
}
