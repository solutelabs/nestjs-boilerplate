export interface IChangePasswordResponse {
  success: boolean;
}

export interface IForgetPasswordResponse {
  email: string;
}

export interface IResetPasswordResponse {
  token: string;
}
