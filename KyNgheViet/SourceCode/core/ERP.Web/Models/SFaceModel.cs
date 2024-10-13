namespace ERP.Web.Models
{
    public class SFaceModel
    {
        public string detector_backend { get; set; }
        public decimal? distance { get; set; }
        public facial_areas facial_areas { get; set; }
        public string model { get; set; }
        public string similarity_metric { get; set; }
        public decimal? threshold { get; set; }
        public decimal? time { get; set; }
        public bool? verified { get; set; }
    }
    public class facial_areas
    {
        public img1 img1 { get;set; }
        public img1 img2 { get;set; }
    }
    public class img1
    {
        public int? h { get; set; }
        public int? w { get; set; }
        public int? x { get; set; }
        public int? y { get; set; }
}
    public class img2
    {
        public int? h {get;set;}
        public int? w {get;set;}
        public int? x {get;set;}
        public int? y { get; set; }
    }
}
