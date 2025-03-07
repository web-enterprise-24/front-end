import { isAxiosError } from "axios";
import axiosOriginal from "axios";

export const getProvinces = async () => {
 try {
  const res = await axiosOriginal.get("https://provinces.open-api.vn/api");
  return res.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
