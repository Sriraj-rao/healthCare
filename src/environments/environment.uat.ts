export const environment = {
  production: false,
  config: {
    apiHostUrl: 'https://cwb-api-uat.ushealthgroup.com/',
    environment: 'UAT',
    fileDownloadUrl: 'https://docgen-api-uat.ushealthgroup.com/api/Box/Documents/',
    myUshgUrlBase: 'https://myushg-uat.ushealthgroup.com/Login.aspx',
    ozUrl: 'https://cd-uat.ushealthgroup.com',
    cloakCallLogErrors: false,
    showPPONetwork: false,
    docGeneratorApi: 'https://docgen-api-uat.ushealthgroup.com/'
  },
  clientId: '94824398-666f-48e6-91bc-7a04ca26c86a',
  authority: 'https://login.microsoftonline.com/cc7c826f-6444-4c0e-8314-83afb87c98ea/',
  redirectUri:  'https://cwb-uat.ushealthgroup.com/',
  postLogoutRedirectUri: 'https://cwb-uat.ushealthgroup.com/',
  cwbTheme: 'oz',
  protectedResources: {
    cwbapi: {
      endpoint: "https://cwb-api-uat.ushealthgroup.com/",
      scopes: ["api://c8b580a7-21c6-4968-8a0c-0b4a36cc823e/user_impersonation"] // Example :["api://788e4c0a-4623-48fe-b8c8-5b8db5d24765/user_impersonation"] Scopes which MSAL interceptor will automatically attach the correct Bearer token to the http request
    }
  }
};
