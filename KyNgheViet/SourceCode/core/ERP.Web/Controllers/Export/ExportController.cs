using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using ClosedXML.Excel;
using ERP.System.Intfs.Export.Dto;
using ERP.Web.Shared.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERP.Web.Controllers.Export
{
    public class ExportController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult ExporDataToFile([FromBody] Export_ENTITY input)
        {

            var dictioneryexportType = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            DataTable dataTable = new DataTable();
            switch (input.exportType)
            {
                case "Excel":
                    ExportToExcel(dataTable);
                    break;
                case "Csv":
                    ExportToCsv(dataTable);
                    break;
                case "Pdf":
                    ExportToPdf(dataTable);
                    break;
                case "Word":
                    ExportToWord(dataTable);
                    break;
                case "Json":
                    ExportToJson(dataTable);
                    break;
                case "Xml":
                    ExportToXML(dataTable);
                    break;
                case "Text":
                    ExportToText(dataTable);
                    break;
            }
            return null;
        }
        private void ExportToPdf(DataTable products)
        {

        }
        private void ExportToExcel(DataTable products)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Products");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "ProductID";
                worksheet.Cell(currentRow, 2).Value = "ProductName";
                worksheet.Cell(currentRow, 3).Value = "Price";
                worksheet.Cell(currentRow, 4).Value = "ProductDescription";

                for (int i = 0; i < products.Rows.Count; i++)
                {
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = products.Rows[i]["ProductID"];
                        worksheet.Cell(currentRow, 2).Value = products.Rows[i]["ProductName"];
                        worksheet.Cell(currentRow, 3).Value = products.Rows[i]["Price"];
                        worksheet.Cell(currentRow, 4).Value = products.Rows[i]["ProductDescription"];
                    }
                }
                using var stream = new MemoryStream();
                workbook.SaveAs(stream);
                var content = stream.ToArray();
                Response.Clear();
                Response.Headers.Add("content-disposition", "attachment;filename=ProductDetails.xls");
                Response.ContentType = "application/xls";
                Response.Body.WriteAsync(content);
                Response.Body.Flush();
            }
        }
        private void ExportToCsv(DataTable products)
        {
            StringBuilder sb = new StringBuilder();

            IEnumerable<string> columnNames = products.Columns.Cast<DataColumn>().
                                              Select(column => column.ColumnName);
            sb.AppendLine(string.Join(",", columnNames));

            foreach (DataRow row in products.Rows)
            {
                IEnumerable<string> fields = row.ItemArray.Select(field =>
                  string.Concat("\"", field.ToString().Replace("\"", "\"\""), "\""));
                sb.AppendLine(string.Join(",", fields));
            }
            byte[] byteArray = ASCIIEncoding.ASCII.GetBytes(sb.ToString());
            Response.Clear();
            Response.Headers.Add("content-disposition", "attachment;filename=ProductDetails.csv");
            Response.ContentType = "application/text";
            Response.Body.WriteAsync(byteArray);
            Response.Body.Flush();
        }
        //private void ExportToPdf(DataTable products)
        //{

        //    if (products.Rows.Count > 0)
        //    {
        //        int pdfRowIndex = 1;
        //        string filename = "ProductDetails-" + DateTime.Now.ToString("dd-MM-yyyy hh_mm_s_tt");
        //        string filepath = MyServer.MapPath("\\") + "" + filename + ".pdf";
        //        Document document = new Document(PageSize.A4, 5f, 5f, 10f, 10f);
        //        FileStream fs = new FileStream(filepath, FileMode.Create);
        //        PdfWriter writer = PdfWriter.GetInstance(document, fs);
        //        document.Open();

        //        Font font1 = FontFactory.GetFont(FontFactory.COURIER_BOLD, 10);
        //        Font font2 = FontFactory.GetFont(FontFactory.COURIER, 8);

        //        float[] columnDefinitionSize = { 2F, 5F, 2F, 5F };
        //        PdfPTable table;
        //        PdfPCell cell;

        //        table = new PdfPTable(columnDefinitionSize)
        //        {
        //            WidthPercentage = 100
        //        };

        //        cell = new PdfPCell
        //        {
        //            BackgroundColor = new BaseColor(0xC0, 0xC0, 0xC0)
        //        };

        //        table.AddCell(new Phrase("ProductId", font1));
        //        table.AddCell(new Phrase("ProductName", font1));
        //        table.AddCell(new Phrase("Price", font1));
        //        table.AddCell(new Phrase("ProductDescription", font1));
        //        table.HeaderRows = 1;

        //        foreach (DataRow data in products.Rows)
        //        {
        //            table.AddCell(new Phrase(data["ProductId"].ToString(), font2));
        //            table.AddCell(new Phrase(data["ProductName"].ToString(), font2));
        //            table.AddCell(new Phrase(data["Price"].ToString(), font2));
        //            table.AddCell(new Phrase(data["ProductDescription"].ToString(), font2));

        //            pdfRowIndex++;
        //        }

        //        document.Add(table);
        //        document.Close();
        //        document.CloseDocument();
        //        document.Dispose();
        //        writer.Close();
        //        writer.Dispose();
        //        fs.Close();
        //        fs.Dispose();

        //        FileStream sourceFile = new FileStream(filepath, FileMode.Open);
        //        float fileSize = 0;
        //        fileSize = sourceFile.Length;
        //        byte[] getContent = new byte[Convert.ToInt32(Math.Truncate(fileSize))];
        //        sourceFile.Read(getContent, 0, Convert.ToInt32(sourceFile.Length));
        //        sourceFile.Close();
        //        Response.Clear();
        //        Response.Headers.Clear();
        //        Response.ContentType = "application/pdf";
        //        Response.Headers.Add("Content-Length", getContent.Length.ToString());
        //        Response.Headers.Add("Content-Disposition", "attachment; filename=" + filename + ".pdf;");
        //        Response.Body.WriteAsync(getContent);
        //        Response.Body.Flush();
        //    }
        //}
        private void ExportToWord(DataTable products)
        {
            DataTable dtProduct = products;

            if (dtProduct.Rows.Count > 0)
            {
                StringBuilder sbDocumentBody = new StringBuilder();

                sbDocumentBody.Append("<table width=\"100%\" style=\"background-color:#ffffff;\">");
                if (dtProduct.Rows.Count > 0)
                {
                    sbDocumentBody.Append("<tr><td>");
                    sbDocumentBody.Append("<table width=\"600\" cellpadding=0 cellspacing=0 style=\"border: 1px solid gray;\">");

                    // Add Column Headers dynamically from datatable  
                    sbDocumentBody.Append("<tr>");
                    for (int i = 0; i < dtProduct.Columns.Count; i++)
                    {
                        sbDocumentBody.Append("<td class=\"Header\" width=\"120\" style=\"border: 1px solid gray; text-align:center; font-family:Verdana; font-size:12px; font-weight:bold;\">" + dtProduct.Columns[i].ToString().Replace(".", "<br>") + "</td>");
                    }
                    sbDocumentBody.Append("</tr>");

                    // Add Data Rows dynamically from datatable  
                    for (int i = 0; i < dtProduct.Rows.Count; i++)
                    {
                        sbDocumentBody.Append("<tr>");
                        for (int j = 0; j < dtProduct.Columns.Count; j++)
                        {
                            sbDocumentBody.Append("<td class=\"Content\"style=\"border: 1px solid gray;\">" + dtProduct.Rows[i][j].ToString() + "</td>");
                        }
                        sbDocumentBody.Append("</tr>");
                    }
                    sbDocumentBody.Append("</table>");
                    sbDocumentBody.Append("</td></tr></table>");
                }
                byte[] byteArray = ASCIIEncoding.ASCII.GetBytes(sbDocumentBody.ToString());

                Response.Clear();
                Response.Headers.Add("Content-Type", "application/msword");
                Response.Headers.Add("Content-disposition", "attachment; filename=ProductDetails.doc");
                Response.Body.WriteAsync(byteArray);
                Response.Body.FlushAsync();
            }
        }
        private void ExportToJson(DataTable products)
        {
            //var listProduct = (from DataRow row in products.Rows

            //                   select new Product()
            //                   {
            //                       ProductID = row["ProductID"] != null ? Convert.ToInt32(row["ProductID"]) : 0,
            //                       ProductName = Convert.ToString(row["ProductName"]),
            //                       Price = row["Price"] != null ? Convert.ToInt32(row["Price"]) : 0,
            //                       ProductDescription = Convert.ToString(row["ProductDescription"])
            //                   }).ToList();
            //string jsonProductList = new JavaScriptSerializer().Serialize(listProduct);
            //byte[] byteArray = ASCIIEncoding.ASCII.GetBytes(jsonProductList);

            //Response.Clear();
            //Response.Headers.Clear();
            //Response.ContentType = "application/json";
            //Response.Headers.Add("Content-Length", jsonProductList.Length.ToString());
            //Response.Headers.Add("Content-Disposition", "attachment; filename=ProductDetails.json;");
            //Response.Body.WriteAsync(byteArray);
            //Response.Body.FlushAsync();
        }
        private void ExportToXML(DataTable products)
        {
            //var listProduct = (from DataRow row in products.Rows

            //                   select new Product()
            //                   {
            //                       ProductID = row["ProductID"] != null ? Convert.ToInt32(row["ProductID"]) : 0,
            //                       ProductName = Convert.ToString(row["ProductName"]),
            //                       Price = row["Price"] != null ? Convert.ToInt32(row["Price"]) : 0,
            //                       ProductDescription = Convert.ToString(row["ProductDescription"])
            //                   }).ToList();
            //XmlDocument xml = new XmlDocument();
            //XmlElement root = xml.CreateElement("Products");
            //xml.AppendChild(root);
            //foreach (var product in listProduct)
            //{
            //    XmlElement child = xml.CreateElement("Product");
            //    child.SetAttribute("ProductID", product.ProductID.ToString());
            //    child.SetAttribute("ProductName", product.ProductName);
            //    child.SetAttribute("Price", product.Price.ToString());
            //    child.SetAttribute("ProductDescription", product.ProductDescription);
            //    root.AppendChild(child);
            //}
            //byte[] byteArray = ASCIIEncoding.ASCII.GetBytes(xml.OuterXml.ToString());

            //Response.Clear();
            //Response.Headers.Clear();
            //Response.ContentType = "application/xml";
            //Response.Headers.Add("Content-Disposition", "attachment; filename=ProductDetails.xml;");
            //Response.Body.WriteAsync(byteArray);
            //Response.Body.Flush();
        }
        private void ExportToText(DataTable products)
        {
            var delimeter = ",";
            var lineEndDelimeter = ";";


            StringBuilder sb = new StringBuilder();
            string Columns = string.Empty;

            foreach (DataColumn column in products.Columns)
            {
                Columns += column.ColumnName + delimeter;
            }
            sb.Append(Columns.Remove(Columns.Length - 1, 1) + lineEndDelimeter);
            foreach (DataRow datarow in products.Rows)
            {
                string row = string.Empty;
                foreach (object items in datarow.ItemArray)
                {
                    row += items.ToString() + delimeter;
                }

                sb.Append(row.Remove(row.Length - 1, 1) + lineEndDelimeter);
            }
            byte[] byteArray = ASCIIEncoding.ASCII.GetBytes(sb.ToString());

            Response.Clear();
            Response.Headers.Clear();
            Response.ContentType = "application/Text";
            Response.Headers.Add("Content-Disposition", "attachment; filename=ProductDetails.txt;");
            Response.Body.WriteAsync(byteArray);
            Response.Body.FlushAsync();
        }

    }
}
