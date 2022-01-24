// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/**
 * Debug environment file
 */
export const environment = {
  production: false,
  config: {
    // apiHostUrl: 'https://cwb-api-dev.ushealthgroup.com/',
  //  apiHostUrl: 'https://localhost:44363/',
    apiHostUrl: 'https://localhost:44396/',
    environment: 'LOCAL',
    fileDownloadUrl: 'https://docgen-api-dev.ushealthgroup.com/api/Box/Documents/',
    myUshgUrlBase: 'https://dev-myushg.ushealthgroup.com/Login.aspx',
    ozUrl: 'https://cd-dev.ushealthgroup.com',
    cloakCallLogErrors: false,
    showPPONetwork: false,
    docGeneratorApi: 'https://ushg-documentgenerator-webapi-dev.azurewebsites.net/'
  },
  clientId: 'cad0a374-b20c-4045-9e99-6a752103c97e',
  authority: 'https://login.microsoftonline.com/cc7c826f-6444-4c0e-8314-83afb87c98ea/',
  redirectUri: window.location.origin,
  postLogoutRedirectUri: 'http://localhost:2000/home',
  cwbTheme: 'oz',
  protectedResources: {
    cwbapi: {
      endpoint: 'https://cwb-api-dev.ushealthgroup.com/',
      scopes: ['api://696eb8f0-c1f3-4440-8c4f-2b1ce88700a2/user_impersonation']
    }
  }
};


// For local API testing: http://localhost:58783/ or http://localhost:55629/
// For local myUSHG testing: http://localhost:20781/Login.aspx

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
