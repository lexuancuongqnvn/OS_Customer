using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace ERP.Common.Content.Helper
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
    }
}
