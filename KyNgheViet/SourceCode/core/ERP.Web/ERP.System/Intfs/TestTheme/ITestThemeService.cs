using Abp.Application.Services;
using ERP.System.Intfs.TestTheme.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.TestTheme
{
    public interface ITestThemeService : IApplicationService
    {
        Task<tb_TestTheme_ENTITY> TestTheme_Search_byID(string code);
        Task<IDictionary<string, object>> TestTheme_Del(string code);
        Task<IDictionary<string, object>> TestTheme_Insert(tb_TestTheme_ENTITY input);
        Task<IDictionary<string, object>> TestTheme_Update(tb_TestTheme_ENTITY input);
        Task<List<tb_TestTheme_ENTITY>> TestTheme_Search(tb_TestTheme_ENTITY input);
    }
}
