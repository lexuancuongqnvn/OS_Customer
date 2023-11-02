using ERP.Common.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Common.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ConnectController : Controller
    {
        public static string ConnectString = "";
        public static string customer_code = "";
        //public static string IDConnectString = "";
        public static Dictionary<string, string> lisConectString = new Dictionary<string, string>();
        public static Dictionary<string, LicenseModel> License = new Dictionary<string, LicenseModel>();
        // GET: Connect
        public ActionResult Index()
        {
            return View();
        }
        public static SqlConnection ConnectSQL()
        {
            ConnectString = GetConnectStringByKey("ID");
            SqlConnection conn = new SqlConnection(ConnectString);
            return conn;
        }
        public static SqlConnection ConnectSQL(string connection)
        {
            SqlConnection conn = new SqlConnection(connection);
            return conn;
        }
        public static string GetConnectStringByKey(string key)
        {
            return ManagementController.DecryptString(lisConectString[key]);
        }
        public static LicenseModel GetLicense(string key){
            try
            {
                return License[key];
            }
            catch
            {
                return null;    
            }
        }
    }
}
