using ERP.Common.Controllers;
using ERP.System.Intfs.Upload;
using ERP.System.Intfs.Upload.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Impls.Upload
{
    public class UploadService : IUploadService
    {
        public async Task<List<Upload_ENTITY>> SYS_Upload_Get(Upload_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(ConnectController.GetConnectStringByKey("UPLOAD"), CommonStoreProcedure.SYS_Upload_Get, input);
            return result;
        }

        public async Task<List<Upload_ENTITY>> SYS_Upload_Save(Upload_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(ConnectController.GetConnectStringByKey("UPLOAD"), CommonStoreProcedure.SYS_Upload_Save, input);
            return result;
        }
        public async Task<List<Upload_ENTITY>> SYS_Upload_Search(Upload_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(ConnectController.GetConnectStringByKey("UPLOAD"), CommonStoreProcedure.SYS_Upload_Search, input);
            return result;
        }

    }
}
