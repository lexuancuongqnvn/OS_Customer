using KMeansProject;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;

namespace ERP.Web.Models
{
    public class ImageSearchAlgorithm
    {
        private List<double[]> _dataset;

        public ImageSearchAlgorithm()
        {
            _dataset = new List<double[]>();
        }

        public void RunAlgorithm(Bitmap searchImage,ref KMeans _kmeans, int k)
        {
            try
            {
                for (int i = 0; i < searchImage.Height; i++)
                {
                    for (int j = 0; j < searchImage.Width; j++)
                    {
                        Color c = searchImage.GetPixel(i, j);
                        double[] pixelArray = new double[] { c.R, c.G, c.B };
                        _dataset.Add(pixelArray);
                    }
                }

                _kmeans = new KMeans(k, new EuclideanDistance());
                _kmeans.Run(_dataset.ToArray());
            }catch(Exception ex) {
            
            }
        }

        public async Task<Bitmap> ProcessImage(Bitmap image, List<Color> cenotridColorList, KMeans _kmeans)
        {
            Bitmap resultImage = new Bitmap(image.Width, image.Height);

            for (int i = 0; i < resultImage.Height; i++)
            {
                for (int j = 0; j < resultImage.Width; j++)
                {
                    Color c = image.GetPixel(i, j);
                    double[] pixelArray = new double[] { c.R, c.G, c.B };
                    int resultCentroid = await _kmeans.Classify(pixelArray);
                    Color centroidColor = cenotridColorList[resultCentroid];
                    resultImage.SetPixel(i, j, centroidColor);
                }
            }

            return resultImage;
        }
    }
}
