import React, { useState } from 'react';
import { Box, Button, Text, VStack, Spinner, Image, Grid, Flex, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Textarea } from '@chakra-ui/react';
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
import useAddCategory from '../../hooks/Category/useAddCategory';
import useCategoryStore from '../../store/categoryStore';
import useAddPhotoCollection from '../../hooks/PhotoCollection/useAddPhotoCollection';
import useUploadPhotos from '../../hooks/Photos/useUploadPhotos';

const Dashboard = () => {
  
  const { createCategory } = useCategoryStore(); // Local states 
  const { isOpen: isAddCategoryOpen, onOpen: onAddCategoryOpen, onClose: onAddCategoryClose } = useDisclosure(); // Add Category Modal
  const { isOpen: isAddCollectionOpen, onOpen: onAddCollectionOpen, onClose: onAddCollectionClose } = useDisclosure(); // Add Collection Modal
  const { isOpen: isAddPhotosOpen, onOpen: onAddPhotosOpen, onClose: onAddPhotosClose } = useDisclosure(); // Add Photos Modal
  const { collections, loading: collectionsLoading, error: collectionsError } = useFetchCollections();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false); // Track if photos should be shown
  const { photos, loading: photosIdLoading, error: photosIdError } = useFetchPhotosByIds(
    selectedCollection ? selectedCollection.photos : []
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track selected category
  const [selectedFromModalCategoryId, setSelectedFromModalCategoryId] = useState(null); // Track selected category from modal
  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories()
  const { collections: collectionsFromCategory, isLoading: collectionsFromCategoryLoading, error: collectionsFromCategoryError,fetchCollectionsByCategory } = useFetchCollectionsByCategory(selectedCategoryId);

  const { deletePhoto, deletePhotoFromCollection } = useDeletePhoto();
  const { editPhoto } = useEditPhoto();
  const { deleteCollection } = useDeleteCollection();
  const { editCollection } = useEditCollection();
  const { deleteCategory } = useDeleteCategory();

  const [bigFiles, setBigFiles] = useState([]); // Store big images
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [newPhotoName, setNewPhotoName] = useState('');
  const [editingCollection, setEditingCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState('')

  

  const handleCategoryClickModal = (categoryId) => {
    setSelectedFromModalCategoryId(categoryId);
  };

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
    onAddCategoryOpen();
  };

  const handleAddColllection = () => {
    onAddCollectionOpen();
  };

  const handleAddPhotos = (id) =>{
    setSelectedCollectionId(id)
    onAddPhotosOpen();

  }

  const { addCategory, loading, error, success } = useAddCategory();
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Handle form submission
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

    if(addedCategory){
      createCategory(addedCategory); // Update the Zustand store with the new category
      setCategoryName("");  // Clear form
      setSelectedImage(null); // Clear form
      onAddCategoryOpen(); // Close modal after submission
    }

  };

  const { addPhotoCollection, loading: addingCollection, error: addError, success: addSuccess } = useAddPhotoCollection();
  const { categories: categoriesFetched, loading: fetchingCategories, error: fetchError } = useFetchCategories();

  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');

  const handleSubmitCollection = (e) => {
    e.preventDefault();
    addPhotoCollection(selectedFromModalCategoryId, {
      name: collectionName,
      description: collectionDescription,
      photos: [] // Start with an empty photos array
    });

    // Clear the input fields after submission
    setCollectionName('');
    setCollectionDescription('');
  };

  // Photo uploading
  const { uploadPhotos, loading: photosLoading, error : photosError, success: photosSuccess } = useUploadPhotos();
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);

  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setNames(new Array(selectedFiles.length).fill('')); // Initialize names array with empty strings
    setCurrentNameIndex(0);
  };

  const handleBigFileChange = (e) => {
		const selectedBigFiles = Array.from(e.target.files);
		setBigFiles(selectedBigFiles);
	};


  const handleNameChange = (e) => {
    const updatedNames = [...names];
    updatedNames[currentNameIndex] = e.target.value;
    setNames(updatedNames);
  };

  const handleNextName = () => {
    setCurrentNameIndex((prevIndex) => Math.min(prevIndex + 1, files.length - 1));
  };

  const handlePreviousName = () => {
    setCurrentNameIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmitPhotos = async (e) => {
		e.preventDefault();
		if (selectedCollectionId && bigFiles.length === files.length) { // Ensure big images match small images
			const uploadedPhotos = await uploadPhotos(
				files,
				bigFiles,
				names,
				selectedCollectionId
			);
			if (uploadedPhotos) {
				onAddPhotosClose(); // Close modal after submission
			}
		} else {
			alert("Please select a collection and ensure both small and big images match!");
		}
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
        <VStack align="stretch" marginBottom={8} >
          {/* Display collections */}
          <Flex justifyContent={"space-between"} alignItems={"end"}>
            <Text fontSize="24px" fontWeight={500}>Collections</Text>
            <Button borderRadius={"16px"} py={"16px"} px={"8px"} onClick={handleAddColllection}><Image alt="Add Icon" src={plusIcon}/></Button>
          </Flex>
          <Flex justifyContent={"center"} flexDirection={"column"} gap={"4px"}>
            {collections.map((collection) => (
              <Flex key={collection.id} alignItems="center" border={"gray 1px solid"} p={"4px"}>
                <Text flex="1" mr={"40px"}>{collection.name}</Text>
                <Button
                  onClick={() => handleCollectionClick(collection)}
                  colorScheme= {showPhotos && selectedCollection?.id === collection.id ? 'green' : 'gray'}
                  mr={2}
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

          {/* Add Collection Modal */}
          <Modal isOpen={isAddCollectionOpen} onClose={onAddCollectionClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Photo Collection</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                {fetchingCategories ? (
                  <Spinner size="lg" />
                ) : fetchError ? (
                  <Text color="red.500">Error fetching categories: {fetchError}</Text>
                ) : (
                  <Box mb={4}>
                    <Text mb={2}>Select Category:</Text>
                    <Box mb={4}>
                      {categoriesFetched.map(category => (
                        <Button
                          key={category.id}
                          onClick={() => handleCategoryClickModal(category.id)}
                          colorScheme={selectedFromModalCategoryId === category.id ? 'teal' : 'blue'}
                          mr={2}
                        >
                          {category.displayName}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                )}

                <form onSubmit={handleSubmitCollection}>
                  <Box mb={4}>
                    <Text mb={2}>Collection Name:</Text>
                    <Input
                      type="text"
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      required
                    />
                  </Box>

                  <Box mb={4}>
                    <Text mb={2}>Collection Description (optional):</Text>
                    <Textarea
                      value={collectionDescription}
                      onChange={(e) => setCollectionDescription(e.target.value)}
                    />
                  </Box>

                  <Button type="submit" isLoading={addingCollection} loadingText="Adding...">
                    Add Collection
                  </Button>
                </form>

                {addError && (
                  <Text color="red.500" mt={4}>
                    {addError}
                  </Text>
                )}
                {addSuccess && (
                  <Text color="green.500" mt={4}>
                    Collection added successfully!
                  </Text>
                )}
              </ModalBody>

              <ModalFooter>
                <Button onClick={onAddCollectionClose} colorScheme="gray">Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
            
          {/* Display photos in selected collection */}
          {selectedCollection && showPhotos && (
            <Box>
            <Flex justifyContent={"space-between"}>
              <Flex fontSize="2xl" mb={4} gap={2}>
                <Text>Photos in</Text> <Text fontWeight={"700"}>{selectedCollection.name}</Text>
              </Flex>
              <Button borderRadius={"16px"} py={"16px"} px={"8px"} onClick={() => {handleAddPhotos(selectedCollection.id)}}><Image alt="Add Icon" src={plusIcon}/></Button>
            </Flex>
              

              {photosIdLoading ? (
                <Spinner />
              ) : photosIdError ? (
                <Text color="red.500">{photosError}</Text>
              ) : photos.length === 0 ? (
                <Text color={"orange.400"}>No photos in this collection.</Text>
              ) : (
                <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>
                  {photos.map((photo) => (
                    <Box key={photo.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                      <Image src={photo.url.small} alt={photo.name} objectFit="cover" boxSize="150px" />
                      <Flex p={2} justifyContent={"space-between"} alignItems="center" >
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
          
          {/* Modal for uploading photos */}
          <Modal isOpen={isAddPhotosOpen} onClose={photosLoading ? undefined : onAddPhotosClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Upload Photos</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmitPhotos}>
							{/* Collection Selection */}
							<Box mb={4}>
								<Text fontSize="xl" mb={2}>Select a Collection:</Text>
								{collectionsLoading ? (
									<Spinner />
								) : collectionsError ? (
									<Text color="red.500">{collectionsError}</Text>
								) : (
									<Text>
										{collections.map((collection) => (
											<Button
												m={"2px"}
												key={collection.id}
												onClick={() => setSelectedCollectionId(collection.id)}
												colorScheme={selectedCollectionId === collection.id ? "blue" : "gray"}
											>
												{collection.name}
											</Button>
										))}
									</Text>
								)}
							</Box>

							{/* Small File Input */}
							<Box mb={4}>
								<Text>Small images (mobile)</Text>
								<Input type="file" multiple accept="image/*" onChange={handleFileChange} />
							</Box>

							{/* Big File Input */}
							<Box mb={4}>
								<Text>Big images</Text>
								<Input type="file" multiple accept="image/*" onChange={handleBigFileChange} />
							</Box>

							{/* Name input for each photo */}
							{files.length > 0 && (
								<VStack spacing={4} mb={4}>
									<Text>Enter names for the photos:</Text>
									<Box>
										<Text mb={2}>Current Photo:</Text>

										{/* Show the image preview */}
										<Image
											src={URL.createObjectURL(files[currentNameIndex])}
											alt={files[currentNameIndex]?.name}
											boxSize="200px"
											objectFit="cover"
											mb={2}
										/>

										{/* File name */}
										<Text>{files[currentNameIndex]?.name}</Text>

										{/* Name input */}
										<Input
											type="text"
											value={names[currentNameIndex] || ""}
											onChange={handleNameChange}
											placeholder="Enter photo name"
										/>
									</Box>

									<Box>
										<Button onClick={handlePreviousName} isDisabled={currentNameIndex === 0} mr={2}>Previous</Button>
										<Button onClick={handleNextName} isDisabled={currentNameIndex === files.length - 1}>Next</Button>
									</Box>
								</VStack>
							)}

							<Button type="submit" isLoading={photosLoading} loadingText="Uploading...">Upload Photos</Button>

							{photosError && (
								<Text color="red.500" mt={4}>{photosError}</Text>
							)}
							{photosSuccess && (
								<Text color="green.500" mt={4}>Photos uploaded successfully!</Text>
							)}
						</form>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onAddPhotosClose} isDisabled={photosLoading}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

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
          <Flex justifyContent={"start"} flexDirection={"column"} gap={"4px"}>
            {categories.map(category => (
              <Flex key={category.id} justifyContent="space-between" alignItems="center" border={"gray 1px solid"} p={"4px"}>
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
              isDisabled={ success ? true : false}
            >
              Add Category
            </Button>
            <Button variant="ghost" onClick={onAddCategoryClose}>
            { success ? "Finish" : "Close"}
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

              {collectionsFromCategoryLoading ? (
                <Spinner />
              ) : collectionsFromCategoryError ? (
                <Text color="red.500">{collectionsFromCategoryError}</Text>
              ) : collectionsFromCategory === undefined ? (
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
