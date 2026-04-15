export type TUserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  role: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
};
