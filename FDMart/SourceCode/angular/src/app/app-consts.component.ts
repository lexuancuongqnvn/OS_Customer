export class AppConsts {
  //openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout localhost.key -days 3560 -out localhost.crt -config certificate.cnf
  //ng serve --ssl --ssl-cert D:\SourceCode\ERP\RELEASE\angular\localhost.crt --ssl-key D:\SourceCode\ERP\RELEASE\angular\localhost.key
  //node --max-old-space-size=16384 node_modules/@angular/cli/bin/ng serve --ssl --ssl-cert D:\SourceCode\ERP\RELEASE\angular\localhost.crt --ssl-key D:\SourceCode\ERP\RELEASE\angular\localhost.key
  //node --max-old-space-size=8192 node_modules/@angular/cli/bin/ng serve
  
  static limit_length_uploadfile = 100;//Mb 
  //static baseUrl = "http://192.168.1.25:8082"; 
  static baseUrl = "https://localhost:44390";  
  //static baseUrl = "https://api.knv.osoft.vn"; 
}
