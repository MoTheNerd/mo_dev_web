import { getState } from "litsy";
import { config } from "../Config";
import axios from "axios";
import { checkToken } from "./AuthActions";
import { IPhotographyItemsList } from "../Models/IPhotographyItem";

const { PHOTOGRAPHY_SERVER_ENDPOINT: photography } = config;

export const uploadImage = async (
  imageData: string,
  iso: string,
  aperture: string,
  focalLength: string,
  shutterSpeed: string,
  location: string,
  time: string
): Promise<boolean> => {
  if (await checkToken()) {
    const result = await axios.post<IPhotographyItemsList>(
      `${photography}/post`,
      {
        photograph: {
          iso,
          aperture,
          focalLength,
          shutterSpeed,
          location,
          time,
        },
        photographImageBase64: imageData,
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

export const getAllImages = async (): Promise<IPhotographyItemsList | null> => {
  var result = await axios.post<IPhotographyItemsList>(`${photography}/posts`);
  return result.status === 200 ? result.data : null;
};
