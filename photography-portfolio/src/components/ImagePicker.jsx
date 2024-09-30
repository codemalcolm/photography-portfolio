import { Text, Button, Flex, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { color } from "framer-motion";
import useUploadImages from "../hooks/useUploadImages";
import AddPhotoCollectionForm from "./PhotoCollection/AddPhotoCollectionForm";
import UploadPhotosForm from "./PhotoCollection/UploadPhotosForm";
import Dashboard from "./Dashboard/Dashboard";
import AddCategoryForm from "./Category/AddCategoryForm";

const ImagePicker = () => {
	const fileRef = useRef(null);
	const [inputs, setInputs] = useState({
		category: "",
		name: "",
	});
	const { uploadImages, isUpdating } = useUploadImages();
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

	const handleClick = async () => {
		try {
			await uploadImages(inputs, selectedFile);
			setSelectedFile(null);
		} catch (error) {
			console.log("Error", error.message, "error");
		}
	};

	return (
		<Flex
			mt={64}
			width={"560px"}
			flexDirection={"column"}
			alignItems={"center"}
			bg="white"
		>
			<Dashboard/>
			{/* Add Category */}
			<AddCategoryForm />
			{/* Add Photo collection */}
			<AddPhotoCollectionForm />
			{/* Add Photos to collection */}
			<UploadPhotosForm />
		</Flex>
	);
};

export default ImagePicker;
