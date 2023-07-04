 interface User {
    userName: string;
    email: string;
    avatar: string;
  }

type Token = string;
  
  interface RegisterCredentials {
    userName: string;
    email: string;
    password: string;
    avatar: string;
  } 
   interface FetchFileUploadResult{
   avatar: string
   }

   interface fetchRegisterResult {

   }
  interface loginCredentials {
    email: string;
    password: string;
  }
  interface FetchLoginResult {
    msg: string;
    user:  User;
    token: Token;
  }

  interface FetchError {
    error: string;
  }
  type ResponseError = string | null;