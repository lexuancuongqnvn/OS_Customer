using ERP.Common.Models;
using ERP.System.Intfs.GenRowTable.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Reference.Dto
{
    public class REFERENCE_V3_Param
    {
        public string reference { get; set; }
        public object master_data_obj { get; set; }
        public Dictionary<string, string> master_data { get; set; }
    }
    public class REFERENCE_ENTITY
    {
        public int Id { get; set; }
        public int? IDEdit { get; set; }
        public string codeFather { get; set; }
        public int? userID { get; set; }
        public string code { get; set; }
        public string code_master { get; set; }
        public string Name { get; set; }
        public string TABLE_NAME { get; set; }
        public string TABLE_NAME_DETAIL { get; set; }
        public string Stored { get; set; }
        public string Param { get; set; }
        public string COLUMN_NAME { get; set; }
        public string Values { get; set; }
        public string Key { get; set; }
        public int? Type { get; set; }
        public int? type_id { get; set; }
        public string InputMasterJSON { get; set; }
        public string ModelDetailJSON { get; set; }
        public List<Dictionary<string, object>> OutputData { get; set; }
        public SYS_GenRowTable GenRowTable { get; set; }
        public User user { get; set; }
    }
}
