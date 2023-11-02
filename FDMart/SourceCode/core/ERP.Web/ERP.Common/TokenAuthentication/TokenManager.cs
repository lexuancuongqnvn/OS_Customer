using Common.Models.Request;
using DeviceId;
using ERP.Common.Controllers;
using ERP.Common.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;

namespace ERP.Common.TokenAuthentication
{
    public class TokenManager : ITokenManager
    {
        private List<Token> listTokens;
        private IMemoryCache memoryCache;
        public TokenManager(IMemoryCache memoryCache)
        {
            listTokens = new List<Token>();
            this.memoryCache = memoryCache;
        }
        public bool Authenticate(string username, string password, Headers headers, ref User user,ref Token token)
        {
            //try
            //{
            //    LicenseModel licenseModel = new LicenseModel();
            //    licenseModel = ConnectController.GetLicense("license");
            //    string deviceId = "", path_staup = "", connect_string_to_license = "";
            //    if (licenseModel == null)
            //    {
            //        licenseModel = new LicenseModel();
            //        deviceId = new DeviceIdBuilder()
            //        .AddMacAddress()
            //        .AddProcessorId()
            //        .AddMotherboardSerialNumber()
            //        .ToString();

            //        path_staup = System.IO.Directory.GetCurrentDirectory();
            //        DataTable SYS_License_connect = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("ID"), "SYS_Licenseconnect ", "select top 1 * from SYS_License_Connect");
            //        connect_string_to_license = SYS_License_connect.Rows[0]["connect_string"].ToString();
            //        licenseModel.connectstring = connect_string_to_license;
            //        ConnectController.customer_code = SYS_License_connect.Rows[0]["customer_code"].ToString();
            //        connect_string_to_license = ManagementController.DecryptString(connect_string_to_license);
            //        DataTable SYS_License = ManagementController.GetDataTable(connect_string_to_license, "SYS_License", "SELECT TOP 1 * FROM SYS_License where mac = '" + deviceId + "' and [location] = '" + path_staup + "' AND customer_code = '" + ConnectController.customer_code + @"' and [key] = 'new'");
            //        licenseModel.mac = deviceId;
            //        licenseModel.location = path_staup;
            //        licenseModel.customer_code = ConnectController.customer_code;

            //        ConnectController.customer_code = SYS_License_connect.Rows[0]["customer_code"].ToString();
            //        if (SYS_License == null || SYS_License.Rows.Count == 0)
            //        {
            //            bool result = ManagementController.ExecuteNonQuery(connect_string_to_license, @"SYS_License_Insert
		          //                                                  @p_ID = NULL,
		          //                                                  @p_code = NULL,
		          //                                                  @p_customer_code = '" + ConnectController.customer_code + @"',
		          //                                                  @p_name = '',
		          //                                                  @p_mac = '" + deviceId + @"',
		          //                                                  @p_key = 'new',
		          //                                                  @p_location = '" + path_staup + @"',
		          //                                                  @p_active = 0");
            //            licenseModel.active = false;
            //            ConnectController.License.Add("license", licenseModel);
            //            return false;
            //        }
            //        else if (bool.Parse(SYS_License.Rows[0]["active"].ToString()) == false)
            //        {
            //            bool result = ManagementController.ExecuteNonQuery(connect_string_to_license, @"SYS_License_Insert
		          //                                                  @p_ID = NULL,
		          //                                                  @p_code = NULL,
		          //                                                  @p_customer_code = '" + ConnectController.customer_code + @"',
		          //                                                  @p_name = '',
		          //                                                  @p_mac = '" + deviceId + @"',
		          //                                                  @p_key = '" + ConnectController.customer_code + @" is try connect',
		          //                                                  @p_location = '" + path_staup + @"',
		          //                                                  @p_active = 0");
            //            licenseModel.active = bool.Parse(SYS_License.Rows[0]["active"].ToString());
            //            ConnectController.License.Add("license", licenseModel);
            //            return false;
            //        }
            //        else
            //        {
            //            licenseModel.active = bool.Parse(SYS_License.Rows[0]["active"].ToString());
            //            ConnectController.License.Add("license", licenseModel);
            //        }
            //    }else if(licenseModel.active == false)
            //    {
            //        DataTable SYS_License1 = ManagementController.GetDataTable(ManagementController.DecryptString(licenseModel.connectstring), "SYS_License", "SELECT TOP 1 * FROM SYS_License where mac = '" + licenseModel.mac + "' and [location] = '" + licenseModel.location + "' AND customer_code = '" + licenseModel.customer_code + @"' and [key] = 'new'");
            //        if (bool.Parse(SYS_License1.Rows[0]["active"].ToString()) == false)
            //            return false;
            //        else licenseModel.active = true;
            //    }
            //}
            //catch { return false; }
            token = NewToken();
            password = ManagementController.EncryptString(password);
            string qr = @"EXEC [dbo].[SYS_Account_Infomation_CheckLogin]
                                @p_USER_NAME = '"+ username + @"',
		                        @p_PASSWORD = '"+ password + @"', 
                                @p_Token = N'" + token.Value + @"' ,
                                @p_UserAgent = N'" + headers.UserAgent + @"' ,
                                @p_Sec_ch_ua = N'" + headers.Sec_ch_ua + @"' ,
                                @p_Sec_ch_ua_platform = N'" + headers.Sec_ch_ua_platform + @"',
                                @p_browser = N'" + user.browser + @"',
                                @p_browser_version  = N'" + user.browser_version + @"',
                                @p_device = N'" + user.device + @"',
                                @p_deviceType = N'" + user.deviceType + @"',
                                @p_orientation = N'" + user.orientation + @"',
                                @p_os = N'" + user.os + @"',
                                @p_os_version = N'" + user.os_version + @"',
                                @p_fire_base_token = N'" + user.fire_base_token + @"'";

            DataTable dataTable = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("ID"), "SYS_Account_Infomation_CheckLogin", qr);
          

            if (!string.IsNullOrWhiteSpace(username) &&
                !string.IsNullOrWhiteSpace(password) &&
                dataTable.Rows[0]["Status"].ToString() == "0")
            {
                string COLOR_ID = "";
                try
                {
                    COLOR_ID = dataTable.Rows[0]["COLOR_ID"].ToString();
                }
                catch { }
                if (string.IsNullOrEmpty(COLOR_ID))
                {
                    COLOR_ID = "NULL";
                    user.color_id = 0;
                }
                else user.color_id = int.Parse(COLOR_ID);

                DataTable dataTableColor = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("ID"),
                  "SYS_Color_Acctions", @"EXEC [dbo].[SYS_Color_Acctions]
		            @p_id = "+ COLOR_ID + @",
		            @p_type = 'SEARCH'");
                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromHours(int.Parse(dataTable.Rows[0]["TimeOut"].ToString())));
                
                user.id = int.Parse(dataTable.Rows[0]["ID"].ToString());
                user.code = dataTable.Rows[0]["CODE"].ToString();
                if(string.IsNullOrEmpty(dataTable.Rows[0]["ROLEID"].ToString()))
                    user.roleID = -1;
                else
                    user.roleID = int.Parse(dataTable.Rows[0]["ROLEID"].ToString());
                user.roleName = dataTable.Rows[0]["ROLE_NAME"].ToString();
                user.avatar = dataTable.Rows[0]["AVARTA"].ToString();
                user.lastName = dataTable.Rows[0]["LAST_NAME"].ToString();
                user.firstName = dataTable.Rows[0]["FIRST_NAME"].ToString();
                user.username = dataTable.Rows[0]["USER_NAME"].ToString();
                user.branch = dataTable.Rows[0]["branch_code"].ToString();
                user.department = dataTable.Rows[0]["department_code"].ToString();
                user.title_code = dataTable.Rows[0]["title_code"].ToString();
                user.position_code = dataTable.Rows[0]["position_code"].ToString();
                user.level = int.Parse(dataTable.Rows[0]["level"].ToString());
                user.company_code = dataTable.Rows[0]["COMPANY_CODE"].ToString();
                user.branch_name = dataTable.Rows[0]["branch_name"].ToString();
                
                if(string.IsNullOrEmpty(dataTable.Rows[0]["LANGUAGE_ID"].ToString()))
                user.languageId = 1;
                else
                user.languageId = int.Parse(dataTable.Rows[0]["LANGUAGE_ID"].ToString());
                user.token = token;
                user.colors = new Colors();
                if(dataTableColor != null)
                {
                    user.colors.id = int.Parse(dataTableColor.Rows[0]["id"].ToString()); ;
                    user.colors.buttom = dataTableColor.Rows[0]["buttom"].ToString();
                    user.colors.color = dataTableColor.Rows[0]["color"].ToString();
                    user.colors.background = dataTableColor.Rows[0]["background"].ToString();
                    user.colors.icon = dataTableColor.Rows[0]["icon"].ToString();
                    user.colors.header = dataTableColor.Rows[0]["header"].ToString();
                    user.colors.footer = dataTableColor.Rows[0]["footer"].ToString();
                    user.colors.menu = dataTableColor.Rows[0]["menu"].ToString();
                    user.colors.color1 = dataTableColor.Rows[0]["color1"].ToString();
                    user.colors.color2 = dataTableColor.Rows[0]["color2"].ToString();
                    user.colors.color3 = dataTableColor.Rows[0]["color3"].ToString();
                    user.colors.color4 = dataTableColor.Rows[0]["color4"].ToString();
                    user.colors.is_default = bool.Parse(dataTableColor.Rows[0]["is_default"].ToString());
                }

            AuthenticateController.SaveRequest(username, password);
                memoryCache.Set(token.Value, user, cacheEntryOptions);
                return true;
            }
            else
            {
                user.requestModel = new RequestModel();
                user.requestModel.Status = -1;
                user.requestModel.Message = dataTable.Rows[0]["Message"].ToString();
                return false;
            }
                
        }
        public bool Deactivate(string token)
        {
            string qr = @"EXEC [dbo].[RequestManagement_Logout] @p_Token = '" + token + @"'";
            DataTable dataTable = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("ID"), "RequestManagement_Logout", qr);
            if (dataTable.Rows[0]["Status"].ToString() == "0")
            {
                ClearTokenInMemory(token);
                return true;
            }  
            return false;
        }
        public Token NewToken()
        {
            var token = new Token
            {
                Value = Guid.NewGuid().ToString(),
                ExpiryDate = DateTime.Now.AddHours(8)
            };
            listTokens.Add(token);
            return token;
        }
        public bool ClearTokenInMemory(string token)
        {
            memoryCache.Remove(token);
            return true;
        }
        public bool VerifyToken(string token)
        {
            var cacheEntry = memoryCache.Get<User>(token);

            if (cacheEntry != null)
                return true;
            string qr = @"
                        SELECT A.ID
                        ,A.USER_NAME
                        ,A.ACCOUNT_GROUP
                        ,A.AVARTA
                        ,A.LAST_NAME
                        ,A.FIRST_NAME
                        ,A.LANGUAGE_ID
                        ,R.ExpiryDate
                        ,B.ID as ROLEID
                        ,B.NAME as ROLE_NAME
                        ,8 as [TimeOut]
                        FROM RequestManagement R
                        LEFT JOIN SYS_Account_Infomation A ON R.Username = A.USER_NAME
                        LEFT JOIN SYS_Account_Group B ON A.FATHER = B.CODE
                        WHERE R.Token = '" + token + "' AND R.ExpiryDate > GETDATE() ";
            DataTable dataTable = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("ID"), "SYS_Account_Infomation_CheckLogin", qr);
            if(dataTable.Rows.Count > 0)
            {
                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromHours(int.Parse(dataTable.Rows[0]["TimeOut"].ToString())));
                User user = new User();
                Token _token = new Token();
                _token.Value = token;
                _token.ExpiryDate = DateTime.Parse(dataTable.Rows[0]["ExpiryDate"].ToString());
                user.id = int.Parse(dataTable.Rows[0]["ID"].ToString());
                user.roleID = int.Parse(dataTable.Rows[0]["ROLEID"].ToString());
                user.roleName = dataTable.Rows[0]["ROLE_NAME"].ToString();
                user.avatar = dataTable.Rows[0]["AVARTA"].ToString();
                user.lastName = dataTable.Rows[0]["LAST_NAME"].ToString();
                user.firstName = dataTable.Rows[0]["FIRST_NAME"].ToString();
                user.username = dataTable.Rows[0]["USER_NAME"].ToString();
                if (!string.IsNullOrEmpty(dataTable.Rows[0]["LANGUAGE_ID"].ToString()))
                    user.languageId = int.Parse(dataTable.Rows[0]["LANGUAGE_ID"].ToString());
                else user.languageId = 1;
                user.token = _token;
                memoryCache.Set(token, user, cacheEntryOptions);
                return true;
            }
            return false;
        }
    }
}
