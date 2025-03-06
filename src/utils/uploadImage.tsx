import axios from "axios";

const uploadImage = async (file: File) => {
 try {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  const response = await axios.post(
   `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_NAME
   }/image/upload`,
   formData
  );

  // Get the URL of the uploaded image
  const uploadedUrl = response.data.secure_url;
  return uploadedUrl;
 } catch (err) {
  console.log(err);
 }
};

export default uploadImage;
