import { Text, Button, Flex, Input, Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { color } from "framer-motion";
import useUploadImages from "../hooks/useUploadImages";
import AddPhotoCollectionForm from "./PhotoCollection/AddPhotoCollectionForm";
import Dashboard from "./Dashboard/Dashboard";
import AddCategoryForm from "./Category/AddCategoryForm";
import Test from "./TestImagePicker";

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
		<Box
			width={"100%"}
			minHeight={"calc(100vh - 64px)"}
			height={"100%"}
			bg="white"

		>
			<Dashboard />
			{/* <Test /> */}
		</Box>
	);
};

export default ImagePicker;
