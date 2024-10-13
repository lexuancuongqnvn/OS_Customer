using Castle.MicroKernel;
using Castle.MicroKernel.Registration;
using ERP.Common.Filters;
using ERP.System.Intfs.Reference;
using ERP.System.Intfs.Reference.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Data;
using System.Net;
using System.Text;
using ERP.System.Intfs.Upload.Dto;
using Common.Utils;
using ERP.System.Shared;
using ERP.Common.Controllers;
using System.Text.RegularExpressions;
using static Castle.MicroKernel.ModelBuilder.Descriptors.InterceptorDescriptor;
using Stimulsoft.System.Web.Caching;

namespace ERP.Web.Controllers.System
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class ReferenceController : ControllerBase
    {
        private readonly IReferenceService Reference;
        public static Dictionary<string, (List<REFERENCE_ENTITY> data, DateTime expiration) > listDataReference = new Dictionary<string, (List<REFERENCE_ENTITY> data, DateTime expiration)>();
        [ApiExplorerSettings(IgnoreApi = true)]
        public void SetCache(string key, List<REFERENCE_ENTITY> value, TimeSpan expirationTime)
        {
            DateTime expiration = DateTime.UtcNow.Add(expirationTime);
            listDataReference[key] = (value, expiration);
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public List<REFERENCE_ENTITY> GetCache(string key)
        {
            if (listDataReference.TryGetValue(key, out var cachedItem))
            {
                if (cachedItem.expiration > DateTime.UtcNow)
                {
                    return cachedItem.data;
                }
                else
                {
                    // Remove the item from the cache if it has expired
                    listDataReference.Remove(key);
                }
            }
            return null; // Cache miss or expired item
        }
        public ReferenceController(IReferenceService reference)
        {
            this.Reference = reference;
        }
        [HttpGet]
        public async Task<IDictionary<string, string>> SYS_Version_UI_Search()
        {
            DataTable genRowTable = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("ID"),"SYS_GenRowTable_Detail_Search", @"SELECT TOP (1) [id],[name],[is_active]  FROM SYS_Version_UI where[is_active] = 1");
            
            try {
                IDictionary<string, string> keyValuePairs = new Dictionary<string, string>();
                keyValuePairs.Add( "name", genRowTable.Rows[0]["name"].ToString());     
                return keyValuePairs;
            }
            catch
            {
                return null;
            }            
        }
        [HttpPost]
        public async Task<List<REFERENCE_ENTITY>> Reference_Search_V2(string stored,string param)
        {
            DataTable genRowTable = ManagementController.GetDataTable(stored, @"EXEC "+ stored + @" @p_param = '" + param + @"'");
            List<REFERENCE_ENTITY> result = new List<REFERENCE_ENTITY>();
            
            if(genRowTable != null)
                foreach(DataRow item in genRowTable.Rows)
                {
                    REFERENCE_ENTITY output = new REFERENCE_ENTITY();
                    output.code = item["code"].ToString();
                    output.Name = item["name"].ToString();
                    result.Add(output);
                }    
            
            return result;
        }
        [HttpPost]
        public async Task<List<REFERENCE_ENTITY>> Reference_Search([FromBody] REFERENCE_ENTITY input)
        {
            try
            {
                string storeReference = "";
                DataTable genRowTable = ManagementController.GetDataTable("SYS_GenRowTable_Detail_Search", @"
                    EXEC SYS_GenRowTable_Detail_Search
		            @p_userID = " + input.userID + @",
		            @p_FATHER = '" + input.TABLE_NAME + @"',
		            @p_TABLE_NAME = '" + input.TABLE_NAME + @"'
                ");
                //find stored procedures
                if (genRowTable == null) return null;
                List<Upload_ENTITY> param = new List<Upload_ENTITY>();
                var t = new Upload_ENTITY();
                t.tbName = input.TABLE_NAME_DETAIL;
                List<string> listColTypeUpload = new List<string>();
                foreach (DataRow dataRow in genRowTable.Rows)
                {
                    if(input.Type == 1)//multirow
                        if (dataRow["TABLE_NAME"].ToString() == input.TABLE_NAME && dataRow["REFERENCE"].ToString() == input.TABLE_NAME_DETAIL)
                        {
                            storeReference = dataRow["STORED_PROCEDURES"].ToString();
                        } 
                    if(input.Type == 2)
                        if (dataRow["TABLE_NAME"].ToString() == input.TABLE_NAME && dataRow["COLUMN_NAME"].ToString() == input.COLUMN_NAME)
                        {
                            storeReference = dataRow["STORED_PROCEDURES"].ToString();
                        }
                    if (dataRow["TYPE_ID"].ToString() == "6" || dataRow["TYPE_ID"].ToString() == "7" || dataRow["TYPE_ID"].ToString() == "8")
                        listColTypeUpload.Add(dataRow["COLUMN_NAME"].ToString());
                }
                    
                //get data master
                string ps = "";
                DataTable fatherTable = ManagementController.GetDataTable("", @"select * from "+input.TABLE_NAME+@" where Code = '"+input.codeFather+"'");
                if (storeReference.IndexOf("[") >= 0 && storeReference.IndexOf("]") >= 0)
                {
                    string[] listParam = storeReference.Split("[")[1].Replace("]","").Split(",");
                    foreach (string p in listParam)
                    {
                        for (int i = 0; i < fatherTable.Columns.Count; i++)
                        {
                            string colName = fatherTable.Columns[i].ColumnName;
                            if(colName.ToUpper() == p.ToUpper())
                            {
                                if (ps != "") ps += ",";
                                ps += "@p_" + colName + "=N'" + fatherTable.Rows[0][colName].ToString() + "'";
                                break;
                            }    
                        }
                    }
                }
                DataTable dataStored = ManagementController.GetDataTable("dataStored", @"EXEC " + storeReference.Split("[")[0] + ps);
                //render data to JSON

                if (dataStored == null) return null;
                if (input.Type == 1)
                    for (int i = 0; i < dataStored.Rows.Count; i++)
                    {
                        t = new Upload_ENTITY();
                        t.tbName = input.TABLE_NAME_DETAIL;
                        t.ref_MasterID = dataStored.Rows[i]["code"].ToString();
                        param.Add(t);
                    }
                t.XML_Data = param.ToXmlFromList();
                List<Upload_ENTITY> listFiles = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(CommonStoreProcedure.SYS_Upload_Get, t);

                List<Dictionary<string, object>> obj = GetDataTableDictionaryList(dataStored);
                List<Dictionary<string, object>> OutputData = new List<Dictionary<string, object>>();
                if (input.Type == 1)
                {
                    foreach (var item in obj)
                    {
                        string code = "";
                        foreach (var _item in item)
                        {
                            if(_item.Key.ToUpper() == "code".ToUpper())
                            {
                                code = _item.Value.ToString();break;
                            }
                        }
                        foreach (var itemC in listColTypeUpload)
                        {
                            string column = itemC.ToString();
                            List<Upload_ENTITY> temp = new List<Upload_ENTITY>();
                            foreach (var itemF in listFiles)
                            {
                                if(itemF.ref_MasterID == code && itemF.colName == column)
                                    temp.Add(itemF);
                            }
                            item[column] = temp;
                        }
                        OutputData.Add(item);
                    }
                }
                else
                {
                    OutputData = obj;
                }
                   
                
                List<REFERENCE_ENTITY> result = new List<REFERENCE_ENTITY>();
                REFERENCE_ENTITY output = new REFERENCE_ENTITY();
                output = input;
                output.OutputData = OutputData;
                //output.OutputData = ConnectController.DataTableToJSONWithStringBuilder(dt);
                result.Add(output);
                return result;
            }catch(Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public async Task<List<REFERENCE_ENTITY>> Reference_V2_Search([FromBody] REFERENCE_ENTITY input)
        {
            try
            {
                string storeReference = "";
                string queryReference = "";
                DataTable genRowTable = ManagementController.GetDataTable("SYS_GenRowTable_Detail_Search", @"
                    EXEC SYS_GenRowTable_Detail_Search
		            @p_userID = " + input.userID + @",
		            @p_FATHER = '" + input.TABLE_NAME + @"',
		            @p_TABLE_NAME = '" + input.TABLE_NAME + @"',
		            @p_CODE = '" + input.code + @"'
                ");
               
                string qrMaster = @"select * from " + genRowTable.Rows[0]["TABLE_NAME"] + @" where Code = '" + input.code_master + "'";
                if(!string.IsNullOrEmpty(genRowTable.Rows[0]["QUERY_GET_MASTER"].ToString())) 
                    qrMaster = genRowTable.Rows[0]["QUERY_GET_MASTER"].ToString().Replace("{param_master}", input.code_master).Replace("({ID})", input.user.id.ToString())
                        .Replace("({USERNAME})", "" + input.user.username + "")
                        //.Replace("({TOKEN})", "" + input.user.token.Value + "")
                        .Replace("({AVATAR})", "" + input.user.avatar + "")
                        .Replace("({FIRSTNAME})", "" + input.user.firstName + "")
                        .Replace("({LASTNAME})", "" + input.user.lastName + "")
                        .Replace("({ROLEID})", input.user.roleID.ToString())
                        .Replace("({ROLENAME})", "" + input.user.roleName + "")
                        .Replace("({LANGUAGEID})", input.user.languageId.ToString())
                        .Replace("({CODE})", "" + input.user.code + "")
                        .Replace("({BRANCH})", "" + input.user.branch + "")
                        .Replace("({DEPARTMENT})", "" + input.user.department + "")
                        .Replace("({TITLE_CODE})", "" + input.user.title_code + "")
                        .Replace("({POSITION_CODE})", "" + input.user.position_code + "")
                        .Replace("({COMPANY_CODE})", "" + input.user.company_code + "")
                        .Replace("({VOUCHER_CODE})", "" + AuthenticateController.appSessionUser.voucher_code.ToString() + "")
                        .Replace("({LEVEL})", input.user.level.ToString())
                        .Replace("({VOUCHER_YEAR})", AuthenticateController.appSessionUser.voucher_year.ToString());
                DataTable masterTable = ManagementController.GetDataTable("", qrMaster);
                //find stored procedures
                if (genRowTable == null) 
                    return null;
                List<Upload_ENTITY> param = new List<Upload_ENTITY>();
                var t = new Upload_ENTITY();
                t.tbName = input.TABLE_NAME_DETAIL;
                List<string> listColTypeUpload = new List<string>();
                foreach (DataRow dataRow in genRowTable.Rows)
                {
                    if (input.Type == 1)//multirow
                        if (dataRow["TABLE_NAME"].ToString() == input.TABLE_NAME && dataRow["REFERENCE"].ToString() == input.TABLE_NAME_DETAIL)
                        {
                            storeReference = dataRow["STORED_PROCEDURES"].ToString();
                        }
                    if (input.Type == 2)
                        if (dataRow["TABLE_NAME"].ToString() == input.TABLE_NAME && dataRow["COLUMN_NAME"].ToString() == input.COLUMN_NAME)
                        {
                            storeReference = dataRow["STORED_PROCEDURES"].ToString();
                        }
                    if (dataRow["TYPE_ID"].ToString() == "6" || dataRow["TYPE_ID"].ToString() == "7" || dataRow["TYPE_ID"].ToString() == "8")
                        listColTypeUpload.Add(dataRow["COLUMN_NAME"].ToString());
                    if (dataRow["editorType"].ToString() == "dxSelectBox" || dataRow["editorType"].ToString() == "dxTagBox" || dataRow["editorType"].ToString() == "Multirow")
                        storeReference = Regex.Replace(storeReference, @"\{.*?\}", string.Empty);
                }

                //get data master
                string ps = "";
                queryReference = genRowTable.Rows[0]["REFERENCE"].ToString();
                DataTable fatherTable = ManagementController.GetDataTable("", @"select * from " + input.TABLE_NAME + @" where Code = '" + input.codeFather + "'");
                if (storeReference.IndexOf("[") >= 0 && storeReference.IndexOf("]") >= 0)
                {
                    string[] listParam = storeReference.Split("[")[1].Replace("]", "").Split(",");
                    foreach (string p in listParam)
                    {
                        for (int i = 0; i < fatherTable.Columns.Count; i++)
                        {
                            string colName = fatherTable.Columns[i].ColumnName;
                            if (colName.ToUpper() == p.ToUpper())
                            {
                                if (ps != "") ps += ",";
                                ps += "@p_" + colName + "=N'" + fatherTable.Rows[0][colName].ToString() + "'";
                                break;
                            }
                        }
                    }
                }
                //Check param in account
                if (queryReference.IndexOf("({") >= 0 && queryReference.IndexOf("})") >= 0)
                {
                    queryReference = queryReference
                        .Replace("({ID})", input.user.id.ToString())
                        .Replace("({USERNAME})", ""+ input.user.username+ "")
                        .Replace("({TOKEN})", ""+input.user.token.Value+"")
                        .Replace("({AVATAR})", ""+input.user.avatar+"")
                        .Replace("({FIRSTNAME})", ""+input.user.firstName+"")
                        .Replace("({LASTNAME})", ""+input.user.lastName+"")
                        .Replace("({ROLEID})", input.user.roleID.ToString())
                        .Replace("({ROLENAME})", ""+input.user.roleName+"")
                        .Replace("({LANGUAGEID})", input.user.languageId.ToString())
                        .Replace("({CODE})", ""+input.user.code+"")
                        .Replace("({BRANCH})", ""+input.user.branch+"")
                        .Replace("({DEPARTMENT})", ""+input.user.department+"")
                        .Replace("({TITLE_CODE})", ""+input.user.title_code+"")
                        .Replace("({POSITION_CODE})", ""+input.user.position_code+"")
                        .Replace("({COMPANY_CODE})", ""+input.user.company_code+"")
                        .Replace("({LEVEL})", input.user.level.ToString())
                        .Replace("({VOUCHER_CODE})", "" + AuthenticateController.appSessionUser.voucher_code + "")
                        .Replace("({VOUCHER_YEAR})", AuthenticateController.appSessionUser.voucher_year.ToString());
                }
                //Check param in master
                queryReference = queryReference.Replace("{param_master}", input.code_master);
                if (queryReference.IndexOf("{") >= 0 && queryReference.IndexOf("}") >= 0 && masterTable != null && masterTable.Rows.Count > 0)
                {
                    for (int i = 0; i < masterTable.Columns.Count; i++)
                    {
                        string colName = masterTable.Columns[i].ColumnName;
                        string v = "";
                        if(masterTable.Rows.Count>0)
                            if (!string.IsNullOrEmpty(masterTable.Rows[0][colName].ToString())) v = masterTable.Rows[0][colName].ToString();
                        queryReference = queryReference.Replace("{" + colName.ToUpper() + "}", v);
                    }
                }
                else if(input.type_id == 16 && queryReference.IndexOf("VOUCHER_DATE_F") >=0)
                {
                    DataTable Voucher_GenKeyTable = ManagementController.GetDataTable("Voucher_GenKeyTable", @"DECLARE @voucher_date DATE
                    DECLARE @TBMaster TABLE(id varchar(50),voucher_date date)
                    INSERT INTO @TBMaster(id,voucher_date)
                    EXEC [dbo].[SYS_Voucher_GenKeyTable_Search]
	                    @p_voucher_code = '"+ AuthenticateController.appSessionUser.voucher_code + @"',
	                    @p_company_code	=  '" + AuthenticateController.appSessionUser.company_code + @"',
	                    @p_voucher_year = " + AuthenticateController.appSessionUser.voucher_year.ToString() + @"
                    SELECT * FROM @TBMaster WHERE id = 'ADD-'");
                    if (Voucher_GenKeyTable != null && Voucher_GenKeyTable.Rows.Count > 0)
                        queryReference = queryReference.Replace("{VOUCHER_DATE_F}", DateTime.Parse(Voucher_GenKeyTable.Rows[0]["voucher_date"].ToString()).ToString("yyyy-MM-dd"));
                }
                queryReference = Regex.Replace(queryReference, @"\{.*?\}", string.Empty);
                if(queryReference.IndexOf("dbo")<0)
                    queryReference = Regex.Replace(queryReference, @"\[.*?\]", string.Empty);
                string refr = "";
                try
                {
                    refr = queryReference;
                    refr = Regex.Replace(refr, @"[^a-zA-Z0-9]", "");
                    var cache = GetCache(refr);
                    if (cache != null)
                        return cache;
                }
                catch { }
                DataTable dataStored = ManagementController.GetDataTable("dataStored", @"" + queryReference + ps);
                //DataTable dataStored = ManagementController.GetDataTable("dataStored", @"EXEC " + storeReference.Split("[")[0] + ps);
                //render data to JSON

                if (dataStored == null)
                {
                    List<REFERENCE_ENTITY> resultNull = new List<REFERENCE_ENTITY>();
                    REFERENCE_ENTITY outputNull = new REFERENCE_ENTITY();
                    outputNull = input;
                    outputNull.OutputData = new List<Dictionary<string, object>>();
                    //output.OutputData = ConnectController.DataTableToJSONWithStringBuilder(dt);
                    resultNull.Add(outputNull);
                    return resultNull;
                }
                if (input.Type == 1)
                    for (int i = 0; i < dataStored.Rows.Count; i++)
                    {
                        t = new Upload_ENTITY();
                        t.tbName = input.TABLE_NAME_DETAIL;
                        t.ref_MasterID = dataStored.Rows[i]["code"].ToString();
                        param.Add(t);
                    }
                t.XML_Data = param.ToXmlFromList();
                List<Upload_ENTITY> listFiles = await ManagementController.GetDataFromStoredProcedure<Upload_ENTITY>(CommonStoreProcedure.SYS_Upload_Get, t);

                List<Dictionary<string, object>> obj = GetDataTableDictionaryList(dataStored);
                List<Dictionary<string, object>> OutputData = new List<Dictionary<string, object>>();
  
                foreach (DataRow dataRow in genRowTable.Rows)
                {
                    if (dataRow["TYPE_ID"].ToString() == "16")//multirow
                    {
                        DataTable genRowTableDetail = ManagementController.GetDataTable("SYS_GenRowTable_Detail_Search", @"
                            EXEC SYS_GenRowTable_Detail_Search
		                    @p_TABLE_NAME = '" + dataRow["DROP_DOWN_TABLE"].ToString() + @"'
                        ");
                        foreach (DataRow dataRowDetail in genRowTableDetail.Rows)
                        {
                            if (dataRowDetail["TYPE_ID"].ToString() == "12" || dataRowDetail["TYPE_ID"].ToString() == "28")
                            {
                                string VALUEEXPR = dataRowDetail["VALUEEXPR"].ToString(), DISPLAYEXPR = dataRowDetail["DISPLAYEXPR"].ToString(), COLUMN_NAME = dataRowDetail["COLUMN_NAME"].ToString();
                                for(int i = 0; i < obj.Count; i++)
                                {
                                    string value = obj[i][COLUMN_NAME].ToString();

                                    obj[i][COLUMN_NAME] = "ARRAY[" + value + "]";
                                }
                            }else if (dataRowDetail["TYPE_ID"].ToString() == "5" || dataRowDetail["TYPE_ID"].ToString() == "9" || dataRowDetail["TYPE_ID"].ToString() == "10" || dataRowDetail["TYPE_ID"].ToString() == "11")
                            {
                                string VALUEEXPR = dataRowDetail["VALUEEXPR"].ToString(), DISPLAYEXPR = dataRowDetail["DISPLAYEXPR"].ToString(), COLUMN_NAME = dataRowDetail["COLUMN_NAME"].ToString();
                                for (int i = 0; i < obj.Count; i++)
                                {
                                    string value = obj[i][COLUMN_NAME].ToString();
                                    if(!string.IsNullOrEmpty(value)) obj[i][COLUMN_NAME] = "DateTime-" + DateTime.Parse(value).ToString("yyyy-MM-ddTHH:mm");
                                }
                            }
                        }
                    }
                }


                if (input.Type == 1)
                {
                    foreach (var item in obj)
                    {
                        string code = "";
                        foreach (var _item in item)
                        {
                            if (_item.Key.ToUpper() == "code".ToUpper())
                            {
                                code = _item.Value.ToString(); break;
                            }
                        }
                        foreach (var itemC in listColTypeUpload)
                        {
                            string column = itemC.ToString();
                            List<Upload_ENTITY> temp = new List<Upload_ENTITY>();
                            foreach (var itemF in listFiles)
                            {
                                if (itemF.ref_MasterID == code && itemF.colName == column)
                                    temp.Add(itemF);
                            }
                            item[column] = temp;
                        }
                        OutputData.Add(item);
                    }
                }
                else
                {
                    OutputData = obj;
                }

                List<REFERENCE_ENTITY> result = new List<REFERENCE_ENTITY>();
                REFERENCE_ENTITY output = new REFERENCE_ENTITY();
                output = input;
                output.OutputData = OutputData;
                //output.OutputData = ConnectController.DataTableToJSONWithStringBuilder(dt);
                result.Add(output);
                if(!string.IsNullOrEmpty(refr))
                    SetCache(refr, result, TimeSpan.FromSeconds(5));
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        [HttpPost]
        public async Task<List<REFERENCE_ENTITY>> Reference_V3_Search([FromBody] REFERENCE_V3_Param input)
        {
            try
            {
                if(input != null && !string.IsNullOrEmpty(input.reference))
                {
                    List<Dictionary<string, object>> OutputData = new List<Dictionary<string, object>>();
                    string queryReference = input.reference;
                    foreach (var property in input.master_data)
                    {
                        //var PropertyName = property.Name;
                        //var PropetyValue = properties.GetType().GetProperty(property.Name).GetValue(property, null);
                        queryReference = queryReference.Replace(@"{" + property.Key + "}", property.Value.ToString());
                    }
                    //Check param in account
                    if (queryReference.IndexOf("({") >= 0 && queryReference.IndexOf("})") >= 0)
                    {
                        queryReference = queryReference
                            .Replace("({ID})", AuthenticateController.appSessionUser.id.ToString())
                            .Replace("({USERNAME})", "" + AuthenticateController.appSessionUser.username + "")
                            //.Replace("({TOKEN})", "" + AuthenticateController.appSessionUser.token.Value + "")
                            .Replace("({AVATAR})", "" + AuthenticateController.appSessionUser.avatar + "")
                            .Replace("({FIRSTNAME})", "" + AuthenticateController.appSessionUser.firstName + "")
                            .Replace("({LASTNAME})", "" + AuthenticateController.appSessionUser.lastName + "")
                            .Replace("({ROLEID})", AuthenticateController.appSessionUser.roleID.ToString())
                            .Replace("({ROLENAME})", "" + AuthenticateController.appSessionUser.roleName + "")
                            .Replace("({LANGUAGEID})", AuthenticateController.appSessionUser.languageId.ToString())
                            .Replace("({CODE})", "" + AuthenticateController.appSessionUser.code + "")
                            .Replace("({BRANCH})", "" + AuthenticateController.appSessionUser.branch + "")
                            .Replace("({DEPARTMENT})", "" + AuthenticateController.appSessionUser.department + "")
                            .Replace("({TITLE_CODE})", "" + AuthenticateController.appSessionUser.title_code + "")
                            .Replace("({POSITION_CODE})", "" + AuthenticateController.appSessionUser.position_code + "")
                            .Replace("({COMPANY_CODE})", "" + AuthenticateController.appSessionUser.company_code + "")
                            .Replace("({LEVEL})", AuthenticateController.appSessionUser.level.ToString())
                            .Replace("({VOUCHER_YEAR})", AuthenticateController.appSessionUser.voucher_year.ToString());
                    }
                    DataTable dataStored = ManagementController.GetDataTable("dataStored", @"" + queryReference);
                    List<Dictionary<string, object>> obj = GetDataTableDictionaryList(dataStored);
                    List<REFERENCE_ENTITY> result = new List<REFERENCE_ENTITY>();
                    REFERENCE_ENTITY output = new REFERENCE_ENTITY();
                    output.OutputData = obj;
                    result.Add(output);
                    return result;
                }
                else
                {
                    List<REFERENCE_ENTITY> resultNull = new List<REFERENCE_ENTITY>();
                    REFERENCE_ENTITY outputNull = new REFERENCE_ENTITY();
                    outputNull.OutputData = new List<Dictionary<string, object>>();
                    resultNull.Add(outputNull);
                    return resultNull;
                }
            }
            catch {
                List<REFERENCE_ENTITY> resultNull = new List<REFERENCE_ENTITY>();
                REFERENCE_ENTITY outputNull = new REFERENCE_ENTITY();
                outputNull.OutputData = new List<Dictionary<string, object>>();
                resultNull.Add(outputNull);
                return resultNull;
            }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public Dictionary<string, Dictionary<string, object>> DatatableToDictionary(DataTable dt, string id)
        {
            var cols = dt.Columns.Cast<DataColumn>().Where(c => c.ColumnName != id);
            return dt.Rows.Cast<DataRow>()
                     .ToDictionary(r => r[id].ToString(),
                                   r => cols.ToDictionary(c => c.ColumnName, c => r[c.ColumnName]));
        }
        public static List<Dictionary<string, object>> GetDataTableDictionaryList(DataTable dt)
        {
            // Assuming you have a DataTable named "dataTable"

            foreach (DataRow row in dt.Rows)
            {
                foreach (DataColumn column in dt.Columns)
                {
                    if (row[column] == DBNull.Value)
                    {
                        // Check the data type of the column
                        Type dataType = column.DataType;

                        // Set the default value based on the data type
                        if (dataType == typeof(string))
                        {
                            row[column] = string.Empty;
                        }
                        else if (dataType == typeof(int))
                        {
                            row[column] = 0;
                        }
                    }
                }
            }
            List<Dictionary<string, object>> result = dt.AsEnumerable().Select(
                row => dt.Columns.Cast<DataColumn>().ToDictionary(
                    column => column.ColumnName,
                    column => row[column]
                )).ToList();
            //foreach(Dictionary<string, object> row in result)
            //{
            //    foreach (var rowsub in row)
            //    {
            //        if (rowsub.GetType() == typeof(object))
            //        {
            //            
            //        }
            //    }
            //}
            return result;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public List<dynamic> ConvertStringToJSON(string str)
        {
            //JavaScriptSerializer serializer = new JavaScriptSerializer();          
            //List<dynamic> items = serializer.Deserialize<List<dynamic>>(str);
            List<dynamic> items = JsonSerializer.Deserialize<List<dynamic>>(str);

            return items;
        }
    }
}
