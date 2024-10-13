using ERP.Common.Controllers;
using ERP.System.Intfs.TestTheme;
using ERP.System.Intfs.TestTheme.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Impls.TestTheme
{
    public class TestThemeService : ITestThemeService
    {
        public async Task<List<tb_TestTheme_ENTITY>> TestTheme_Search(tb_TestTheme_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<tb_TestTheme_ENTITY>(CommonStoreProcedure.TestTheme_Search, input);
            return result;
        }

        public async Task<tb_TestTheme_ENTITY> TestTheme_Search_byID(string code)
        {
            var result = (await ManagementController.GetDataFromStoredProcedure<tb_TestTheme_ENTITY>(CommonStoreProcedure.TestTheme_Search_byID, new
            {
                code = code
            })).FirstOrDefault();
            return result;
        }

        public async Task<IDictionary<string, object>> TestTheme_Update(tb_TestTheme_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(CommonStoreProcedure.TestTheme_Update, input);
            return result;
        }
        public async Task<IDictionary<string, object>> TestTheme_Insert(tb_TestTheme_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(CommonStoreProcedure.TestTheme_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> TestTheme_Del(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(CommonStoreProcedure.TestTheme_Del, new
            {
                code = code
            });
            return result;
        }
    }
}
