import { isAxiosError } from "axios";
import { axios } from "../utils";

export const uploadDocument = async (data: FormData) => {
 try {
  await axios.post("/upload", data, {
   headers: {
    "Content-Type": "multipart/form-data",
   },
  });
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const getMyDocuments = async (link: string) => {
 try {
  const res = await axios.get(link ? link : "/upload/myDocuments");

  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const getStudentDocuments = async (link: string) => {
 try {
  const res = await axios.get(link ? link : "/upload/myStudentsDocuments");

  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
