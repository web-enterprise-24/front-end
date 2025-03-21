import axios from 'axios';

const uploadImage = async (audioBlob: Blob) => {
	try {
		const file = new File(
			[audioBlob],
			`meeting-recording-${new Date().toISOString()}.webm`,
			{
				type: 'audio/webm',
			}
		);

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

		const response = await axios.post(
			`https://api.cloudinary.com/v1_1/${
				import.meta.env.VITE_CLOUDINARY_NAME
			}/auto/upload`,
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
