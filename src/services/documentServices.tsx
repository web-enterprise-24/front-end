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

export const getMyDocuments = async () => {
 try {
  const res = await axios.get("/upload/myDocuments");

  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const getStudentDocuments = async () => {
 try {
  const res = await axios.get("/upload/myStudentsDocuments");

  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
