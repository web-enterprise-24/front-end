import { isAxiosError } from "axios";
import { axios } from "../utils";

export const getProvinces = async () => {
 try {
  const res = await axios.get("https://provinces.open-api.vn/api");
  return res.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
