import { getState, setState } from "litsy";
import { config } from "../Config";
import axios from "axios";
import { IValidatedAuthResult } from "../Models/IValidatedAuthResult";

const { AUTH_SERVER_ENDPOINT: auth } = config;

export const checkToken = async (
  shouldNavigateToLogin: boolean = false
): Promise<boolean> => {
  const token = getState("mohammad.dev.auth.authToken", "persist");
  const result = await axios.get<IValidatedAuthResult>(
    `${auth}/validate/${token}`
  );
  if (result.data.isAuthenticated) {
    return true;
  }
  logout(shouldNavigateToLogin);
  return false;
};
export const logout = (shouldNavigateToLogin: boolean = true) => {
  setState("mohammad.dev.auth.authToken", null, "persist");
  if (shouldNavigateToLogin) {
    window.location.assign("/login");
  }
};
