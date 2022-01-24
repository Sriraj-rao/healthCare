export const environment = {
  production: false,
  config: {
    apiHostUrl: 'https://cwb-api-dev.ushealthgroup.com/',
    environment: 'DEVELOPMENT',
    fileDownloadUrl: 'https://docgen-api-dev.ushealthgroup.com/api/Box/Documents/',
    myUshgUrlBase: 'https://dev-myushg.ushealthgroup.com/Login.aspx',
    ozUrl: 'https://cd-dev.ushealthgroup.com',
    cloakCallLogErrors: false,
    showPPONetwork: false,
    docGeneratorApi: 'https://ushg-documentgenerator-webapi-dev.azurewebsites.net/'
  },
  clientId: 'd00a130b-ad00-415c-a60d-b73c773b2ec3',
  authority: 'https://login.microsoftonline.com/cc7c826f-6444-4c0e-8314-83afb87c98ea/',
  redirectUri:  'https://cwb-dev.ushealthgroup.com/',
  postLogoutRedirectUri: 'https://cwb-dev.ushealthgroup.com/',
  cwbTheme: 'oz',
  protectedResources: {
    cwbapi: {
      endpoint: "https://cwb-api-dev.ushealthgroup.com/",
      scopes: ["api://696eb8f0-c1f3-4440-8c4f-2b1ce88700a2/user_impersonation"] // Example :["api://788e4c0a-4623-48fe-b8c8-5b8db5d24765/user_impersonation"] Scopes which MSAL interceptor will automatically attach the correct Bearer token to the http request
    }
  }
};
