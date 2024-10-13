using Common.Models.Request;
using ERP.Common.App_Data.Log;
using ERP.Common.Models;
using ERP.Common.TokenAuthentication;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Common.Controllers
{
    //[ApiExplorerSettings(IgnoreApi = true)]
    public class AuthenticateController : ControllerBase
    {
        private readonly ITokenManager tokenManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public static List<string> list_host_allow_request = new List<string>();
        public static User appSessionUser = new User();
        private IMemoryCache memoryCache;

        public AuthenticateController(ITokenManager tokenManager, IHttpContextAccessor httpContextAccessor,IMemoryCache memoryCache)
        {
            this.tokenManager = tokenManager;
            this._httpContextAccessor = httpContextAccessor;
            this.memoryCache = memoryCache;
        }
        [HttpPost]
        [Route("api/login")]
        public ActionResult<User> Authenticate([FromBody]User user)
        {
            Token token = new Token();
            Headers headers = new Headers();
            string host ="";

            try
            {
                host = _httpContextAccessor.HttpContext.Request.Headers["origin"].ToString();
                if(host != "ERPOSOFTAPP")
                {
                    user.deviceType = "MobileApp";
                    if (!list_host_allow_request.Contains(host))
                    {
                        DirAppend.Main("Your host not allow request :" + host + "\n" + String.Join(";", list_host_allow_request));
                        return Ok(new { Status = -404, Message = "Your host not allow request" });
                    }
                    try { headers.UserAgent = Request.HttpContext.Request.Headers.First(x => x.Key == "User-Agent").Value.ToString(); } catch (Exception ex) { DirAppend.Main("User-Agent" + ex.Message); }
                    try { headers.Sec_ch_ua = Request.HttpContext.Request.Headers.First(x => x.Key == "sec-ch-ua").Value.ToString(); } catch (Exception ex) { DirAppend.Main("sec-ch-ua" + ex.Message); }
                    try { headers.Sec_ch_ua_platform = Request.HttpContext.Request.Headers.First(x => x.Key == "sec-ch-ua-platform").Value.ToString(); } catch (Exception ex) { DirAppend.Main("sec-ch-ua-platform" + ex.Message); }
                }
            }
            catch (Exception ex){
                DirAppend.Main("error check list host :" + host + "\n" + String.Join(";", list_host_allow_request));
                DirAppend.Main(ex.Message);
            }
            user.requestModel = new RequestModel();
            if (tokenManager.Authenticate(user.username, user.password, headers, ref user,ref token))
            {
                user.status = 0;
                user.message = "Success";
                return Ok(user);
            }
            return Ok(new { Status = user.requestModel.Status, Message = user.requestModel.Message.ToString() });
        }
        [HttpPost]
        [Route("api/logintoken")]
        public ActionResult<User> AuthenticateToken([FromBody] User user)
        {
            string qr = @"EXEC [dbo].[SYS_Account_Infomation_Token_CheckLogin] @p_Token = N'" + user.tokens + @"' ";

            DataTable dataTable = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("ID"), "SYS_Account_Infomation_Token_CheckLogin", qr);

            if (dataTable.Rows[0]["Status"].ToString() == "0")
            {

                //var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromHours(int.Parse(dataTable.Rows[0]["TimeOut"].ToString())));
                DataRow row = dataTable.Rows[0];
                user.id = int.Parse(row["ID"].ToString());
                user.code = row["CODE"].ToString();
                if (string.IsNullOrEmpty(row["ROLEID"].ToString()))
                    user.roleID = -1;
                else
                    user.roleID = int.Parse(row["ROLEID"].ToString());
                user.roleName = row["ROLE_NAME"].ToString();
                user.avatar = row["AVARTA"].ToString();
                user.lastName = row["LAST_NAME"].ToString();
                user.firstName = row["FIRST_NAME"].ToString();
                user.username = row["USER_NAME"].ToString();
                user.branch = row["branch_code"].ToString();
                user.department = row["department_code"].ToString();
                user.title_code = row["title_code"].ToString();
                user.position_code = row["position_code"].ToString();
                user.level = int.Parse(row["level"].ToString());
                user.token = new Token();
                user.token.ExpiryDate = (DateTime)row["ExpiryDate"];
                
                if (string.IsNullOrEmpty(row["LANGUAGE_ID"].ToString()))
                    user.languageId = 1;
                else
                    user.languageId = int.Parse(row["LANGUAGE_ID"].ToString());
                return Ok(user);
            }
            else
            {
                user.requestModel = new RequestModel();
                user.requestModel.Status = -1;
                user.requestModel.Message = "Login error";
                return Ok(new { Status = 1, Message = user.requestModel.Message.ToString() });
            }
            
        }
        [HttpPost]
        [Route("api/logout")]
        public ActionResult<User> Authenticate_Logout([FromBody] User user)
        {
            if (tokenManager.Deactivate(user.tokens))
            {
                return Ok(new { Status = 0, Message = "Token đã vô hiệu hóa thành công"});
            }
            return Ok(new { Status = -1, Message = "Token không hợp lệ" });
        }
        public static void SaveRequest(string username, string password)
        {

        }
        [HttpPost]
        [Route("api/A0226970B47B14288964566602C9C9646")]
        public IDictionary<string, object> A0226970B47B14288964566602C9C9646()
        {
            string qr = "select * from SYS_Account_Infomation where isblock = 1 ";
            DataTable dt = ManagementController.GetDataTable("SYS_Account_Infomation", qr);
            IDictionary<string, object> result = new Dictionary<string, object>();
            result.Add("SYS_Account_Infomation", new { status = dt.Rows.Count, message = "ok" });
            return result;
        }
        [HttpPost]
        [Route("api/S0226970B47B14288964566602C9C9646")]
        public IDictionary<string, object> S0226970B47B14288964566602C9C9646()
        {
            string qr = "update SYS_Account_Infomation set isblock = 0, date_edit = getdate() ;";
            bool check = ManagementController.ExecuteNonQuery(ConnectController.GetConnectStringByKey("ID"), qr);
           
            qr = "select * from RequestManagement where ExpiryDate >= GETDATE() ";
            DataTable dtRequestManagement = ManagementController.GetDataTable("RequestManagement", qr);

            foreach(DataRow row in dtRequestManagement.Rows){
                try{
                    string tk = row["Token"].ToString();
                    memoryCache.Remove(tk);
                }catch{}
            }
            qr = "update RequestManagement set ExpiryDate = getdate() where ExpiryDate >= GETDATE()  ;";
            check = ManagementController.ExecuteNonQuery(ConnectController.GetConnectStringByKey("ID"), qr);

            IDictionary<string, object> result = new Dictionary<string, object>();
            result.Add("SYS_Account_Infomation", new { status =0, message = "Cập nhật thành công" });
            return result;
        }
    }
}
