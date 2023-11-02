using KMeansProject;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;

namespace ERP.Web.Models
{
    public class SearchImage
    {
        private ImageSearchAlgorithm _imageSearchAlgorithm;

        public SearchImage(ImageSearchAlgorithm imageSearchAlgorithm)
        {
            _imageSearchAlgorithm = imageSearchAlgorithm;
        }

        public async Task<Tuple<int, double>> GetMostSimilarImage(Bitmap searchImage, string[] imageFileArray, List<Color> centroidColorList, KMeans _kmeans)
        {
            int mostSimilarImageIndex = 0;
            double maxSimilarity = 0;

            for (int i = 0; i < imageFileArray.Length; i++)
            {
                string image = imageFileArray[i];
                using (Bitmap bmpImage = new Bitmap(Image.FromFile(image), searchImage.Width, searchImage.Height))
                {
                    using (Bitmap bmpPorcessedImage =await _imageSearchAlgorithm.ProcessImage(bmpImage, centroidColorList, _kmeans))
                    {
                        double similarityPercent = CalculateSimilarity(searchImage, bmpPorcessedImage);
                        if (similarityPercent > maxSimilarity)
                        {
                            mostSimilarImageIndex = i;
                            maxSimilarity = similarityPercent;
                        }
                    }
                }

            }

            return new Tuple<int, double>(mostSimilarImageIndex, maxSimilarity);
        }

        public async Task<List<KeyValuePair<string, double>>> SortBySimilarity(Bitmap searchImage, string[] imageFileArray, List<Color> centroidColorList, KMeans _kmeans)
        {
            Dictionary<string, double> similarityDic = new Dictionary<string, double>();

            for (int i = 0; i < imageFileArray.Length; i++)
            {
                string image = imageFileArray[i];
                Image image1 = Image.FromFile(image);
                
                using (Bitmap bmpImage = new Bitmap(image1, searchImage.Width, searchImage.Height))
                {
                    using (Bitmap bmpPorcessedImage = await _imageSearchAlgorithm.ProcessImage(bmpImage, centroidColorList, _kmeans))
                    {
                        double similarityPercent = CalculateSimilarity(searchImage, bmpPorcessedImage);
                        similarityDic.Add(image, similarityPercent);
                    }
                }
                image1.Dispose();
            }
            List<KeyValuePair<string, double>> result = new List<KeyValuePair<string, double>>();
            foreach (KeyValuePair<string, double> kvp in similarityDic)
            {
                result.Add(kvp);
            }
            result.Sort((e1, e2) =>
            {
                return e2.Value.CompareTo(e1.Value);
            });
            return result;
        }

        public double CalculateSimilarity(Bitmap bmpImage1, Bitmap bmpImage2)
        {
            int correct = 0;
            for (int i = 0; i < bmpImage1.Width; i++)
            {
                for (int j = 0; j < bmpImage1.Height; j++)
                {
                    Color c1 = bmpImage1.GetPixel(i, j);
                    Color c2 = bmpImage2.GetPixel(i, j);
                    if (c1.ToArgb() == c2.ToArgb())
                        correct++;
                }
            }

            int maxPixels = bmpImage1.Width * bmpImage1.Height;

            double SimilarityPercent = (100.0 * correct) / maxPixels;
            return SimilarityPercent;
        }
    }
}
