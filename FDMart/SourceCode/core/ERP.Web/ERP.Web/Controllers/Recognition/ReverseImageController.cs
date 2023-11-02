using ERP.Web.Models;
using KMeansProject;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Recognition
{
    public class ReverseImageController : Controller
    {
        private Bitmap bmpSearchImage;
        private Bitmap bmpSearchImageProcessed;
        private List<Color> _centroidColor;

        private string[] _fileArray;

        private ImageSearchAlgorithm _algorithm;
        private SearchImage _searchImage;

        private List<KeyValuePair<string, double>> similarityList;
        public List<string> fileList = new List<string>();

        public IActionResult Index()
        {
            _centroidColor = new List<Color>();
            _centroidColor.Add(Color.FromArgb(255, 255, 184, 113));
            _centroidColor.Add(Color.FromArgb(255, 255, 255, 255));
            _centroidColor.Add(Color.FromArgb(255, 42, 42, 42));
            _centroidColor.Add(Color.FromArgb(255, 0, 255, 255));
            _centroidColor.Add(Color.FromArgb(255, 224, 224, 224));
            _algorithm = new ImageSearchAlgorithm();
            ProcessImage();
            LoadFolder();
            SearchImageList();
            return View();
        }
        public IActionResult SearchImage()
        {
            return View();
        }
        public async Task ProcessImage()
        {
            Bitmap bmpSearchImage = new Bitmap(@"D:\SourceCode\AI\FaceAI\14. Reverse Image Search\Test\cefb05516e8daad3f39c1.jpg");
            KMeans _kmeans = null;
            _algorithm.RunAlgorithm(bmpSearchImage,ref _kmeans, _centroidColor.Count);
            bmpSearchImageProcessed =await _algorithm.ProcessImage(bmpSearchImage, _centroidColor, _kmeans);
        }
        private async Task SearchImageList()
        {
            //_searchImage = new SearchImage(_algorithm);
            //similarityList = await _searchImage.SortBySimilarity(bmpSearchImageProcessed, _fileArray, _centroidColor);
            //string text = "";
            //List<string> tempList = new List<string>();
            //foreach (var imagePath in similarityList)
            //    tempList.Add(imagePath.Key);
            //_fileArray = tempList.ToArray();
            //foreach (var imagePath in _fileArray)
            //    fileList.Add(Path.GetFileNameWithoutExtension(imagePath));

        }
        private void LoadFolder()
        {
            _fileArray = Directory.GetFiles(@"D:\SourceCode\AI\FaceAI\14. Reverse Image Search\Test", "*.jpg");
            foreach (string image in _fileArray)
                fileList.Add(Path.GetFileNameWithoutExtension(image));
        }
    }
}
