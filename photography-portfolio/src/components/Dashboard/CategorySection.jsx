import React, { useState } from "react";
import {
	Box,
	Button,
	Text,
	VStack,
	Spinner,
	Image,
	Flex,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@chakra-ui/react";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import editIcon from "../../assets/icons/pencil-icon.svg";
import plusIcon from "../../assets/icons/plus-icon.svg";
import useFetchCategories from "../../hooks/Category/useFetchCategories";
import useFetchCollectionsByCategory from "../../hooks/PhotoCollection/useFetchCollectionsByCategory";
import useDeleteCollection from "../../hooks/PhotoCollection/useDeleteCollection";
import useDeletePhoto from "../../hooks/Photos/useDeletePhoto";
import useCategoryStore from "../../store/categoryStore";
import useAddCategory from "../../hooks/Category/useAddCategory";

const CategorySection = () => {
	const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track selected category
	const [categoryName, setCategoryName] = useState(""); // Category name state for creating
	const { deletePhoto, deletePhotoFromCollection } = useDeletePhoto(); // Deleting photo
	const { deleteCollection } = useDeleteCollection(); // Deleting
	const [selectedImage, setSelectedImage] = useState(null); // Category image state for creating
	const { createCategory } = useCategoryStore(); // TODO Local states
        const [editingCollection, setEditingCollection] = useState(null);// State for editting collections names
    

	const { addCategory, loading, error, success } = useAddCategory(); // Adding category

	const {
		isOpen: isAddCategoryOpen,
		onOpen: onAddCategoryOpen,
		onClose: onAddCategoryClose,
	} = useDisclosure(); // Add Category Modal

	const {
		categories,
		loading: categoriesLoading,
		error: categoriesError,
	} = useFetchCategories(); // Fetching all categories

	const {
		collections: collectionsFromCategory,
		isLoading: collectionsFromCategoryLoading,
		error: collectionsFromCategoryError,
		fetchCollectionsByCategory,
	} = useFetchCollectionsByCategory(selectedCategoryId); // Fetching collections by category id
	// Opening MODAL for creating category
	const handleAddCategory = () => {
		onAddCategoryOpen();
	};
	// Function for setting which category is clicked in dashboard
	const handleCategoryClick = (categoryId) => {
		setSelectedCategoryId(categoryId);
	};

	// handling deleting category with all the collections and all the photos
	const handleDeleteCategory = async (categoryId) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this category, all its collections, and all photos within them?"
		);
		if (!confirmed) return;
		const collectionsInCategory = await fetchCollectionsByCategory(categoryId);

		try {
			// Fetch collections in the category on demand

			console.log(categoryId);

			if (!(collectionsInCategory === undefined)) {
				// Loop through collections in the category
				for (let collection of collectionsInCategory) {
					if (collection.photos && collection.photos.length > 0) {
						// Delete all photos in the collection
						for (let photoId of collection.photos) {
							console.log(photoId);
							await deletePhoto(photoId);
						}
					}
					// Delete the collection
					await deleteCollection(collection.id);
				}
			}

			// Finally, delete the category itself
			await deleteCategory(categoryId);
			setSelectedCategoryId(null); // Reset category selection if deleted
		} catch (error) {
			console.error("Error deleting category:", error);
		}
	};

	// Handle image selection for category
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setSelectedImage(file);
	};

	// Handle create category form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		const addedCategory = await addCategory(
			{
				displayName: categoryName,
				order: 0, // Default order
				collections: [],
			},
			selectedImage
		);

		if (addedCategory) {
			createCategory(addedCategory); // Update the Zustand store with the new category
			setCategoryName(""); // Clear form
			setSelectedImage(null); // Clear form
			onAddCategoryOpen(); // Close modal after submission
		}
	};
	return (
		<>
			{/* Display categories */}
			<Flex justifyContent={"space-between"} alignItems={"end"} align={"stretch"} width={"100%"}>
				<Text fontSize="24px" fontWeight={500}>
					Categories
				</Text>
				<Button
					borderRadius={"16px"}
					py={"16px"}
					px={"8px"}
					onClick={handleAddCategory}
				>
					<Image alt="Add Icon" src={plusIcon} />
				</Button>
			</Flex>
			{categoriesLoading ? (
				<Spinner />
			) : categoriesError ? (
				<Text color="red.500">{categoriesError}</Text>
			) : (
				<Flex justifyContent={"start"} flexDirection={"column"} gap={"4px"} align={"stretch"} width={"100%"}>
					{categories.map((category) => (
						<Flex
							key={category.id}
							justifyContent="space-between"
							alignItems="center"
							border={"gray 1px solid"}
							p={"4px"}
						>
							<Button
								onClick={() => handleCategoryClick(category.id)}
								colorScheme={
									selectedCategoryId === category.id ? "teal" : "blue"
								}
							>
								{category.displayName}
							</Button>
							<Button
								colorScheme="red"
								onClick={() => handleDeleteCategory(category.id)}
							>
								<Image src={deleteIcon} alt="delete icon" m={"0 auto"} />
							</Button>
						</Flex>
					))}
				</Flex>
			)}

			{/* Add Category Modal  */}
			<Modal isOpen={isAddCategoryOpen} onClose={onAddCategoryClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add New Category</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box>
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
									<Input
										type="file"
										accept="image/*"
										onChange={handleImageChange}
									/>
								</Box>
							</form>
						</Box>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={handleSubmit}
							isLoading={loading}
							isDisabled={success ? true : false}
						>
							Add Category
						</Button>
						<Button variant="ghost" onClick={onAddCategoryClose}>
							{success ? "Finish" : "Close"}
						</Button>
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
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Display collections for the selected category */}
			{selectedCategoryId && (
				<VStack align="stretch" mt={8}>
					<Text fontSize="24px" fontWeight={500}>
						Collections in Selected Category
					</Text>

					{collectionsFromCategoryLoading ? (
						<Spinner />
					) : collectionsFromCategoryError ? (
						<Text color="red.500">{collectionsFromCategoryError}</Text>
					) : collectionsFromCategory === undefined ? (
						<Text color={"red"}>No collections found in this category.</Text>
					) : (
						<Flex flexDirection={"column"}>
							{collectionsFromCategory.map((collection) => (
								<Flex key={collection.id} align="center" mb={4}>
									<Text flex="1">{collection.name}</Text>
									{/* Add more actions like show photos, edit, delete if needed */}
								</Flex>
							))}
						</Flex>
					)}
				</VStack>
			)}
            {/* Edit collection */}
			{editingCollection && (
				<Box mt={4}>
					<Text fontSize="xl" mb={2}>
						Edit Collection
					</Text>
					<Input
						value={newCollectionName}
						onChange={(e) => setNewCollectionName(e.target.value)}
						placeholder="Enter new collection name"
					/>
					<Button onClick={() => handleEditCollectionSubmit(editingCollection)}>
						Save
					</Button>
					<Button onClick={() => setEditingCollection(null)}>Cancel</Button>
				</Box>
			)}
		</>
	);
};

export default CategorySection;
