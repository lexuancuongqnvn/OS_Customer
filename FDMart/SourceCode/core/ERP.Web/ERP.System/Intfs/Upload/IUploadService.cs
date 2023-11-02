using ERP.System.Intfs.Upload.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Upload
{
    public interface IUploadService
    {
        Task<List<Upload_ENTITY>> SYS_Upload_Save(Upload_ENTITY input);
        Task<List<Upload_ENTITY>> SYS_Upload_Get(Upload_ENTITY input);
        Task<List<Upload_ENTITY>> SYS_Upload_Search(Upload_ENTITY input);
    }
}
