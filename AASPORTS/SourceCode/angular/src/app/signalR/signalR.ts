import { AppConsts } from "../app-consts.component";

export const environment = {  
    production: false,  
    baseUrl: AppConsts.baseUrl+'/',
    baseUrl_Upload:  AppConsts.baseUrl,
    baseUrl_DataChat:  AppConsts.baseUrl+'/',
  };   

  export const fb_environment = {
    production: false,
    firebase: {
      apiKey: '<your-key>',
      authDomain: '<your-project-authdomain>',
      databaseURL: '<your-database-URL>',
      projectId: '<your-project-id>',
      storageBucket: '<your-storage-bucket>',
      messagingSenderId: '<your-messaging-sender-id>'
    }
  };