using Abp.Application.Services;
using ERP.System.Intfs.Reference.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Reference
{
    public interface IReferenceService : IApplicationService
    {
        Task<List<REFERENCE_ENTITY>> Reference_Search(REFERENCE_ENTITY input);
    }
}
