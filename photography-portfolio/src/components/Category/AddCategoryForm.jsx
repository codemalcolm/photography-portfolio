import React, { useState } from "react";
import useAddCategory from "../../hooks/Category/useAddCategory";
import { Box, Button, Input, Text } from "@chakra-ui/react";

const AddCategoryForm = () => {
	const { addCategory, loading, error, success } = useAddCategory(); // Destructure the hook's values
	const [categoryName, setCategoryName] = useState("");

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		// Call the addCategory function from the custom hook
		addCategory({
			displayName: categoryName,
			order: 0, // Default order (you can let the client choose)
			collections: [], // Empty on default
		});

		// Clear the input fields after submission
		setCategoryName("");
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
