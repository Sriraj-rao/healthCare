export const environment = {
  production: true,
  config: {
    apiHostUrl: 'https://cwb-api.ushealthgroup.com/',
    environment: 'PROD',
    fileDownloadUrl: 'https://docgen-api.ushealthgroup.com/api/Box/Documents/',
    myUshgUrlBase: 'https://cwb.ushealthgroup.com/Login.aspx',
    ozUrl: 'https://cd-dev.ushealthgroup.com',
    cloakCallLogErrors: false,
    showPPONetwork: false,
    docGeneratorApi: 'https://docgen-api.ushealthgroup.com/'
  },
  clientId: '9d6d34ee-ffe5-48c4-aec1-58f1ed8a14dd',
  authority: 'https://login.microsoftonline.com/cc7c826f-6444-4c0e-8314-83afb87c98ea/',
  redirectUri:  'https://cwb.ushealthgroup.com/',
  postLogoutRedirectUri: 'https://cwb.ushealthgroup.com/',
  cwbTheme: 'oz',
  protectedResources: {
    cwbapi: {
      endpoint: "https://cwb-api.ushealthgroup.com/",
      scopes: ["api://f86bd845-5aca-4ca8-96b6-49a4dd48f887/user_impersonation"] // Example :["api://788e4c0a-4623-48fe-b8c8-5b8db5d24765/user_impersonation"] Scopes which MSAL interceptor will automatically attach the correct Bearer token to the http request
    }
  }
};
