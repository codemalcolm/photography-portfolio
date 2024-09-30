import React, { useState } from "react";
import useAddCategory from "../../hooks/Category/useAddCategory";
import { Box, Button, Input, Text } from "@chakra-ui/react";

const AddCategoryForm = () => {
	const { addCategory, loading, error, success } = useAddCategory();
	const [categoryName, setCategoryName] = useState("");
	const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
  
	// Handle image selection
	const handleImageChange = (e) => {
	  const file = e.target.files[0];
	  setSelectedImage(file);
	};
  
	// Handle form submission
	const handleSubmit = (e) => {
	  e.preventDefault();
  
	  // Call the addCategory function from the custom hook with the selected image
	  addCategory({
		displayName: categoryName,
		order: 0, // Default order (you can let the client choose)
		collections: [], // Empty on default
	  }, selectedImage); // Pass the image file to the hook
  
	  // Clear the input fields after submission
	  setCategoryName("");
	  setSelectedImage(null);
	};
  
	return (
	  <Box>
		<Text fontSize="2xl" mb={4}>
		  Add New Category
		</Text>
  
		<form onSubmit={handleSubmit}>
		  <Box mb={4}>
			<Text mb={2}>Category Name:</Text>
			<Input
			  type="text"
			  value={categoryName}
			  onChange={(e) => setCategoryName(e.target.value)}
			  required
			/>
		  </Box>
  
		  <Box mb={4}>
			<Text mb={2}>Category Image:</Text>
			<Input type="file" accept="image/*" onChange={handleImageChange} />
		  </Box>
  
		  <Button type="submit" isLoading={loading} loadingText="Adding...">
			Add Category
		  </Button>
		</form>
  
		{error && (
		  <Text color="red.500" mt={4}>
			{error}
		  </Text>
		)}
		{success && (
		  <Text color="green.500" mt={4}>
			Category added successfully!
		  </Text>
		)}
	  </Box>
	);
  };
  
  export default AddCategoryForm;
