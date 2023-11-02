using System;

public class XmlHelper
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
