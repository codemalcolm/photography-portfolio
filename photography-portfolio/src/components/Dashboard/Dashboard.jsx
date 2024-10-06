import React, { useState } from 'react';
import { Box, Button, Text, VStack, Spinner, Image, Grid, Flex, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import useFetchCollections from '../../hooks/PhotoCollection/useFetchCollections';
import useFetchPhotosByIds from '../../hooks/useFetchPhotosByIds';
import useDeletePhoto from '../../hooks/Photos/useDeletePhoto';
import useEditPhoto from '../../hooks/Photos/useEditPhoto';
import useDeleteCollection from '../../hooks/PhotoCollection/useDeleteCollection';
import useEditCollection from '../../hooks/PhotoCollection/useEditCollection';
import useFetchCategories from '../../hooks/Category/useFetchCategories';
import useFetchCollectionsByCategory from '../../hooks/PhotoCollection/useFetchCollectionsByCategory';
import useDeleteCategory from '../../hooks/Category/useDeleteCategory';
import plusIcon from "../../assets/icons/plus-icon.svg"
import deleteIcon from "../../assets/icons/delete-icon.svg"
import editIcon from "../../assets/icons/pencil-icon.svg"
import AddCategoryForm from '../Category/AddCategoryForm';
import useAddCategory from '../../hooks/Category/useAddCategory';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controls the modal
  const { collections, loading: collectionsLoading, error: collectionsError } = useFetchCollections();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false); // Track if photos should be shown
  const { photos, loading: photosLoading, error: photosError } = useFetchPhotosByIds(
    selectedCollection ? selectedCollection.photos : []
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track selected category
  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories()
  const { collections: collectionsFromCategory, isLoading: collectionsFromCategoryLoading, error: collectionsFromCategoryError,fetchCollectionsByCategory } = useFetchCollectionsByCategory(selectedCategoryId);

  const { deletePhoto, deletePhotoFromCollection } = useDeletePhoto();
  const { editPhoto } = useEditPhoto();
  const { deleteCollection } = useDeleteCollection();
  const { editCollection } = useEditCollection();
  const { deleteCategory } = useDeleteCategory();

  const [editingPhoto, setEditingPhoto] = useState(null);
  const [newPhotoName, setNewPhotoName] = useState('');
  const [editingCollection, setEditingCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');

  

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleCollectionClick = (collection) => {
    if (selectedCollection?.id === collection.id) {
      setShowPhotos(!showPhotos); // Toggle photos display if the same collection is clicked
    } else {
      setSelectedCollection(collection);
      setShowPhotos(true); // Show photos for the new collection
    }
    setEditingPhoto(null); // Reset editing state if switching collections
  };

  const handleDelete = async (photoId, collectionId) => {
    try {
      await deletePhotoFromCollection(photoId,collectionId);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo.id);
    setNewPhotoName(photo.name); // Set current name as initial value
  };

  const handleEditSubmit = async (photoId) => {
    try {
      await editPhoto(photoId, { name: newPhotoName });
      setEditingPhoto(null); // Exit editing mode after saving
    } catch (error) {
      console.error("Error editing photo:", error);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this collection and all its photos?"
    );
    if (!confirmed) return;

    try {
      if (selectedCollection && selectedCollection.photos) {
        // Delete all photos in the collection
        for (let photoId of selectedCollection.photos) {
          await deletePhoto(photoId);
        }
      }
      await deleteCollection(collectionId);
      setSelectedCollection(null); // Reset selection after deletion
      setShowPhotos(false); // Hide photos after collection deletion
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const handleEditCollection = (collection) => {
    setEditingCollection(collection.id);
    setNewCollectionName(collection.name);
  };

  const handleEditCollectionSubmit = async (collectionId) => {
    try {
      await editCollection(collectionId, { name: newCollectionName });
      setEditingCollection(null); // Exit editing mode after saving
    } catch (error) {
      console.error("Error editing collection:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category, all its collections, and all photos within them?"
    );
    if (!confirmed) return;
    const collectionsInCategory = await fetchCollectionsByCategory(categoryId);

    try {
      // Fetch collections in the category on demand
      
      console.log(categoryId)

      if(!(collectionsInCategory === undefined)){
        // Loop through collections in the category
        for (let collection of collectionsInCategory) {
          if (collection.photos && collection.photos.length > 0) {

            // Delete all photos in the collection
            for (let photoId of collection.photos) {
              console.log(photoId)
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

  const handleAddCategory = () => {
    onOpen();
  };

  const { addCategory, loading, error, success } = useAddCategory();
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(
      {
        displayName: categoryName,
        order: 0, // Default order
        collections: [],
      },
      selectedImage
    );
    // Clear the input fields after submission
    setCategoryName("");
    setSelectedImage(null);
    onClose(); // Close modal after submission
  };

  return (
    <Box p={4} mt={"64px"}>
    <VStack>
      <Text fontSize="32px" mb={4}>DASHBOARD</Text>

      {collectionsLoading ? (
        <Spinner />
      ) : collectionsError ? (
        <Text color="red.500">{collectionsError}</Text>
      ) : (
        <VStack align="stretch" mb={8} >
          {/* Display collections */}
          <Flex justifyContent={"space-between"} alignItems={"end"}>
            <Text fontSize="24px" fontWeight={500}>Collections</Text>
            <Button borderRadius={"16px"} py={"16px"} px={"8px"}><Image alt="Add Icon" src={plusIcon}/></Button>
          </Flex>
          <Flex border={"1px solid black"} justifyContent={"center"} flexDirection={"column"}>
            {collections.map((collection) => (
              <Flex key={collection.id} alignItems="center" mb={4} >
                <Text flex="1" mr={"40px"}>{collection.name}</Text>
                <Button
                  onClick={() => handleCollectionClick(collection)}
                  colorScheme={selectedCollection?.id === collection.id ? 'green' : 'gray'}
                  mr={2}
                  isDisabled={collection.photos.length === 0} // Disable if no photos
                >
                  {showPhotos && selectedCollection?.id === collection.id ? 'Hide Photos' : 'Show Photos'}
                </Button>
                <Button onClick={() => handleEditCollection(collection)} mr={2}
                >
                  <Image src={editIcon} alt="Edit icon" m={"0 auto"}/>
                </Button>
                <Button colorScheme="red" onClick={() => handleDeleteCollection(collection.id)}>
                  <Image src={deleteIcon} alt="Delete icon" m={"0 auto"}/>
                </Button>
              </Flex>
            ))}
          </Flex>
            
          {/* Display photos in selected collection */}
          {selectedCollection && showPhotos && (
            <Box>
              <Text fontSize="2xl" mb={4}>
                Photos in {selectedCollection.name}
              </Text>

              {photosLoading ? (
                <Spinner />
              ) : photosError ? (
                <Text color="red.500">{photosError}</Text>
              ) : photos.length === 0 ? (
                <Text>No photos in this collection.</Text>
              ) : (
                <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>
                  {photos.map((photo) => (
                    <Box key={photo.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                      <Image src={photo.url} alt={photo.name} objectFit="cover" boxSize="150px" />
                      <Flex p={2} justifyContent={"space-between"} alignItems="center">
                        {/* Edit photo name */}
                        {editingPhoto === photo.id ? (
                          <>
                            <Input
                              value={newPhotoName}
                              onChange={(e) => setNewPhotoName(e.target.value)}
                              placeholder="Enter new name"
                            />
                            <Button onClick={() => handleEditSubmit(photo.id)}>Save</Button>
                            <Button onClick={() => setEditingPhoto(null)}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Text>{photo.name}</Text>
                            <Button onClick={() => handleEdit(photo)}>Edit</Button>
                          </>
                        )}
                        <Button colorScheme="red" onClick={() => handleDelete(photo.id, selectedCollection.id)}><Image src={deleteIcon} alt="delete icon"/></Button>
                      </Flex>
                    </Box>
                  ))}
                </Grid>
              )}
            </Box>
          )}

        {/* Display categories */}
        <Flex justifyContent={"space-between"} alignItems={"end"}>
            <Text fontSize="24px" fontWeight={500}>Categories</Text>
            <Button borderRadius={"16px"} py={"16px"} px={"8px"} onClick={handleAddCategory}><Image alt="Add Icon" src={plusIcon}/></Button>
          </Flex>
        {categoriesLoading ? (
          <Spinner />
        ) : categoriesError ? (
          <Text color="red.500">{categoriesError}</Text>
        ) : (
          <Flex justifyContent={"start"} flexDirection={"column"} border={"1px solid black"}>
            {categories.map(category => (
              <Flex key={category.id} justifyContent="space-between" mb={2}>
                <Button
                  onClick={() => handleCategoryClick(category.id)}
                  colorScheme={selectedCategoryId === category.id ? 'teal' : 'blue'}
                >
                  {category.displayName}
                </Button>
                <Button colorScheme="red" onClick={() => handleDeleteCategory(category.id)}>
                  <Image src={deleteIcon} alt="delete icon" m={"0 auto"}/>
                </Button>
              </Flex>
            ))}
          </Flex>
        )}

        {/* Add Category Modal  */}
        <Modal isOpen={isOpen} onClose={onClose}>
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
            >
              Add Category
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
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
              <Text fontSize="24px" fontWeight={500}>Collections in Selected Category</Text>

              {collectionsLoading ? (
                <Spinner />
              ) : collectionsError ? (
                <Text color="red.500">{collectionsError}</Text>
              ) : collectionsFromCategory.length === 0 ? (
                <Text color={"red"}>No collections found in this category.</Text>
              ) : (
                <Flex flexDirection={"column"}>
                  {collectionsFromCategory.map(collection => (
                    <Flex key={collection.id} align="center" mb={4}>
                      <Text flex="1">{collection.name}</Text>
                      {/* Add more actions like show photos, edit, delete if needed */}
                    </Flex>
                  ))}
                </Flex>
              )}
            </VStack>
        )}
        </VStack>
      )}
    </VStack>

      {/* Edit collection */}
      {editingCollection && (
        <Box mt={4}>
          <Text fontSize="xl" mb={2}>Edit Collection</Text>
          <Input
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Enter new collection name"
          />
          <Button onClick={() => handleEditCollectionSubmit(editingCollection)}>Save</Button>
          <Button onClick={() => setEditingCollection(null)}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
