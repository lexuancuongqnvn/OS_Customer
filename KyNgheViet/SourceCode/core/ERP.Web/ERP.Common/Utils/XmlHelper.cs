using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace Common.Utils
{
	public static class XmlHelper
	{
		public static string ToXML(object obj, string rootAttribute = "Root")
		{
			var emptyNamespaces = new XmlSerializerNamespaces(new[] { XmlQualifiedName.Empty });
			var serializer = new XmlSerializer(obj.GetType(), new XmlRootAttribute(rootAttribute));
			var settings = new XmlWriterSettings();
			settings.CheckCharacters = false;
			settings.Indent = true;
			settings.OmitXmlDeclaration = true;

			using (var stream = new StringWriter())
			using (var writer = XmlWriter.Create(stream, settings))
			{
				serializer.Serialize(writer, obj, emptyNamespaces);
				return stream.ToString();
			}
		}
		public static string RemoveInvalidXmlChars(string text)
		{
			if (text == null)
			{
				return text;
			}

			if (text.Length == 0)
			{
				return text;
			}

			// a bit complicated, but avoids memory usage if not necessary
			StringBuilder result = null;
			for (int i = 0; i < text.Length; i++)
			{
				var ch = text[i];
				if (XmlConvert.IsXmlChar(ch))
				{
					result?.Append(ch);
				}
				else if (result == null)
				{
					result = new StringBuilder();
					result.Append(text.Substring(0, i));
				}
			}

			if (result == null)
			{
				return text; // no invalid xml chars detected - return original text
			}
			else
			{
				return result.ToString();
			}
		}

		public static string ToXmlFromList<T>(this List<T> list, string rootAttribute = "Root") where T : class
		{
			if (list == null)
			{
				return "<Root />";
			}
			var allProperties = typeof(T).GetProperties().Where(x =>
			{
				var xmlIgnore = x.GetCustomAttributes(typeof(XmlIgnoreAttribute), true).FirstOrDefault();
				return xmlIgnore == null;
			}).ToList();

			var xmlText = ToXML(list, rootAttribute);

			XmlReaderSettings xrs = new XmlReaderSettings();
			xrs.CheckCharacters = false;
			XmlReader rd = XmlReader.Create(new StringReader(RemoveInvalidXmlChars(xmlText)), xrs);
			var xml = XDocument.Load(rd);

			var elementName = typeof(T).Name;
			var xmlElementAttr = typeof(T).GetCustomAttributes(
								typeof(XmlElement), true
							).FirstOrDefault() as XmlElement;

			if (xmlElementAttr != null)
			{
				elementName = xmlElementAttr.Name;
			}

			var elements = xml.Element(rootAttribute).Elements().ToList();

			foreach (var property in allProperties)
			{
				for (var i = 0; i < list.Count; i++)
				{
					var obj = list[i];
					var value = property.GetValue(obj);
					var parentElement = elements[i];
					var xmlElement = parentElement.Elements().FirstOrDefault(x=>x.Name.LocalName.ToUpper() == property.Name.ToUpper());

					if (property.PropertyType == typeof(string) && value == null && xmlElement == null)
					{
						var name = property.Name;

						XmlElement xmlElAttr = (XmlElement)property.GetCustomAttributes(typeof(XmlElement), true).FirstOrDefault();

						if (xmlElAttr != null)
						{
							name = xmlElAttr.Prefix;
						}

						value = "";

						XElement x = new XElement(name);
						x.Value = "";

						parentElement.Add(x);
					}

					if (value == null && xmlElement != null)
					{
						xmlElement.Remove();
						continue;
					}

					if (property.PropertyType == typeof(DateTime))
					{
						xmlElement.Value = ((DateTime)value).ToString("yyyy-MM-dd HH:mm:ss");
					}
					else if (property.PropertyType == typeof(DateTime?))
					{
						xmlElement.Value = (value as DateTime?).Value.ToString("yyyy-MM-dd HH:mm:ss");
					}
				}
			}
			return xml.ToString();
		}
		public static string SetValueDefaultObject<T>(object obj, string rootAttribute = "Root")
        {
			if (obj is List<T> list)
            {
				foreach (T parameters in list)
				{
					var properties = parameters.GetType().GetProperties();
					foreach (var property in properties)
					{
						var PropetyValue = parameters.GetType().GetProperty(property.Name).GetValue(parameters, null);
						if(PropetyValue == null)
                        {
							if (property.PropertyType == typeof(Decimal) || property.PropertyType == typeof(Decimal?) || property.PropertyType == typeof(int) || property.PropertyType == typeof(int?) || property.PropertyType == typeof(float) || property.PropertyType == typeof(float?) || property.PropertyType == typeof(double) || property.PropertyType == typeof(double?))
							{
								try
								{
									decimal intValue = 0;
									decimal? NullValue = (decimal?)intValue;
									parameters.GetType().GetProperty(property.Name).SetValue(parameters, NullValue);
								}
								catch (Exception e)
								{

								}
							}else if (property.PropertyType == typeof(int) || property.PropertyType == typeof(int?))
							{
								try
								{
									int intValue = 0;
									int? NullValue = (int?)intValue;
									parameters.GetType().GetProperty(property.Name).SetValue(parameters, NullValue);
								}
								catch (Exception e)
								{

								}
							}else if (property.PropertyType == typeof(float) || property.PropertyType == typeof(float?) || property.PropertyType == typeof(double) || property.PropertyType == typeof(double?))
							{
								try
								{
									double intValue = 0;
									float? decimalValue = (float?)intValue;
									parameters.GetType().GetProperty(property.Name).SetValue(parameters, decimalValue);
								}
								catch (Exception e)
								{

								}
							}
							else if (property.PropertyType == typeof(double) || property.PropertyType == typeof(double?))
							{
								try
								{
									double intValue = 0;
									double? decimalValue = (double?)intValue;
									parameters.GetType().GetProperty(property.Name).SetValue(parameters, decimalValue);
								}
								catch (Exception e)
								{

								}
							}
						}							
					}
				}
				return ToXML(list, rootAttribute);
			}
			
			return ToXML(obj, rootAttribute);
		}
		public static string ToXmlFromList2<T>(this List<T> list, string rootAttribute = "Root") where T : class
		{

			if (list == null)
			{
				return "<Root />";
			}
			var allProperties = typeof(T).GetProperties().Where(x =>
			{
				var xmlIgnore = x.GetCustomAttributes(typeof(XmlIgnoreAttribute), true).FirstOrDefault();
				return xmlIgnore == null;
			}).ToList();

			//var xmlText = ToXML(list, rootAttribute);
			var xmlText = SetValueDefaultObject<T>(list, rootAttribute);

			XmlReaderSettings xrs = new XmlReaderSettings();
			xrs.CheckCharacters = false;
			XmlReader rd = XmlReader.Create(new StringReader(RemoveInvalidXmlChars(xmlText)), xrs);
			var xml = XDocument.Load(rd);

			var elementName = typeof(T).Name;
			var xmlElementAttr = typeof(T).GetCustomAttributes(
								typeof(XmlElement), true
							).FirstOrDefault() as XmlElement;

			if (xmlElementAttr != null)
			{
				elementName = xmlElementAttr.Name;
			}

			var elements = xml.Element(rootAttribute).Elements().ToList();

			foreach (var property in allProperties)
			{
				for (var i = 0; i < list.Count; i++)
				{
					var obj = list[i];
					var value = property.GetValue(obj);
					var parentElement = elements[i];
					var xmlElement = parentElement.Elements().FirstOrDefault(x=>x.Name.LocalName.ToUpper() == property.Name.ToUpper());

					if (property.PropertyType == typeof(string) && value == null && xmlElement == null)
					{
						var name = property.Name;

						XmlElement xmlElAttr = (XmlElement)property.GetCustomAttributes(typeof(XmlElement), true).FirstOrDefault();

						if (xmlElAttr != null)
						{
							name = xmlElAttr.Prefix;
						}

						value = "";

						XElement x = new XElement(name);
						x.Value = "";

						parentElement.Add(x);
					}

					if (value == null && xmlElement != null)
					{
						xmlElement.Remove();
						continue;
					}

					if (property.PropertyType == typeof(DateTime))
					{
						xmlElement.Value = ((DateTime)value).ToString("yyyy-MM-dd HH:mm:ss");
					}
					else if (property.PropertyType == typeof(DateTime?))
					{
						xmlElement.Value = (value as DateTime?).Value.ToString("yyyy-MM-dd HH:mm:ss");
					}
				}
			}
			return xml.ToString();
		}

		public static T LoadFromXMLString<T>(string xmlText) where T : class
		{
			using (var stringReader = new System.IO.StringReader(xmlText))
			{
				var serializer = new XmlSerializer(typeof(T));
				return serializer.Deserialize(stringReader) as T;
			}
		}
	}
}
