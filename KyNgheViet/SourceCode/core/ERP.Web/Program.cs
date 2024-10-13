using ERP.Web.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ERP.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            CultureInfo originalCulture = Thread.CurrentThread.CurrentCulture;
            // Change culture to en-US.
            Thread.CurrentThread.CurrentCulture = new CultureInfo("vi-VN");
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.AddConsole();
            })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            }).ConfigureHostConfiguration(configHost =>
            {
                var config = new ConfigurationBuilder()
                .AddCommandLine(args)
                .Build();
                var host = new WebHostBuilder()
                            .UseConfiguration(config)
                            .UseContentRoot(Directory.GetCurrentDirectory())
                            .UseKestrel()
                            .UseIISIntegration()
                            .UseStartup<Startup>()
                            .Build();
                //configHost.AddJsonFile("appsettings.json", optional: true);
                //configHost.AddEnvironmentVariables(prefix: "PREFIX_");
                configHost.AddCommandLine(args).Build();
            });
    }
}
