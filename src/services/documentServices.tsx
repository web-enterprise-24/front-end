import { isAxiosError } from "axios";
import { axios } from "../utils";

export const uploadDocument = async (data: FormData, token: string | null) => {
 try {
  await axios.post("/upload", data, {
   headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const getMyDocuments = async (token: string | null) => {
 try {
  const res = await axios.get("/upload/myDocuments", {
   headers: {
    Authorization: `Bearer ${token}`,
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });

  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const getStudentDocuments = async (token: string | null) => {
 try {
  const res = await axios.get("/upload/myStudentsDocuments", {
   headers: {
    Authorization: `Bearer ${token}`,
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });

  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
