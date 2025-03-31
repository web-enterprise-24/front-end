import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import uploadImage from '../../utils/uploadImage';

type RichTextEditorProps = {
	value?: string;
	onChange: (content: string) => void;
};

// Define BlobInfo type based on TinyMCE's expected structure
interface BlobInfo {
	blob: () => Blob;
	filename: () => string;
}

const RichTextEditor = ({ value = '', onChange }: RichTextEditorProps) => {
	const editorRef = useRef<TinyMCEEditor | null>(null);
	// Image upload handler
	const handleImageUpload = async (blobInfo: BlobInfo): Promise<string> => {
		try {
			// Convert blob to File object with proper filename
			const file = new File([blobInfo.blob()], blobInfo.filename(), {
				type: blobInfo.blob().type,
			});

			// Use your existing uploadImage utility
			const imageUrl = await uploadImage(file);

			if (!imageUrl) {
				throw new Error('Image URL is undefined');
			}

			return imageUrl;
		} catch (error) {
			console.error('Image upload failed:', error);
			throw new Error(
				'Image upload failed: ' +
					(error instanceof Error ? error.message : 'Unknown error')
			);
		}
	};

	return (
		<Editor
			apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
			onInit={(_, editor) => (editorRef.current = editor)}
			value={value}
			init={{
				height: 700,
				menubar: false,
				plugins: [
					'advlist',
					'autolink',
					'lists',
					'link',
					'image',
					'charmap',
					'preview',
					'anchor',
					'searchreplace',
					'visualblocks',
					'code',
					'fullscreen',
					'insertdatetime',
					'media',
					'table',
					'code',
					'help',
					'wordcount',
				],
				toolbar:
					'undo redo | formatselect | ' +
					'bold italic backcolor | alignleft aligncenter ' +
					'alignright alignjustify | bullist numlist outdent indent | ' +
					'removeformat | image | help',
				content_style:
					'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				// Image upload settings
				images_upload_handler: handleImageUpload,
				automatic_uploads: true,
				file_picker_types: 'image',
				// Optional: Add image editing tools
				image_advtab: true,
				// Optional: Set image dimensions
				image_dimensions: false,
			}}
			onEditorChange={(content) => onChange(content)}
		/>
	);
};

export default RichTextEditor;
