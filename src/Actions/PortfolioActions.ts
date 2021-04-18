import { getState } from "litsy";
import { config } from "../Config";
import axios from "axios";
import { checkToken } from "./AuthActions";
import { IPortfolioItemsList } from "../Models/IPortfolioItemsList";

const { PORTFOLIO_SERVER_ENDPOINT: portfolio } = config;

export const uploadItem = async (
  imageData: string,
  markdown: string,
): Promise<boolean> => {
  if (await checkToken()) {
    const result = await axios.post<IPortfolioItemsList>(
      `${portfolio}/post`,
      {
        item: {
          markdown
        },
        portfolioImageBase64: imageData,
      },
      {
        headers: {
          Authorization: getState("mohammad.dev.auth.authToken", "persist"),
        },
      }
    );
    return result.status === 201;
  }
  return false;
};

export const getAllItems = async (): Promise<IPortfolioItemsList | null> => {
  var result = await axios.post<IPortfolioItemsList>(`${portfolio}/posts`);
  return result.status === 200 ? result.data : null;
};
