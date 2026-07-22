export type TUserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  country?: string;
  description?: string;
};

export type TLoginPayload = {
  username: string;
  password: string;
  country: string | "";
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
};
