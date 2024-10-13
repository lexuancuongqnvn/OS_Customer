using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace Process.ProClass
{
    public static class ConvertJSON
    {
        public static List<dynamic> ConvertStringToJSON(string str)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<dynamic> items = serializer.Deserialize<List<dynamic>>(str);
            return items;
        }
    }
}
