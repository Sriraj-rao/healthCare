export const environment = {
    production: false,
    config: {
      apiHostUrl: 'https://cwb-api-qa.ushealthgroup.com/',
      environment: 'QA',
      fileDownloadUrl: 'https://docgen-api-qa.ushealthgroup.com/api/Box/Documents/',
      myUshgUrlBase: 'https://myushg-qa.ushealthgroup.com/Login.aspx',
      ozUrl: 'https://cd-qa.ushealthgroup.com',
      cloakCallLogErrors: false,
      showPPONetwork: false,
      docGeneratorApi: 'https://docgen-api-qa.ushealthgroup.com/'
    },
    clientId: '0740baee-5064-4b65-a2c2-4ed61c52f2f1',
    authority: 'https://login.microsoftonline.com/cc7c826f-6444-4c0e-8314-83afb87c98ea/',
    redirectUri:  'https://cwb-qa.ushealthgroup.com/',
    postLogoutRedirectUri: 'https://cwb-qa.ushealthgroup.com/',
    cwbTheme: 'oz',
    protectedResources: {
      cwbapi: {
        endpoint: "https://cwb-api-qa.ushealthgroup.com/",
        scopes: ["api://2be0b6d6-db5d-4113-8b5d-8db7da1df23c/user_impersonation"] // Example :["api://788e4c0a-4623-48fe-b8c8-5b8db5d24765/user_impersonation"] Scopes which MSAL interceptor will automatically attach the correct Bearer token to the http request
      }
    }
  };
