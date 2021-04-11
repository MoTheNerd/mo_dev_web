export interface AuthToken {
  id: number
  token: string
  timeStamp: Date
}
export interface IValidatedAuthResult {
  isAuthenticated: boolean
  authToken: AuthToken
}