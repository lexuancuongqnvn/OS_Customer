using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Process.Controllers
{
    public class ConvertController : Controller
    {
        public static List<dynamic> ConvertStringToJSON(string str)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<dynamic> items = serializer.Deserialize<List<dynamic>>(str);
            return items;
        }
        public static string ConvertJSONToString(string str)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<dynamic> items = serializer.Deserialize<List<dynamic>>(str);
            return "";
        }
    }
}