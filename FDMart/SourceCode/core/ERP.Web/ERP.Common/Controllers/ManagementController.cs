using Abp.Application.Services.Dto;
using Common.Models.Request;
using Dapper;
using ERP.Common.App_Data.Log;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Common.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ManagementController : ControllerBase
    {
        private readonly int commandTimeout = 30;
        public static string key = "b14ca5898a4e4133bbce2ea2315a1998";
        public static Dictionary<string, DataTable> lstTable = new Dictionary<string, DataTable>();
        
        public static RequestModel GetDataSroredProcedures([FromBody] dynamic data, string storeName)
        {
            try
            {
                DataTable PARAMETERS = GetDataTable("PARAMETERS", @"SELECT PARAMETER_NAME FROM INFORMATION_SCHEMA.PARAMETERS WHERE SPECIFIC_NAME='" + storeName + "' ORDER BY ORDINAL_POSITION");
                string prString = "";
                var properties = data.GetType().GetProperties();
                foreach (var property in properties)
                {
                    var PropertyName = property.Name;
                    var PropetyValue = data.GetType().GetProperty(property.Name).GetValue(data, null);
                    foreach (DataRow dataRow in PARAMETERS.Rows)
                    {
                        if (dataRow["PARAMETER_NAME"].ToString() == "@p_" + PropertyName.ToString())
                        {
                            if (prString != "")
                                prString += ",";
                            if (PropetyValue == null)
                                prString += dataRow["PARAMETER_NAME"].ToString() + "=NULL";
                            else
                            {
                                if (property.GetMethod.ReturnParameter.ToString() == "Int32")
                                    prString += dataRow["PARAMETER_NAME"].ToString() + "=" + PropetyValue.ToString();
                                else
                                    prString += dataRow["PARAMETER_NAME"].ToString() + "='" + PropetyValue.ToString() + "'";
                            }

                            break;
                        }
                    }
                }
                DirAppend.Main(@"EXEC " + storeName + " " + prString);
                DataTable dataTable = GetDataTable(storeName, @"EXEC " + storeName + " " + prString);
                RequestModel requestModel = new RequestModel();
                requestModel.Result = dataTable.Rows[0]["Result"].ToString().Replace("\"", "'");
                requestModel.StatusCode = int.Parse(dataTable.Rows[0]["StatusCode"].ToString());
                return requestModel;
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                return null;
            }  
        }
        public async static Task<List<TModel>> GetDataFromStoredProcedure<TModel>(string storedProcName, object parameters)
        {
            //https://khalidabuhakmeh.com/multiple-result-sets-with-net-core-sql-server
            try
            {
                var dbPara = new DynamicParameters();
                GetParamStored(storedProcName,parameters,ref dbPara);
                using (var conn = new SqlConnection(ConnectController.ConnectString))
                {
                    var rr = (List<TModel>)conn.Query<TModel>(storedProcName, dbPara, null, true, 32, System.Data.CommandType.StoredProcedure);
                    return rr;
                }
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        public async static Task<List<TModel>> GetDataFromStoredProcedure<TModel>(string connectstring,string storedProcName, object parameters)
        {
            //https://khalidabuhakmeh.com/multiple-result-sets-with-net-core-sql-server
            try
            {
                var dbPara = new DynamicParameters();
                GetParamStored(connectstring,storedProcName, parameters,ref dbPara);
                using (var conn = new SqlConnection(connectstring))
                {
                    var rr = (List<TModel>)conn.Query<TModel>(storedProcName, dbPara, null, true, 32, System.Data.CommandType.StoredProcedure);
                    return rr;
                }
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        public async static Task<List<TModel>> GetDataFromStoredProcedure2<TModel>(string connectstring, string storedProcName, object parameters)
        {
            //https://khalidabuhakmeh.com/multiple-result-sets-with-net-core-sql-server
            try
            {
                if (parameters != null)
                {
                    var properties = parameters.GetType().GetProperties();
                    foreach (var property in properties)
                    {
                        var PropertyName = property.Name;
                        var PropetyValue = parameters.GetType().GetProperty(property.Name).GetValue(parameters, null);
                        if(PropetyValue == null)
                        {
                            if (PropertyName == "company_code")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.company_code);
                            else if (PropertyName == "date_add")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, DateTime.Now);
                            else if (PropertyName == "date_modified")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, DateTime.Now);
                            else if (PropertyName == "account_code_add")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.code);
                            else if (PropertyName == "account_code_modified")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.code);
                            else if (PropertyName == "language_id")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.language_id);
                            else if (PropertyName == "voucher_year")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.voucher_year);
                        }
                    }
                }
            }
            catch { }
            try
            {
                var dbPara = new DynamicParameters();
                GetParamStored2(connectstring, storedProcName, parameters, ref dbPara);
                using (var conn = new SqlConnection(connectstring))
                {
                    var rr = (List<TModel>)conn.Query<TModel>(storedProcName, dbPara, null, true, 32, System.Data.CommandType.StoredProcedure);
                    return rr;
                }
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        //public async static Task<DataTable> GetDataTableFromStoredProcedure<TModel>(string connectstring, string storedProcName, object parameters)
        //{
        //    //https://khalidabuhakmeh.com/multiple-result-sets-with-net-core-sql-server
        //    try
        //    {
        //        var dbPara = new DynamicParameters();
        //        GetParamStored(connectstring, storedProcName, parameters, ref dbPara);
        //        using (var conn = new SqlConnection(connectstring))
        //        {
        //            var rr = (List<TModel>)conn.Execute(storedProcName, dbPara, null, true, 32, System.Data.CommandType.StoredProcedure);
        //            return rr;
        //        }
        //    }
        //    catch (Exception ex)
        //    {za
        //        DirAppend.Main(ex.Message);
        //        return null;
        //    }
        //}
        public static DataTable ConvertToDataTable<T>(List<T> items)
        {
            PropertyDescriptorCollection properties =
            TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            foreach (PropertyDescriptor prop in properties)
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            foreach (T item in items)
            {
                DataRow row = table.NewRow();
                foreach (PropertyDescriptor prop in properties)
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                table.Rows.Add(row);
            }
            return table;
        }
        public static string GetParamStored(string storedProcName, object parameters) {
            try
            {
                DataTable PARAMETERS = GetDataTable("PARAMETERS", @"SELECT PARAMETER_NAME FROM INFORMATION_SCHEMA.PARAMETERS WHERE SPECIFIC_NAME='" + storedProcName + "' ORDER BY ORDINAL_POSITION");
                string prString = "";
                var properties = parameters.GetType().GetProperties();
                foreach (var property in properties)
                {
                    var PropertyName = property.Name;
                    var PropetyValue = parameters.GetType().GetProperty(property.Name).GetValue(parameters, null);
                    foreach (DataRow dataRow in PARAMETERS.Rows)
                    {
                        if (dataRow["PARAMETER_NAME"].ToString() == "@p_" + PropertyName.ToString())
                        {
                            if (prString != "")
                                prString += ",";
                            if (PropetyValue == null)
                                prString += dataRow["PARAMETER_NAME"].ToString() + "=NULL";
                            else
                            {
                                if (property.GetMethod.ReturnParameter.ToString() == "Int32")
                                    prString += dataRow["PARAMETER_NAME"].ToString() + "=" + PropetyValue.ToString();
                                else
                                    prString += dataRow["PARAMETER_NAME"].ToString() + "='" + PropetyValue.ToString() + "'";
                            }

                            break;
                        }
                    }
                }
                return prString;
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        public static void GetParamStored(string storedProcName, object parameters,ref DynamicParameters param) {
            try
            {
                var dbPara = new DynamicParameters();
                DataTable PARAMETERS = GetDataTable("PARAMETERS", @"SELECT PARAMETER_NAME FROM INFORMATION_SCHEMA.PARAMETERS WHERE SPECIFIC_NAME='" + storedProcName + "' ORDER BY ORDINAL_POSITION");
                if(parameters != null)
                {
                    var properties = parameters.GetType().GetProperties();
                    foreach (var property in properties)
                    {
                        var PropertyName = property.Name;
                        var PropetyValue = parameters.GetType().GetProperty(property.Name).GetValue(parameters, null);
                        foreach (DataRow dataRow in PARAMETERS.Rows)
                        {
                            if (dataRow["PARAMETER_NAME"].ToString() == "@p_" + PropertyName.ToString())
                            {
                                if (PropetyValue == null)
                                    dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), null);
                                else
                                {
                                    dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), PropetyValue);
                                }

                                break;
                            }
                        }
                    }
                    param = dbPara;
                }
                else
                {
                    foreach (DataRow dataRow in PARAMETERS.Rows)
                    {
                        dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), null);
                    }
                    param = dbPara;
                }
                
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                param = null;
            }
        }
        public static void GetParamStored(string connectstring, string storedProcName, object parameters,ref DynamicParameters param) {
            try
            {
                var dbPara = new DynamicParameters();
                DataTable PARAMETERS = GetDataTable(connectstring,"PARAMETERS", @"SELECT PARAMETER_NAME FROM INFORMATION_SCHEMA.PARAMETERS WHERE SPECIFIC_NAME='" + storedProcName + "' ORDER BY ORDINAL_POSITION");
                if(parameters != null)
                {
                    var properties = parameters.GetType().GetProperties();
                    foreach (var property in properties)
                    {
                        var PropertyName = property.Name;
                        var PropetyValue = parameters.GetType().GetProperty(property.Name).GetValue(parameters, null);
                        foreach (DataRow dataRow in PARAMETERS.Rows)
                        {
                            if (dataRow["PARAMETER_NAME"].ToString() == "@p_" + PropertyName.ToString())
                            {
                                if (PropetyValue == null)
                                {
                                    dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), null);
                                }                                    
                                else
                                {
                                    dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), PropetyValue);
                                }

                                break;
                            }
                        }
                    }
                    param = dbPara;
                }
                else
                {
                    foreach (DataRow dataRow in PARAMETERS.Rows)
                    {
                        dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), null);
                    }
                    param = dbPara;
                }
                
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                param = null;
            }
        }
        public static void GetParamStored2(string connectstring, string storedProcName, object parameters, ref DynamicParameters param)
        {
            try
            {
                var dbPara = new DynamicParameters();
                DataTable PARAMETERS = GetDataTable(connectstring, "PARAMETERS", @"SELECT PARAMETER_NAME FROM INFORMATION_SCHEMA.PARAMETERS WHERE SPECIFIC_NAME='" + storedProcName + "' ORDER BY ORDINAL_POSITION");
                if (parameters != null)
                {
                    var properties = parameters.GetType().GetProperties();
                    foreach (var property in properties)
                    {
                        var PropertyName = property.Name;
                        var PropetyValue = parameters.GetType().GetProperty(property.Name).GetValue(parameters, null);
                        foreach (DataRow dataRow in PARAMETERS.Rows)
                        {
                            if (dataRow["PARAMETER_NAME"].ToString() == "@p_" + PropertyName.ToString())
                            {
                                if (PropetyValue == null)
                                {
                                    if (property.PropertyType.Name == "Int16" || property.PropertyType.Name == "Int32" || property.PropertyType.Name == "Int64" || property.PropertyType.Name == "Decimal" 
                                        ||property.PropertyType.FullName.IndexOf("System.Decimal")>0
                                        || property.PropertyType.FullName.IndexOf("System.Int16") > 0
                                        || property.PropertyType.FullName.IndexOf("System.Int32") > 0
                                        || property.PropertyType.FullName.IndexOf("System.Int64") > 0)
                                        dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), 0);
                                    else if (property.PropertyType.Name == "String")
                                        dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), "");
                                    else dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), null);
                                }
                                else
                                {
                                    dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), PropetyValue);
                                }

                                break;
                            }
                        }
                    }
                    param = dbPara;
                }
                else
                {
                    foreach (DataRow dataRow in PARAMETERS.Rows)
                    {
                        dbPara.Add(dataRow["PARAMETER_NAME"].ToString(), null);
                    }
                    param = dbPara;
                }

            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                param = null;
            }
        }
        public async static Task<IDictionary<string, object>> GetResultValueFromStore(string storedProcName, object parameters)
        {
            try
            {
                var model = (IDictionary<string, object>)(await GetDataFromStoredProcedure<dynamic>(storedProcName, parameters)).FirstOrDefault();
                return model;
            }
            catch (Exception e)
            {
                Dictionary<string, object> error = new Dictionary<string, object>();

                error.Add("status", -1);
                error.Add("Result", "");
                error.Add("ErrorDesc", e.Message);
                error.Add("message", e.Message);
                return error;
            }
        }
        public async static Task<IDictionary<string, object>> GetResultValueFromStore(string connectstring,string storedProcName, object parameters)
        {
            try
            {
                var model = (IDictionary<string, object>)(await GetDataFromStoredProcedure<dynamic>(connectstring,storedProcName, parameters)).FirstOrDefault();
                return model;
            }
            catch (Exception e)
            {
                Dictionary<string, object> error = new Dictionary<string, object>();

                error.Add("status", -1);
                error.Add("Result", "");
                error.Add("ErrorDesc", e.Message);
                error.Add("message", e.Message);

                return error;
            }
        }
        public async static Task<IDictionary<string, object>> GetResultValueFromStore2(string connectstring, string storedProcName, object parameters)
        {
            try
            {
                if (parameters != null)
                {
                    var properties = parameters.GetType().GetProperties();
                    foreach (var property in properties)
                    {
                        var PropertyName = property.Name;
                        var PropetyValue = parameters.GetType().GetProperty(property.Name).GetValue(parameters, null);
                        if(PropetyValue == null)
                        {
                            if (PropertyName == "company_code")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.company_code);
                            else if (PropertyName == "date_add")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, DateTime.Now);
                            else if (PropertyName == "date_modified")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, DateTime.Now);
                            else if (PropertyName == "account_code_add")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.code);
                            else if (PropertyName == "account_code_modified")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.code);
                            else if (PropertyName == "language_id")
                                parameters.GetType().GetProperty(property.Name).SetValue(parameters, AuthenticateController.appSessionUser.language_id);
                        }
                    }
                }
            }
            catch { }
            try
            {
                var model = (IDictionary<string, object>)(await GetDataFromStoredProcedure2<dynamic>(connectstring, storedProcName, parameters)).FirstOrDefault();
                return model;
            }
            catch (Exception e)
            {
                Dictionary<string, object> error = new Dictionary<string, object>();

                error.Add("status", -1);
                error.Add("Result", "");
                error.Add("ErrorDesc", e.Message);
                error.Add("message", e.Message);

                return error;
            }
        }
        public static Task<int> ExecuteNonQuery(string storedProcName, object parameters)
        {
            return null;
        }
        public async static Task<List<dynamic>> GetMultiResultValueFromStore(string storedProcName, object parameters)
        {
            try
            {
                var list = await GetDataFromStoredProcedure<dynamic>(storedProcName, parameters);
                return list;
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        public async static Task<PagedResultDto<TModel>> GetPagingData<TModel>(string storedProcName, object parameters) 
        {
            try
            {
                string dapperParams = GetParamStored(storedProcName, parameters);
                using (var conn = new SqlConnection(ConnectController.ConnectString))
                {
                    DirAppend.Main("EXEC " + storedProcName + " " + dapperParams);
                    var result = conn.QueryMultiple("EXEC " + storedProcName + " " + dapperParams, null, null, 30);
                    //List<TModel> rs = result.Read<TModel>().ToList();
                    return new PagedResultDto<TModel>()
                    {
                        Items = result.Read<TModel>().ToList()
                    };
                }
            }
            catch (Exception ex)
            {
                DirAppend.Main(ex.Message);
                return null;
            }
        }
        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        public static List<T> ConvertDataRow<T>(DataRow[] dr)
        {
            List<T> data = new List<T>();
            for (int i = 0; i < dr.Length; i++)
            {
                try
                {
                    T item = GetItem<T>(dr[i]);
                    data.Add(item);
                }
                catch (Exception ex) { }
            }
            return data;
        }
        public static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
        public static string GetProcedureContent(string procedureName)
        {
            return null;
        }
        public static Task<List<T>> GetDataQuery<T>(string query)
        {
            return null;
        }
        public static string EncryptString(string plainText)
        {
            byte[] iv = new byte[16];
            byte[] array;

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                        {
                            streamWriter.Write(plainText);
                        }

                        array = memoryStream.ToArray();
                    }
                }
            }
            return Convert.ToBase64String(array);
        }

        public static string DecryptString(string cipherText)
        {
            try
            {
                byte[] iv = new byte[16];
                byte[] buffer = Convert.FromBase64String(cipherText);

                using (Aes aes = Aes.Create())
                {
                    aes.Key = Encoding.UTF8.GetBytes(key);
                    aes.IV = iv;
                    ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                    using (MemoryStream memoryStream = new MemoryStream(buffer))
                    {
                        using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                            {
                                return streamReader.ReadToEnd();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return "500";
            }
        }
        public static string DataTableToJSONWithStringBuilder(DataTable table)
        {
            var JSONString = new StringBuilder();
            if (table.Rows.Count > 0)
            {
                JSONString.Append("[");
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JSONString.Append("{");
                    for (int j = 0; j < table.Columns.Count; j++)
                    {
                        if (j < table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\",");
                        }
                        else if (j == table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\"");
                        }
                    }
                    if (i == table.Rows.Count - 1)
                    {
                        JSONString.Append("}");
                    }
                    else
                    {
                        JSONString.Append("},");
                    }
                }
                JSONString.Append("]");
            }
            return JSONString.ToString();
        }
        public static DataSet GetListTable(string connectString,string StoredProcedure, List<Tuple<string, string>> param)
        {
            try
            {
                SqlConnection Conn = ConnectController.ConnectSQL(connectString);
                try
                {
                    if (Conn.State == ConnectionState.Closed)
                        Conn.Open();
                    SqlCommand cmd = new SqlCommand(StoredProcedure, Conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    for (int i = 0; i < param.Count; i++)
                    {
                        cmd.Parameters.Add(new SqlParameter(param[i].Item1.ToString(), param[i].Item2.ToString()));
                    }
                    SqlDataAdapter ad = new SqlDataAdapter();
                    ad.SelectCommand = cmd;
                    DataSet ds = new DataSet();
                    ad.Fill(ds, StoredProcedure);
                    ad.Dispose();
                    return ds;
                }
                catch (Exception e)
                {
                    if (Conn.State == ConnectionState.Open)
                        Conn.Close();
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static DataSet GetListTable(string StoredProcedure,List<Tuple<string,string>> param)
        {
            try
            {
                SqlConnection Conn = ConnectController.ConnectSQL();
                try
                {
                    if (Conn.State == ConnectionState.Closed)
                        Conn.Open();
                    SqlCommand cmd = new SqlCommand(StoredProcedure, Conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    for (int i = 0; i < param.Count; i++)
                    {
                        cmd.Parameters.Add(new SqlParameter(param[i].Item1.ToString(), param[i].Item2.ToString()));
                    }
                    SqlDataAdapter ad = new SqlDataAdapter();
                    ad.SelectCommand = cmd;
                    DataSet ds = new DataSet();
                    ad.Fill(ds, StoredProcedure);
                    ad.Dispose();
                    return ds;  
                }
                catch (Exception e)
                {
                    if (Conn.State == ConnectionState.Open)
                        Conn.Close();
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static DataTable GetTable(string tbName, string qrSQL, string Where, DataTable dataTable)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                //lstTable.Remove(key)
                string key = tbName + "_" + qrSQL + "_" + Where;
                if (lstTable.ContainsKey(key)) return lstTable[key];
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand(qrSQL, Conn);
                cmd.CommandType = CommandType.Text;
                SqlDataAdapter ad = new SqlDataAdapter();
                ad.SelectCommand = cmd;
                DataSet ds = new DataSet();
                ad.Fill(ds, "table1");
                ad.Dispose();
                DataTable table = new DataTable(tbName);
                int DataType = 1;
                for (int i = 0; i < ds.Tables[0].Columns.Count; i++)
                {
                    //DataRow newRow = table.NewRow();
                    table.Columns.Add(ds.Tables[0].Columns[i].ColumnName.ToString());

                    //table.Rows.Add(newRow);
                }
                if (dataTable != null)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        DataRow newRow = table.NewRow();
                        for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                        {
                            if (string.Compare(ds.Tables[0].Columns[j].DataType.Name.ToString(), "DateTime") == 0)
                            {
                                string fm = "dd/MM/yyyy HH:mm:ss";
                                foreach (DataRow itfms in dataTable.Rows)
                                {
                                    if (itfms["COLUMN_NAME"].ToString() == ds.Tables[0].Columns[j].ColumnName.ToString())
                                    {
                                        fm = itfms["Formart"].ToString();
                                        break;
                                    }
                                }
                                if (fm == "")
                                    newRow[ds.Tables[0].Columns[j].ColumnName.ToString()] = ds.Tables[0].Rows[i][j].ToString();
                                string v = "";
                                if (ds.Tables[0].Rows[i][j].ToString() != "")
                                    v = DateTime.Parse(ds.Tables[0].Rows[i][j].ToString()).ToString(fm);
                                if (ds.Tables[0].Rows[i][j].ToString() != "")
                                    newRow[ds.Tables[0].Columns[j].ColumnName.ToString()] = v;
                            }
                            else
                            {
                                newRow[ds.Tables[0].Columns[j].ColumnName.ToString()] = ds.Tables[0].Rows[i][j].ToString();
                            }

                        }
                        table.Rows.Add(newRow);
                    }
                    if (Conn.State == ConnectionState.Open)
                        Conn.Close();
                    return table;
                }
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    DataRow newRow = table.NewRow();
                    for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                    {
                        if (string.Compare(ds.Tables[0].Columns[j].DataType.Name.ToString(), "DateTime") == 0)
                        {
                            if (DataType == 1)//Date
                            {
                                if (ds.Tables[0].Rows[i][j].ToString() != "")
                                    newRow[ds.Tables[0].Columns[j].ColumnName.ToString()] = DateTime.Parse(ds.Tables[0].Rows[i][j].ToString()).ToString("dd/MM/yyyy");
                            }
                        }
                        else
                        {
                            newRow[ds.Tables[0].Columns[j].ColumnName.ToString()] = ds.Tables[0].Rows[i][j].ToString();
                        }

                    }
                    table.Rows.Add(newRow);
                }
                if (tbName == "vw_System_GenTableDefineFormTable" || tbName == "vw_tb_Web_1_Menu" || tbName == "vw_Web_3_Menu" || tbName == "ProductPromotionSlides")
                    if (!lstTable.ContainsKey(key)) lstTable.Add(key, table);
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return table;
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return null;
            }
        }

        public static void ListJson(ref string data, string param, string value, string store)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand(store, Conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter(param, value));

                SqlDataAdapter ad = new SqlDataAdapter();
                ad.SelectCommand = cmd;
                DataSet ds = new DataSet();
                ad.Fill(ds, "table1");
                ad.Dispose();
                data = ds.Tables[0].Rows[0][0].ToString();
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
            }
        }
        public static string ExportDatatableToHtml(DataTable dt)
        {
            StringBuilder strHTMLBuilder = new StringBuilder();
            strHTMLBuilder.Append("<html >");
            strHTMLBuilder.Append("<head>");
            strHTMLBuilder.Append("</head>");
            strHTMLBuilder.Append("<body>");
            strHTMLBuilder.Append("<table class='table' border='1px' cellpadding='1' cellspacing='1' bgcolor='lightyellow' style='font-family:Garamond; font-size:smaller'>");
            strHTMLBuilder.Append("<tr class=\"columnheader\">");
            foreach (DataColumn myColumn in dt.Columns)
            {
                strHTMLBuilder.Append("<td >");
                strHTMLBuilder.Append(myColumn.ColumnName);
                strHTMLBuilder.Append("</td>");
            }
            strHTMLBuilder.Append("</tr>");
            foreach (DataRow myRow in dt.Rows)
            {
                strHTMLBuilder.Append("<tr class=\"row-table\">");
                foreach (DataColumn myColumn in dt.Columns)
                {
                    strHTMLBuilder.Append("<td >");
                    strHTMLBuilder.Append(myRow[myColumn.ColumnName].ToString());
                    strHTMLBuilder.Append("</td>");
                }
                strHTMLBuilder.Append("</tr>");
            }
            //Close tags.
            strHTMLBuilder.Append("</table>");
            strHTMLBuilder.Append("</body>");
            strHTMLBuilder.Append("</html>");
            string Htmltext = strHTMLBuilder.ToString();
            return Htmltext;
        }
        public static DataTable GetDataTable(string tbName, string qrSQL)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand(qrSQL, Conn);
                cmd.CommandType = CommandType.Text;

                SqlDataAdapter ad = new SqlDataAdapter();
                ad.SelectCommand = cmd;
                DataSet ds = new DataSet();
                ad.Fill(ds, "table1");
                ad.Dispose();
                DataTable table = new DataTable(tbName);
                int DataType = 1;
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return ds.Tables[0];
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return null;
            }
        }
        public static DataTable GetDataTable(string connectstring,string tbName, string qrSQL)
        {
            SqlConnection Conn = ConnectController.ConnectSQL(connectstring);
            try
            {
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand(qrSQL, Conn);
                cmd.CommandType = CommandType.Text;

                SqlDataAdapter ad = new SqlDataAdapter();
                ad.SelectCommand = cmd;
                DataSet ds = new DataSet();
                ad.Fill(ds, "table1");
                ad.Dispose();
                DataTable table = new DataTable(tbName);
                int DataType = 1;
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return ds.Tables[0];
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return null;
            }
        }
        public static DataSet GetDataSet(string qrSQL)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand(qrSQL, Conn);
                cmd.CommandType = CommandType.Text;

                SqlDataAdapter ad = new SqlDataAdapter();
                ad.SelectCommand = cmd;
                DataSet ds = new DataSet();
                ad.Fill(ds, "ListTable");
                ad.Dispose();

                int DataType = 1;
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return ds;
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return null;
            }
        }
        public static ActionResult Delete(string id, string tbName)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                if (tbName == "System_GenTableDefine_Detail")
                {
                    DataTable System_GetcolumnOld = GetDataTable("", "select * from System_GenTableDefine_Detail where ID = " + id);
                    string old_colName = System_GetcolumnOld.Rows[0]["colName_Temp"].ToString();
                    DelateSystem_GenTableDefine_Detail(System_GetcolumnOld.Rows[0]["tbName"].ToString(), old_colName);
                }
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand("Delete " + tbName + " Where id=" + id, Conn);
                cmd.ExecuteNonQuery();
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return null;
            }
            return null;
        }
        public static ActionResult SaveData(string data, string tbName)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                data = data.Replace("%0a", "");
                string[] objData = data.Split('&');
                string col = "", param = "", colName = "", colValue = "";

                if (objData[objData.Length - 1].ToString().Split('=')[1].ToString() == "add")
                {
                    if (Conn.State == ConnectionState.Closed)
                        Conn.Open();

                    for (int i = 1; i < objData.Length - 1; i++)
                    {
                        colName = objData[i].ToString().Split('=')[0];
                        if (i == objData.Length - 2)
                        {
                            col += colName;
                            param += "@" + colName;
                        }
                        else
                        {
                            col += colName + ",";
                            param += "@" + colName + ",";
                        }
                    }
                    string CONTEXT = "INSERT INTO " + tbName + "(" + col + ")   VALUES(" + param + ")";
                    string query = CONTEXT;
                    SqlCommand cmd = new SqlCommand(query, Conn);
                    string sql = "select " + col + " from " + tbName + " Where 0=1";
                    DataTable tb = GetDataTable("", sql);
                    for (int i = 1; i < objData.Length - 1; i++)
                    {
                        // SQL Server data type          CLR data type(SQL Server)    CLR data type(.NET Framework)
                        // varbinary                     SqlBytes, SqlBinary           Byte[]
                        // binary                        SqlBytes, SqlBinary           Byte[]
                        // varbinary(1), binary(1)       SqlBytes, SqlBinary           byte, Byte[]
                        // image                         None                          None
                        // varchar                       None                          None
                        // char                          None                          None
                        // nvarchar(1), nchar(1)         SqlChars, SqlString           Char, String, Char[]
                        // nvarchar                      SqlChars, SqlString           String, Char[]
                        // nchar                         SqlChars, SqlString           String, Char[]
                        // text                          None                          None
                        // ntext                         None                          None
                        // uniqueidentifier              SqlGuid                       Guid
                        // rowversion                    None                          Byte[]
                        // bit                           SqlBoolean                    Boolean
                        // tinyint                       SqlByte                       Byte
                        // smallint                      SqlInt16                      Int16
                        // int                           SqlInt32                      Int32
                        // bigint                        SqlInt64                      Int64
                        // smallmoney                    SqlMoney                      Decimal
                        // money                         SqlMoney                      Decimal
                        // numeric                       SqlDecimal                    Decimal
                        // decimal                       SqlDecimal                    Decimal
                        // real                          SqlSingle                     Single
                        // float                         SqlDouble                     Double
                        // smalldatetime                 SqlDateTime                   DateTime
                        // datetime                      SqlDateTime                   DateTime
                        // sql_variant                   None                          Object
                        // User - defined type(UDT)        None                          user - defined type
                        // table                         None                          None
                        // cursor                        None                          None
                        // timestamp                     None                          None
                        // xml                           SqlXml                        None
                        colName = objData[i].ToString().Split('=')[0];
                        colValue = objData[i].ToString().Split('=')[1];

                        System.Type type = tb.Columns[colName].DataType;
                        string dataTypeColumn = new DataColumn(colName).DataType.Name.ToString();
                        if (type == typeof(Byte[]))
                            cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                        else if (type == typeof(byte))
                            cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                        else if (type == typeof(Char) || type == typeof(String) || type == typeof(Char[]))
                        {
                            colValue = System.Net.WebUtility.UrlDecode(colValue);
                            colValue = colValue.Replace("DAUCONG", "+");
                            cmd.Parameters.AddWithValue("@" + colName, colValue);
                        }
                        else if (type == typeof(Guid))
                            cmd.Parameters.AddWithValue("@" + colName, Guid.Parse(colValue));
                        else if (type == typeof(Boolean))
                        {
                            if (string.Compare(colValue, "yes") == 0)
                                cmd.Parameters.AddWithValue("@" + colName, 1);
                            if (string.Compare(colValue, "yes") != 0)
                                cmd.Parameters.AddWithValue("@" + colName, 0);
                        }
                        else if (type == typeof(Int16) || type == typeof(Int32) || type == typeof(Int64))
                        {
                            if (colValue != "") cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));

                            else
                            {
                                colValue = "-1";
                                cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));
                            }
                        }
                        //cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue));
                        else if (type == typeof(Decimal))
                            cmd.Parameters.AddWithValue("@" + colName, Decimal.Parse(colValue));
                        else if (type == typeof(Single))
                            cmd.Parameters.AddWithValue("@" + colName, Single.Parse(colValue));
                        else if (type == typeof(Int16))
                            cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue));
                        else if (type == typeof(Double))
                            cmd.Parameters.AddWithValue("@" + colName, Double.Parse(colValue));
                        else if (type == typeof(DateTime))
                            cmd.Parameters.AddWithValue("@" + colName, colValue);
                        //if (string.Compare(dataTypeColumn, "Object") == 0)
                        //    cmd.Parameters.AddWithValue("@" + colName, Object.Parse(colValue));
                        //if (string.Compare(dataTypeColumn, "None") == 0)
                        //    cmd.Parameters.AddWithValue("@" + colName, None.Parse(colValue));
                        else return null;
                    }
                    cmd.ExecuteNonQuery();

                    if (Conn.State == ConnectionState.Open)
                        Conn.Close();
                }
                else if (objData[objData.Length - 1].ToString().Split('=')[1].ToString() == "edit")
                {
                    try
                    {
                        string id = objData[0].ToString().Split('=')[1];
                        for (int i = 1; i < objData.Length - 1; i++)
                        {
                            colName = objData[i].ToString().Split('=')[0];
                            if (i == objData.Length - 2)
                            {
                                col += colName + " = @" + colName;
                            }
                            else
                            {
                                col += colName + " = @" + colName + ",";
                            }
                        }
                        if (Conn.State == ConnectionState.Closed)
                            Conn.Open();
                        SqlCommand cmd = new SqlCommand("UPDATE " + tbName + " SET " + col + " WHERE [ID] = " + id, Conn);
                        string sql = "select * from " + tbName + " Where 0=1";

                        DataTable tb = GetDataTable("", sql);
                        for (int i = 1; i < objData.Length - 1; i++)
                        {
                            colName = objData[i].ToString().Split('=')[0];
                            colValue = objData[i].ToString().Split('=')[1];
                            //if (colValue == "")
                            //    colValue = "NULL";
                            System.Type type = tb.Columns[colName].DataType;
                            string dataTypeColumn = new DataColumn(colName).DataType.Name.ToString();
                            if (type == typeof(Byte[]))
                                cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                            else if (type == typeof(byte))
                                cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                            else if (type == typeof(Char) || type == typeof(String) || type == typeof(Char[]))
                            {
                                colValue = System.Net.WebUtility.UrlDecode(colValue);
                                colValue = colValue.Replace("DAUCONG", "+");
                                cmd.Parameters.AddWithValue("@" + colName, colValue);
                            }
                            else if (type == typeof(Guid))
                                cmd.Parameters.AddWithValue("@" + colName, Guid.Parse(colValue));
                            else if (type == typeof(Boolean))
                            {
                                if (string.Compare(colValue, "True") == 0)
                                    cmd.Parameters.AddWithValue("@" + colName, 1);
                                if (string.Compare(colValue, "True") != 0)
                                    cmd.Parameters.AddWithValue("@" + colName, 0);
                            }
                            else if (type == typeof(Int16) || type == typeof(Int32) || type == typeof(Int64))
                            {
                                if (colValue != "") cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));

                                else
                                {
                                    colValue = "-1";
                                    cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));
                                }
                            }
                            else if (type == typeof(Decimal))
                                cmd.Parameters.AddWithValue("@" + colName, Decimal.Parse(colValue));
                            else if (type == typeof(Single))
                                cmd.Parameters.AddWithValue("@" + colName, Single.Parse(colValue));
                            else if (type == typeof(Int16))
                                cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue));
                            else if (type == typeof(Double))
                                cmd.Parameters.AddWithValue("@" + colName, Double.Parse(colValue));
                            else if (type == typeof(DateTime))//System.Net.WebUtility.UrlDecode(colValue).ToString()
                                cmd.Parameters.AddWithValue("@" + colName, Convert.ToDateTime(System.Net.WebUtility.UrlDecode(colValue).ToString()));
                            else return null;

                        }
                        cmd.ExecuteNonQuery();
                        if (Conn.State == ConnectionState.Open)
                            Conn.Close();
                        return null;
                    }
                    catch (Exception e)
                    {
                        if (Conn.State == ConnectionState.Open)
                            Conn.Close();
                        return null;
                    }
                }

                return null;
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return null;
            }
        }
        public static ActionResult SaveDataByJson(string data, string tbName, string form)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                //JavaScriptSerializer serializer = new JavaScriptSerializer();
                //List<dynamic> items = serializer.Deserialize<List<dynamic>>(data);
                //string listColAllowShow = "";
                //DataTable table = GetTable("", "SELECT COLUMN_NAME FROM vw_System_GenTableDefineFormTable where tbName = '" + tbName + "' and (Status = 1 or  Status = 3) and type <> 2014", "", null);
                //foreach (DataRow itemsAllowShow in table.Rows)
                //{
                //    if (listColAllowShow != "") listColAllowShow += ",";
                //    listColAllowShow += itemsAllowShow["COLUMN_NAME"].ToString();
                //}
                //if (tbName == "System_GenTableDefine_Detail")
                //    listColAllowShow = "*";
                //if (tbName == "System_GenTableDefine")
                //    listColAllowShow = "id,Search,Copy,CSV,Excel,PDF,AllowPrint,SQLInsert,CSSInsert,JavaScriptInsert,NumberRowsDefault";
                //string sql = "select " + listColAllowShow + " from " + tbName;
                ////var json = Newtonsoft.Json.Linq.JObject.Parse(data);
                //table = GetTable("", sql, "", null);
                //string col = "", param = "";
                //Boolean check_insert = false, check_update = false;
                //DataTable System_TypeColum = GetDataTable("", "select * from System_TypeColum");
                //DataTable NewTable = GetTable(tbName, "Select * from " + tbName + " with(nolock) Where 0=1", "", null);
                //int countInsert = 0;
                //foreach (var e in items)
                //{
                //    try
                //    {
                //        if (int.Parse(e["id"].ToString()) < 0)
                //        {
                //            countInsert++;
                //            NewTable = GetTable(tbName, "Select * from " + tbName + " with(nolock) Where 0=1", "", null);
                //            DataRow newRow = NewTable.NewRow();
                //            NewTable.Rows.Add(newRow);
                //            string colName = ""; col = ""; param = "";
                //            //insert
                //            if (Conn.State == ConnectionState.Closed)
                //                Conn.Open();

                //            for (int i = 1; i < table.Columns.Count; i++)
                //            {
                //                colName = table.Columns[i].ColumnName;
                //                if (col != "")
                //                {
                //                    col += ",";
                //                    param += ",";
                //                }
                //                col += colName;
                //                param += "@" + colName;
                //            }
                //            string CONTEXT = "INSERT INTO " + tbName + "(" + col + ")   VALUES(" + param + ")";
                //            string query = CONTEXT;
                //            SqlCommand cmd = new SqlCommand(query, Conn);
                //            sql = "select " + col + " from " + tbName + " Where 0=1";
                //            DataTable tb = GetDataTable("", sql);
                //            for (int i = 1; i < table.Columns.Count; i++)
                //            {
                //                colName = table.Columns[i].ColumnName;
                //                if ((colName == "Action" || colName == "colName_Temp") && tbName == "System_GenTableDefine_Detail")
                //                {
                //                    newRow[colName] = "";
                //                }
                //                else
                //                {
                //                    try
                //                    {
                //                        string colValue = "";
                //                        if (",colAccountID,colDateAdd,colDateEdit,colStatus,colLog,colGroup,colCommon".IndexOf(colName) > 0)
                //                        {
                //                            colValue = "";
                //                        }
                //                        else
                //                        {
                //                            colValue = e[colName].ToString().Replace("DAUBE", "<");
                //                        }
                //                        colValue = colValue.Replace("DAULON", ">");
                //                        colValue = colValue.Replace("DAUCHIA", "/");
                //                        colValue = colValue.Replace("DAUBE", "<");

                //                        System.Type type = tb.Columns[colName].DataType;
                //                        string dataTypeColumn = new DataColumn(colName).DataType.Name.ToString();

                //                        if (type == typeof(Byte[]))
                //                            newRow[colName] = colValue;
                //                        else if (type == typeof(byte))
                //                            newRow[colName] = colValue;
                //                        else if (type == typeof(Char) || type == typeof(String) || type == typeof(Char[]))
                //                        {
                //                            colValue = System.Net.WebUtility.UrlDecode(colValue);
                //                            colValue = colValue.Replace("DAUCONG", "+");
                //                            newRow[colName] = colValue;
                //                        }

                //                        else if (type == typeof(Guid))
                //                            newRow[colName] = colValue;
                //                        else if (type == typeof(Boolean))
                //                        {
                //                            if (string.Compare(colValue, "yes") == 0)
                //                                newRow[colName] = true;
                //                            if (string.Compare(colValue, "yes") != 0)
                //                                newRow[colName] = false;
                //                        }
                //                        else if (type == typeof(Int16) || type == typeof(Int32) || type == typeof(Int64))
                //                        {
                //                            if (colValue == "")
                //                                newRow[colName] = 0;
                //                            else newRow[colName] = int.Parse(colValue.ToString());
                //                        }
                //                        else if (type == typeof(Decimal))
                //                            newRow[colName] = colValue;
                //                        else if (type == typeof(Single))
                //                            newRow[colName] = colValue;
                //                        else if (type == typeof(Int16))
                //                            newRow[colName] = colValue;
                //                        else if (type == typeof(Double))
                //                        {
                //                            if (colValue == "")
                //                                newRow[colName] = 0;
                //                            else newRow[colName] = double.Parse(colValue.ToString());
                //                        }
                //                        else if (type == typeof(DateTime))
                //                        {

                //                            if (colValue == "" || colValue == null)
                //                            {
                //                                newRow[colName] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                //                            }
                //                            else
                //                            {
                //                                newRow[colName] = Convert.ToDateTime(System.Net.WebUtility.UrlDecode(colValue).ToString()).ToString("dd/MM/yyyy HH:mm:ss");
                //                            }
                //                        }
                //                        else return null;
                //                    }
                //                    catch (Exception ex)
                //                    {
                //                    }
                //                }
                //            }
                //            if (Conn.State == ConnectionState.Open)
                //                Conn.Close();
                //            check_insert = true;
                //            if (tbName == "System_GenTableDefine_Detail")
                //            {
                //                bool check1 = SaveDataInTables(tbName, NewTable);
                //                string type = "";
                //                foreach (DataRow types in System_TypeColum.Rows)
                //                {
                //                    if (int.Parse(types["ID"].ToString()) == int.Parse(e["type"].ToString()))
                //                        type = types["Type"].ToString();
                //                }
                //                //Add column table
                //                InsertSystem_GenTableDefine_Detail(e["tbName"].ToString(), e["colName"].ToString(), type);
                //            }
                //        }
                //        else
                //        {
                //            if (form == "table")
                //            {
                //                foreach (DataRow etb in table.Rows)
                //                {
                //                    if (int.Parse(e["id"].ToString()) == int.Parse(etb["ID"].ToString()))
                //                    {
                //                        //update
                //                        string id = etb["ID"].ToString();
                //                        col = "";
                //                        for (int i = 1; i < table.Columns.Count; i++)
                //                        {
                //                            string colName = table.Columns[i].ColumnName;
                //                            Boolean checkcol = false;
                //                            foreach (var esub in e)
                //                            {
                //                                if (string.Compare(esub.Key, colName) == 0)
                //                                {
                //                                    checkcol = true;
                //                                    break;
                //                                }
                //                            }
                //                            if (checkcol)
                //                            {
                //                                if (col != "" & colName != "id")
                //                                    col += ",";
                //                                if (colName != "id")
                //                                    col += colName + " = @" + colName;
                //                            }
                //                        }
                //                        if (Conn.State == ConnectionState.Closed)
                //                            Conn.Open();
                //                        SqlCommand cmd = new SqlCommand("UPDATE " + tbName + " SET " + col + " WHERE ID = " + id, Conn);
                //                        sql = "select * from " + tbName + " Where 0=1";

                //                        DataTable tb = GetDataTable("", sql);
                //                        for (int i = 1; i < table.Columns.Count; i++)
                //                        {
                //                            string colName = table.Columns[i].ColumnName;
                //                            Boolean checkcol = false;
                //                            foreach (var esub in e)
                //                            {
                //                                if (string.Compare(esub.Key, colName) == 0)
                //                                {
                //                                    checkcol = true;
                //                                    break;
                //                                }
                //                            }
                //                            if (checkcol)
                //                            {
                //                                try
                //                                {
                //                                    string colValue = e[colName].ToString().Replace("DAUBE", "<");
                //                                    colValue = colValue.Replace("DAULON", ">");
                //                                    colValue = colValue.Replace("DAUCHIA", "/");
                //                                    colValue = colValue.Replace("DAUBE", "<");

                //                                    System.Type type = tb.Columns[colName].DataType;
                //                                    string dataTypeColumn = new DataColumn(colName).DataType.Name.ToString();
                //                                    if (type == typeof(Byte[]))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                //                                    else if (type == typeof(byte))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                //                                    else if (type == typeof(Char) || type == typeof(String) || type == typeof(Char[]))
                //                                    {
                //                                        colValue = System.Net.WebUtility.UrlDecode(colValue);
                //                                        colValue = colValue.Replace("DAUCONG", "+");
                //                                        cmd.Parameters.AddWithValue("@" + colName, colValue);
                //                                    }

                //                                    else if (type == typeof(Guid))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Guid.Parse(colValue));
                //                                    else if (type == typeof(Boolean))
                //                                    {
                //                                        if (string.Compare(colValue, "True") == 0)
                //                                            cmd.Parameters.AddWithValue("@" + colName, 1);
                //                                        if (string.Compare(colValue, "True") != 0)
                //                                            cmd.Parameters.AddWithValue("@" + colName, 0);
                //                                    }
                //                                    else if (type == typeof(Int16) || type == typeof(Int32) || type == typeof(Int64))
                //                                    {
                //                                        if (colValue != "") cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));

                //                                        else
                //                                        {
                //                                            colValue = "-1";
                //                                            cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));
                //                                        }
                //                                    }
                //                                    else if (type == typeof(Decimal))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Decimal.Parse(colValue));
                //                                    else if (type == typeof(Single))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Single.Parse(colValue));
                //                                    else if (type == typeof(Int16))
                //                                        cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue));
                //                                    else if (type == typeof(Double))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Double.Parse(colValue));
                //                                    else if (type == typeof(DateTime))//System.Net.WebUtility.UrlDecode(colValue).ToString()
                //                                    {
                //                                        if (colValue == "" || colValue == null)
                //                                        {
                //                                            cmd.Parameters.AddWithValue("@" + colName, "");
                //                                        }
                //                                        else
                //                                        {
                //                                            cmd.Parameters.AddWithValue("@" + colName, Convert.ToDateTime(System.Net.WebUtility.UrlDecode(colValue).ToString()));
                //                                        }
                //                                    }
                //                                    else return null;
                //                                }
                //                                catch (Exception ex)
                //                                {

                //                                }
                //                            }
                //                        }
                //                        //string old_colName = table.Rows[0]["colName"].ToString();
                //                        cmd.ExecuteNonQuery();
                //                        if (Conn.State == ConnectionState.Open)
                //                            Conn.Close();
                //                        check_update = true;
                //                        //if (tbName == "System_GenTableDefine_Detail")
                //                        //{
                //                        //    DataTable System_TypeColum = GetDataTable("", "select Type from System_TypeColum where ID = " + e["type"].ToString(), "");
                //                        //    UpdateSystem_GenTableDefine_Detail(e["tbName"].ToString(), e["colName"].ToString(), old_colName, System_TypeColum.Rows[0]["Type"].ToString());
                //                        //}
                //                        break;
                //                    }
                //                }
                //                if (check_insert == false && check_update == false)
                //                {
                //                    Delete(int.Parse(e["id"].ToString()), tbName);
                //                    //del
                //                }
                //            }
                //            else if (form == "edit_form")
                //            {
                //                //DataView dv = new DataView(table);
                //                //dv.RowFilter = "id = " + e["id"].ToString();
                //                //table = dv.ToTable();
                //                foreach (DataRow etb in table.Rows)
                //                {
                //                    if (int.Parse(e["id"].ToString()) == int.Parse(etb["ID"].ToString()))
                //                    {
                //                        //update
                //                        string id = etb["ID"].ToString();
                //                        col = "";
                //                        for (int i = 0; i < table.Columns.Count; i++)
                //                        {
                //                            string colName = table.Columns[i].ColumnName;
                //                            if (colName != "id")
                //                            {
                //                                if (col != "")
                //                                    col += ",";
                //                                col += colName + " = @" + colName;
                //                            }
                //                        }
                //                        if (Conn.State == ConnectionState.Closed)
                //                            Conn.Open();
                //                        SqlCommand cmd = new SqlCommand("UPDATE " + tbName + " SET " + col + " WHERE ID = " + id, Conn);
                //                        sql = "select * from " + tbName + " Where 0=1";

                //                        DataTable tb = GetDataTable("", sql);
                //                        int ii = 0;
                //                        string old_colName = "";

                //                        try
                //                        {
                //                            for (int i = ii; i < table.Columns.Count; i++)
                //                            {
                //                                ii = i;
                //                                string colName = table.Columns[i].ColumnName;
                //                                string colValue = "";
                //                                if (colName != "id")
                //                                {
                //                                    foreach (var esub in items)
                //                                    {
                //                                        try
                //                                        {
                //                                            if (id == esub["id"].ToString())
                //                                            {
                //                                                if (tbName == "System_GenTableDefine_Detail")
                //                                                {
                //                                                    colValue = esub[colName].ToString();
                //                                                    break;
                //                                                }
                //                                                else
                //                                                {
                //                                                    for (int i_dt = 0; i_dt < items.Count; i_dt++)
                //                                                    {
                //                                                        try
                //                                                        {
                //                                                            colValue = items[i_dt][colName].ToString();
                //                                                            break;
                //                                                        }
                //                                                        catch
                //                                                        {

                //                                                        }
                //                                                    }
                //                                                }
                //                                                break;
                //                                            }
                //                                        }
                //                                        catch
                //                                        {
                //                                            if (colValue != "")
                //                                                break;
                //                                        }
                //                                    }
                //                                    colValue = colValue.Replace("DAUBE", "<");
                //                                    colValue = colValue.Replace("DAULON", ">");
                //                                    colValue = colValue.Replace("DAUCHIA", "/");

                //                                    System.Type type = tb.Columns[colName].DataType;
                //                                    string dataTypeColumn = new DataColumn(colName).DataType.Name.ToString();
                //                                    if (type == typeof(Byte[]))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                //                                    else if (type == typeof(byte))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                //                                    else if (type == typeof(Char) || type == typeof(String) || type == typeof(Char[]))
                //                                    {
                //                                        colValue = System.Net.WebUtility.UrlDecode(colValue);
                //                                        colValue = colValue.Replace("DAUCONG", "+");
                //                                        cmd.Parameters.AddWithValue("@" + colName, colValue);
                //                                    }

                //                                    else if (type == typeof(Guid))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Guid.Parse(colValue));
                //                                    else if (type == typeof(Boolean))
                //                                    {
                //                                        if (string.Compare(colValue, "True") == 0 || string.Compare(colValue, "true") == 0 || string.Compare(colValue, "on") == 0)
                //                                            cmd.Parameters.AddWithValue("@" + colName, 1);
                //                                        else
                //                                            cmd.Parameters.AddWithValue("@" + colName, 0);
                //                                    }
                //                                    else if (type == typeof(Int16) || type == typeof(Int32) || type == typeof(Int64))
                //                                    {
                //                                        if (colValue != "" && colValue != "NULL")
                //                                            cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));
                //                                        else
                //                                        {
                //                                            colValue = "-1";
                //                                            cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));
                //                                        }
                //                                    }
                //                                    else if (type == typeof(Decimal))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Decimal.Parse(colValue));
                //                                    else if (type == typeof(Single))
                //                                        cmd.Parameters.AddWithValue("@" + colName, Single.Parse(colValue));
                //                                    else if (type == typeof(Int16))
                //                                        cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue));
                //                                    else if (type == typeof(Double))
                //                                    {
                //                                        colValue = colValue.Replace(".00", "");
                //                                        colValue = colValue.Replace(",", "");

                //                                        if (colValue != "" && colValue != "NULL")
                //                                            cmd.Parameters.AddWithValue("@" + colName, colValue);
                //                                        else
                //                                            cmd.Parameters.AddWithValue("@" + colName, 0);
                //                                    }
                //                                    else if (type == typeof(DateTime))//System.Net.WebUtility.UrlDecode(colValue).ToString()
                //                                    {
                //                                        if (colValue != "")
                //                                            cmd.Parameters.AddWithValue("@" + colName, Convert.ToDateTime(colValue).ToString("yyyy/MM/dd HH:mm:ss"));
                //                                        else
                //                                            cmd.Parameters.AddWithValue("@" + colName, "");
                //                                    }
                //                                    else return null;
                //                                }
                //                            }
                //                            if (tbName == "System_GenTableDefine_Detail")
                //                            {
                //                                DataTable System_GetcolumnOld = GetDataTable("", "select colName_Temp from System_GenTableDefine_Detail where ID = " + e["id"].ToString());
                //                                old_colName = System_GetcolumnOld.Rows[0]["colName_Temp"].ToString();
                //                            }

                //                            cmd.ExecuteNonQuery();
                //                            if (Conn.State == ConnectionState.Open)
                //                                Conn.Close();
                //                            check_update = true;
                //                            if (tbName == "System_GenTableDefine_Detail")
                //                            {
                //                                string type = "";
                //                                foreach (DataRow types in System_TypeColum.Rows)
                //                                {
                //                                    if (int.Parse(types["ID"].ToString()) == int.Parse(e["type"].ToString()))
                //                                    {
                //                                        type = types["Type"].ToString();
                //                                        break;
                //                                    }
                //                                }
                //                                UpdateSystem_GenTableDefine_Detail(e["tbName"].ToString(), e["colName"].ToString(), old_colName, type);
                //                            }
                //                            break;
                //                        }
                //                        catch (Exception ex)
                //                        {

                //                        }
                //                        check_update = true;
                //                    }
                //                }
                //                if (check_insert == false && check_update == false)
                //                {
                //                    Delete(int.Parse(e["id"].ToString()), tbName);
                //                }
                //                //break;
                //            }
                //        }
                //    }
                //    catch (Exception ex)
                //    {
                //        string log = ex.Message;
                //    }
                //    if (tbName != "System_GenTableDefine_Detail")
                //    {
                //        bool check = SaveDataInTables(tbName, NewTable);
                //    }
                //}
                return null;
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return null;
            }
        }
        public static bool SaveDataInTables(string tablename, DataTable dataTable)
        {
            try
            {
                if (dataTable.Rows.Count > 0)
                {
                    using (SqlConnection con = new SqlConnection(ConnectController.ConnectString))
                    {
                        using (SqlBulkCopy sqlBulkCopy = new SqlBulkCopy(con))
                        {
                            sqlBulkCopy.DestinationTableName = tablename;
                            con.Open();
                            sqlBulkCopy.WriteToServer(dataTable);
                            con.Close();
                        }
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static bool UpdateDataInTables(string tbName, DataTable dataTable)
        {
            try
            {
                SqlConnection Conn = ConnectController.ConnectSQL();
                string listcol = "";
                for (int i = 0; i < dataTable.Columns.Count; i++)
                {
                    string colName = dataTable.Columns[i].ColumnName;
                    if (colName != "id")
                    {
                        if (listcol != "")
                            listcol += ",";
                        listcol += colName + " = @" + colName;
                    }
                }
                foreach (DataRow items in dataTable.Rows)
                {
                    if (Conn.State == ConnectionState.Closed)
                        Conn.Open();
                    int id = int.Parse(items["id"].ToString());
                    SqlCommand cmd = new SqlCommand("UPDATE " + tbName + " SET " + listcol + " WHERE ID = " + id, Conn);
                    for (int i = 0; i < dataTable.Columns.Count; i++)
                    {
                        string colName = dataTable.Columns[i].ColumnName;

                        string colValue = items[colName].ToString();
                        System.Type type = dataTable.Columns[colName].DataType;
                        if (type == typeof(Byte[]))
                            cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                        else if (type == typeof(byte))
                            cmd.Parameters.AddWithValue("@" + colName, Byte.Parse(colValue));
                        else if (type == typeof(Char) || type == typeof(String) || type == typeof(Char[]))
                        {
                            colValue = System.Net.WebUtility.UrlDecode(colValue);
                            colValue = colValue.Replace("DAUCONG", "+");
                            cmd.Parameters.AddWithValue("@" + colName, colValue);
                        }
                        else if (type == typeof(Guid))
                            cmd.Parameters.AddWithValue("@" + colName, Guid.Parse(colValue));
                        else if (type == typeof(Boolean))
                        {
                            if (string.Compare(colValue, "True") == 0 || string.Compare(colValue, "true") == 0)
                                cmd.Parameters.AddWithValue("@" + colName, 1);
                            else
                                cmd.Parameters.AddWithValue("@" + colName, 0);
                        }
                        else if (type == typeof(Int16) || type == typeof(Int32) || type == typeof(Int64))
                        {
                            if (colValue != "" && colValue != "NULL")
                                cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));
                            else
                            {
                                colValue = "-1";
                                cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue.ToString()));
                            }
                        }
                        else if (type == typeof(Decimal))
                            cmd.Parameters.AddWithValue("@" + colName, Decimal.Parse(colValue));
                        else if (type == typeof(Single))
                            cmd.Parameters.AddWithValue("@" + colName, Single.Parse(colValue));
                        else if (type == typeof(Int16))
                            cmd.Parameters.AddWithValue("@" + colName, int.Parse(colValue));
                        else if (type == typeof(Double))
                        {
                            colValue = colValue.Replace(".00", "");
                            colValue = colValue.Replace(",", "");

                            if (colValue != "" && colValue != "NULL")
                                cmd.Parameters.AddWithValue("@" + colName, colValue);
                            else
                                cmd.Parameters.AddWithValue("@" + colName, 0);
                        }
                        else if (type == typeof(DateTime))//System.Net.WebUtility.UrlDecode(colValue).ToString()
                        {
                            if (colValue != "")
                                cmd.Parameters.AddWithValue("@" + colName, Convert.ToDateTime(colValue).ToString("yyyy/MM/dd HH:mm:ss"));
                            else
                                cmd.Parameters.AddWithValue("@" + colName, "");
                        }
                    }
                    cmd.ExecuteNonQuery();
                    if (Conn.State == ConnectionState.Open)
                        Conn.Close();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static void InsertSystem_GenTableDefine_Detail(string tbName, string colName, string type)
        {
            string qr = "ALTER TABLE " + tbName + " ADD " + colName + " " + type;
            ExecuteNonQuery(qr);
            qr = "update System_GenTableDefine_Detail  set colName_Temp = '" + colName + "' where tbName = '" + tbName + "' and " + " colName = '" + colName + "'";
            ExecuteNonQuery(qr);
        }
        public static void UpdateSystem_GenTableDefine_Detail(string tbName, string colName, string OLD_colName, string type)
        {
            Boolean log = true;
            if (colName != OLD_colName)
            {
                string qr = tbName + ".[" + OLD_colName + "]";
                qr = "EXEC sp_rename 'dbo." + qr + "','" + colName + "' , 'COLUMN'";
                log = ExecuteNonQuery(qr);
                qr = "update System_GenTableDefine_Detail  set colName_Temp = '" + colName + "' where tbName = '" + tbName + "' and " + " colName = '" + colName + "'";
                log = ExecuteNonQuery(qr);
            }
            string qr1 = "ALTER TABLE  dbo." + tbName + " ALTER COLUMN " + colName + " " + type;
            log = ExecuteNonQuery(qr1);
        }
        public static void DelateSystem_GenTableDefine_Detail(string tbName, string colName)
        {
            string qr = "ALTER TABLE dbo." + tbName + " DROP COLUMN " + colName;
            Boolean log = ExecuteNonQuery(qr);
        }
        public static Boolean ExecuteNonQuery(string cdmSQL)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand(cdmSQL, Conn);
                cmd.ExecuteNonQuery();
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return true;
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return false;
            }
        }
        public static Boolean ExecuteNonQuery(string connectString,string cdmSQL)
        {
            SqlConnection Conn = ConnectController.ConnectSQL(connectString);
            try
            {
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand(cdmSQL, Conn);
                cmd.ExecuteNonQuery();
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return true;
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return false;
            }
        }

        public static int CreateTable(string tbName, string tbNameVN)
        {
            SqlConnection Conn = ConnectController.ConnectSQL();
            try
            {
                string strCommandText = "CREATE TABLE " +
                    " " + tbName + " " +
                    "( " +
                    "id int IDENTITY(1,1) NOT NULL primary key  " +
                    "" +
                    ",colAccountID int NULL ,colDateAdd datetime NULL " +
                    ",colStatus int NULL " +
                    ",colLog text NULL " +
                    ",colGroup int NULL " +
                    ",colDateEdit datetime NULL " +
                    ",colCommon text NULL " +
                    ");";
                if (Conn.State == ConnectionState.Closed)
                    Conn.Open();
                SqlCommand cmd = new SqlCommand(strCommandText, Conn);
                cmd.ExecuteNonQuery();
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                //strCommandText = "update  System_GenTableDefine_Detail set colName_Temp = tbName where tbName = '" + tbName + "'";
                //if (Conn.State == ConnectionState.Closed)
                //    Conn.Open();
                //cmd = new SqlCommand(strCommandText, Conn);
                //cmd.ExecuteNonQuery();
                //if (Conn.State == ConnectionState.Open)
                //    Conn.Close();
                return 1;
            }
            catch (Exception e)
            {
                if (Conn.State == ConnectionState.Open)
                    Conn.Close();
                return -1;
            }
        }
        public static int[] convertSolar2Lunar(int dd, int mm, int yy, int timeZone)//Chuyển đổi dương sang âm
        {
            long dayNumber = jdFromDate(dd, mm, yy);
            long k = INT((dayNumber - 2415021.076998695) / 29.530588853);
            long monthStart = getNewMoonDay(k + 1, timeZone);
            if (monthStart > dayNumber)
            {
                monthStart = getNewMoonDay(k, timeZone);
            }
            long a11 = getLunarMonth11(yy, timeZone);
            long b11 = a11;
            int lunarYear;
            if (a11 >= monthStart)
            {
                lunarYear = yy;
                a11 = getLunarMonth11(yy - 1, timeZone);
            }
            else
            {
                lunarYear = yy + 1;
                b11 = getLunarMonth11(yy + 1, timeZone);
            }
            long lunarDay = dayNumber - monthStart + 1;
            long diff = INT((monthStart - a11) / 29);
            int lunarLeap = 0;
            long lunarMonth = diff + 11;
            if (b11 - a11 > 365)
            {
                int leapMonthDiff = getLeapMonthOffset(a11, timeZone);
                if (diff >= leapMonthDiff)
                {
                    lunarMonth = diff + 10;
                    if (diff == leapMonthDiff)
                    {
                        lunarLeap = 1;
                    }
                }
            }
            if (lunarMonth > 12)
            {
                lunarMonth = lunarMonth - 12;
            }
            if (lunarMonth >= 11 && diff < 4)
            {
                lunarYear -= 1;
            }
            return new int[] { (int)lunarDay, (int)lunarMonth, (int)lunarYear, lunarLeap };
        }

        public static long INT(double d)
        {
            return (long)Math.Floor(d);
        }

        public static long jdFromDate(int dd, int mm, int yy)
        {
            long a = INT((14 - mm) / 12);
            long y = yy + 4800 - a;
            long m = mm + 12 * a - 3;
            long jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
            if (jd < 2299161)
            {
                jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
            }
            return jd;
        }

        public static long getNewMoonDay(long k, long timeZone)
        {
            double T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
            double T2 = T * T;
            double T3 = T2 * T;
            double dr = Math.PI / 180;
            double Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
            Jd1 = Jd1 + 0.00033 * Math.Sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
            double M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun's mean anomaly
            double Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon's mean anomaly
            double F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon's argument of latitude
            double C1 = (0.1734 - 0.000393 * T) * Math.Sin(M * dr) + 0.0021 * Math.Sin(2 * dr * M);
            C1 = C1 - 0.4068 * Math.Sin(Mpr * dr) + 0.0161 * Math.Sin(dr * 2 * Mpr);
            C1 = C1 - 0.0004 * Math.Sin(dr * 3 * Mpr);
            C1 = C1 + 0.0104 * Math.Sin(dr * 2 * F) - 0.0051 * Math.Sin(dr * (M + Mpr));
            C1 = C1 - 0.0074 * Math.Sin(dr * (M - Mpr)) + 0.0004 * Math.Sin(dr * (2 * F + M));
            C1 = C1 - 0.0004 * Math.Sin(dr * (2 * F - M)) - 0.0006 * Math.Sin(dr * (2 * F + Mpr));
            C1 = C1 + 0.0010 * Math.Sin(dr * (2 * F - Mpr)) + 0.0005 * Math.Sin(dr * (2 * Mpr + M));
            double deltat = 0;
            if (T < -11)
            {
                deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
            }
            else
            {
                deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
            };
            double JdNew = Jd1 + C1 - deltat;
            return INT(JdNew + 0.5 + (double)((double)timeZone / 24));
        }

        public static long getSunLongitude(long jdn, int timeZone)
        {
            double T = (jdn - 2451545.5 - timeZone / 24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
            double T2 = T * T;
            double dr = Math.PI / 180; // degree to radian
            double M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
            double L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
            double DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.Sin(dr * M);
            DL = DL + (0.019993 - 0.000101 * T) * Math.Sin(dr * 2 * M) + 0.000290 * Math.Sin(dr * 3 * M);
            double L = L0 + DL; // true longitude, degree
            // obtain apparent longitude by correcting for nutation and aberration
            double omega = 125.04 - 1934.136 * T;
            L = L - 0.00569 - 0.00478 * Math.Sin(omega * dr);
            L = L * dr;
            L = L - Math.PI * 2 * (INT(L / (Math.PI * 2))); // Normalize to (0, 2*PI)
            return INT(L / Math.PI * 6);
        }

        public static long getLunarMonth11(int yy, int timeZone)
        {
            long off = jdFromDate(31, 12, yy) - 2415021;
            long k = INT(off / 29.530588853);
            long nm = getNewMoonDay(k, timeZone);
            long sunLong = getSunLongitude(nm, timeZone); // sun longitude at local midnight
            if (sunLong >= 9)
            {
                nm = getNewMoonDay(k - 1, timeZone);
            }
            return nm;
        }

        public static int getLeapMonthOffset(long a11, int timeZone)
        {
            long k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
            long last = 0;
            int i = 1; // We start with the month following lunar month 11
            long arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
            do
            {
                last = arc;
                i = i + 1;
                arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
            } while (arc != last && i < 14);
            return i - 1;
        }
    }
}
