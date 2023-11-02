using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ERP.Common.App_Data.Log
{
    public static class DirAppend
    {
        public static string path = Path.GetFullPath("App_Data/Log/log.txt");
        public static void Main(string LogStr)
        {
            try
            {
                //kiểm tra file lớn hơn 5Mb thì clear
                FileInfo fi = new FileInfo(path);
                long size = fi.Length / 1000000;
                if (size > 5) ClearLog();
                using (StreamWriter w = File.AppendText(path))
                {
                    Log(LogStr, w);
                }

                using (StreamReader r = File.OpenText(path))
                {
                    DumpLog(r);
                }
            }
            catch (Exception ex)
            {
                using (StreamReader r = File.OpenText(path))
                {
                    DumpLog(r);
                }
            }

        }
        public static async Task<string> ReadFile(string path)
        {
            string line = "";
            using (StreamReader r = File.OpenText(path))
            {
                while ((line = r.ReadLine()) != null)
                {
                    return line;
                }
            }
            return line;
        }
        public static void ClearLog()
        {
            StreamWriter sr = new StreamWriter(path);
            sr.Flush();
            sr.Close();
        }
        public static void Log(string logMessage, TextWriter w)
        {
            w.Write("/r/n");
            w.WriteLine($"{DateTime.Now.ToLongTimeString()} {DateTime.Now.ToLongDateString()}");
            w.WriteLine($"  :{logMessage}");
            w.WriteLine("--------------------------------------------------------------------------------------------");
        }

        public static void DumpLog(StreamReader r)
        {
            string line;
            while ((line = r.ReadLine()) != null)
            {
                Console.WriteLine(line);
            }
        }
    }
}
