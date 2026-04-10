export enum eNotificationType {
  SUCCESS = "success",
  ERROR = "error",
}

export enum eHttpResponse {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  Gone = 410,
  BadInputRequest = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export enum eAxiosErrorName {
  AxiosError = "AxiosError",
  AbortError = "AbortError",
}

export enum eLocalStorage {
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
}

export enum EFormMode {
  Edit = "Edit",
  Create = "Create",
}

export enum ERoles {
  Admin = "Admin",
  Agent = "Agent",
}
