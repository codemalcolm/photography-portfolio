import useFetchCollections from "../../hooks/PhotoCollection/useFetchCollections";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import plusIcon from "../../assets/icons/plus-icon.svg";
import { useEffect, useState } from "react";
import useDeleteCollection from "../../hooks/PhotoCollection/useDeleteCollection";
import useDeletePhoto from "../../hooks/Photos/useDeletePhoto";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import editIcon from "../../assets/icons/pencil-icon.svg";
import useFetchCategories from "../../hooks/Category/useFetchCategories";
import useAddPhotoCollection from "../../hooks/PhotoCollection/useAddPhotoCollection";
import useFetchPhotosByIds from "../../hooks/useFetchPhotosByIds";
import useEditPhoto from "../../hooks/Photos/useEditPhoto";
import useUploadPhotos from "../../hooks/Photos/useUploadPhotos";
import UploadPhotos from "./UploadPhotos";
import useEditCollection from "../../hooks/PhotoCollection/useEditCollection";
import { useInstantTransition } from "framer-motion";
import { useCollectionStore } from "../../store/useCollectionStore";

const CollectionsSection = () => {
  const [showPhotos, setShowPhotos] = useState(false); // Track if photos should be shown
  const [selectedCollection, setSelectedCollection] = useState(null); // Track selected collection
  const [editingPhoto, setEditingPhoto] = useState(null); // State for editting photo names
  const [editingCollection, setEditingCollection] = useState(null); // State for editting collections names
  const [newCollectionName, setNewCollectionName] = useState(""); // New collection name
  const [selectedFromModalCategoryId, setSelectedFromModalCategoryId] =
    useState(null); // Track selected category from modal
  const [collectionName, setCollectionName] = useState(""); // State for collection name
  const [collectionDescription, setCollectionDescription] = useState(""); // State for collection description
  const [selectedCollectionId, setSelectedCollectionId] = useState(""); // Storing id of last clicked collection
  const [newPhotoName, setNewPhotoName] = useState(""); // New photo name
  // State for editing photo order and new order value
  const [editingOrder, setEditingOrder] = useState(null); // photo ID being edited
  const [newOrder, setNewOrder] = useState(""); // new order value being input

  const {
    photos,
    loading: photosIdLoading,
    error: photosIdError,
  } = useFetchPhotosByIds(selectedCollection ? selectedCollection.photos : []); // fetching photos by ids

  // Photo uploading
  const {
    uploadPhotos,
    loading: photosLoading,
    error: photosError,
    success: photosSuccess,
    success: addSuccess,
  } = useUploadPhotos();

  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useCollectionStore();

  const { fetchCollections } = useFetchCollections(); // Fetching all existing collections

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const {
    categories: categoriesFetched,
    loading: fetchingCategories,
    error: fetchError,
  } = useFetchCategories(); // Fetching all existing categories

  const { addPhotoCollection } = useAddPhotoCollection(); // Adding a new collection

  const { editPhoto } = useEditPhoto(); // Editting photo name

  const {
    isOpen: isAddPhotosOpen,
    onOpen: onAddPhotosOpen,
    onClose: onAddPhotosClose,
  } = useDisclosure(); // Add Photos Modal

  const {
    isOpen: isAddCollectionOpen,
    onOpen: onAddCollectionOpen,
    onClose: onAddCollectionClose,
  } = useDisclosure(); // Add Collection Modal

  // Opening MODAL for creating collection
  const handleAddCollection = () => {
    onAddCollectionOpen();
  };

  const { editCollection } = useEditCollection(); // Editting collection name

  const { deleteCollection } = useDeleteCollection(); // Deleting collection

  // Function for setting which collection is clicked in dashboard
  const handleCollectionClick = (collection) => {
    if (selectedCollection?.id === collection.id) {
      setShowPhotos(!showPhotos); // Toggle photos display if the same collection is clicked
    } else {
      setSelectedCollection(collection);
      setShowPhotos(true); // Show photos for the new collection
    }
    setEditingPhoto(null); // Reset editing state if switching collections
  };

  // handling editing collection name
  const handleEditCollection = (collection) => {
    setEditingCollection(collection.id);
    setNewCollectionName(collection.name);
  };

  const { deletePhoto, deletePhotoFromCollection } = useDeletePhoto(); // Deleting photo

  // handling deleting collection and all it's photos
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

  // Function for setting which category is clicked in modal
  const handleCategoryClickModal = (categoryId) => {
    setSelectedFromModalCategoryId(categoryId);
  };

  // Handling submitting create collection form
  const handleSubmitCollection = (e) => {
    e.preventDefault();

    addPhotoCollection(selectedFromModalCategoryId, {
      name: collectionName,
      description: collectionDescription,
      photos: [], // Start with an empty photos array
    });

    // Clear the input fields after submission
    setCollectionName("");
    setCollectionDescription("");
    setSelectedFromModalCategoryId("");

    onAddCollectionClose();
  };

  // Opening MODAL for adding photos
  const handleAddPhotos = (id) => {
    setSelectedCollectionId(id);
    onAddPhotosOpen();
  };

  // handling editting submit
  const handleEditSubmit = async (photoId) => {
    try {
      await editPhoto(photoId, { name: newPhotoName, order: newOrder });
      setEditingPhoto(null); // Exit editing mode after saving
    } catch (error) {
      console.error("Error editing photo:", error);
    }
  };

  // handling editing photo name
  const handleEdit = (photo) => {
    setEditingPhoto(photo.id);
    setNewPhotoName(photo.name); // Set current name as initial value
  };

  // handling deleting photo from collection
  const handleDelete = async (photoId, collectionId) => {
    try {
      await deletePhotoFromCollection(photoId, collectionId);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  // handling editing collection submit
  const handleEditCollectionSubmit = async (collectionId) => {
    try {
      await editCollection(collectionId, { name: newCollectionName });
      setEditingCollection(null); // Exit editing mode after saving

      // reset inputs
      setNewCollectionName("");
    } catch (error) {
      console.error("Error editing collection:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCollection(null); // Reset editingCollection state
  };

  const sortedPhotos = photos.sort((a, b) => a.order - b.order);

  const [orderValues, setOrderValues] = useState({}); // Store each photo's order

  const handleEditOrder = (photoId, currentOrder) => {
    setEditingOrder(photoId);
    setNewOrder(currentOrder);
  };

  const handleOrderSave = (photoId) => {
    const updatedPhotos = photos.map((photo) => {
      if (photo.id === photoId) {
        return { ...photo, order: newOrder }; // Update order value
      }
      return photo;
    });

    setEditingOrder(null); // Reset editing state
    setNewOrder(""); // Clear the order input field
  };

  return (
    <>
      {collectionsLoading ? (
        <Spinner />
      ) : collectionsError ? (
        <Text color="red.500">{collectionsError}</Text>
      ) : (
        <VStack
          align="stretch"
          marginBottom={8}
          width={"100%"}
          justifyContent={"center"}
        >
          {/* Display collections */}
          <Flex justifyContent={"space-between"} alignItems={"end"}>
            <Text fontSize="24px" fontWeight={500}>
              Collections
            </Text>
            <Button
              borderRadius={"16px"}
              py={"16px"}
              px={"8px"}
              onClick={handleAddCollection}
            >
              <Image alt="Add Icon" src={plusIcon} />
            </Button>
          </Flex>
          <Flex justifyContent={"center"} flexDirection={"column"} gap={"4px"}>
            {collections.map((collection) => (
              <Flex
                key={collection.id}
                alignItems="center"
                border={"gray 1px solid"}
                p={"4px"}
                // justifyContent={"space-between"}
              >
                {/* Collection Name or Input Field */}
                {editingCollection === collection.id ? (
                  <Input
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Enter new collection name"
                    flex="1"
                    mr={4}
                  />
                ) : (
                  <Text flex="1" mr={"40px"}>
                    {collection.name}
                  </Text>
                )}

                {/* Buttons */}
                <Button
                  onClick={() => handleCollectionClick(collection)}
                  colorScheme={
                    showPhotos && selectedCollection?.id === collection.id
                      ? "green"
                      : "gray"
                  }
                  mr={2}
                  minW={"150px"}
                >
                  {showPhotos && selectedCollection?.id === collection.id
                    ? "Hide Photos"
                    : "Show Photos"}
                </Button>

                {/* Edit Button */}
                <Flex mr="8px">
                  {editingCollection === collection.id ? (
                    <>
                      <Button
                        onClick={() =>
                          handleEditCollectionSubmit(collection.id)
                        }
                        colorScheme="blue"
                        mr={2}
                        minW={"75px"}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        colorScheme="gray"
                        minW={"75px"}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleEditCollection(collection)}
                      mr={2}
                    >
                      <Image src={editIcon} alt="Edit icon" m={"0 auto"} />
                    </Button>
                  )}
                </Flex>

                {/* Delete Button */}
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteCollection(collection.id)}
                >
                  <Image src={deleteIcon} alt="Delete icon" m={"0 auto"} />
                </Button>
              </Flex>
            ))}
          </Flex>
          {/* Add Collection Modal */}
          <Modal
            isOpen={isAddCollectionOpen}
            onClose={onAddCollectionClose}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Photo Collection</ModalHeader>
              <ModalHeader />

              <ModalBody>
                {fetchingCategories ? (
                  <Spinner size="lg" />
                ) : fetchError ? (
                  <Text color="red.500">
                    Error fetching categories: {fetchError}
                  </Text>
                ) : (
                  <Box mb={4}>
                    <Text mb={2}>Select Category:</Text>
                    <Box mb={4}>
                      {categoriesFetched.map((category) => (
                        <Button
                          key={category.id}
                          onClick={() => handleCategoryClickModal(category.id)}
                          colorScheme={
                            selectedFromModalCategoryId === category.id
                              ? "teal"
                              : "blue"
                          }
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

                  <Button
                    type="submit"
                    isLoading={collectionsLoading}
                    loadingText="Adding..."
                  >
                    Add Collection
                  </Button>
                </form>

                {collectionsError && (
                  <Text color="red.500" mt={4}>
                    {collectionsError}
                  </Text>
                )}
                {addSuccess && (
                  <Text color="green.500" mt={4}>
                    Collection added successfully!
                  </Text>
                )}
              </ModalBody>

              <ModalFooter>
                <Button onClick={onAddCollectionClose} colorScheme="gray">
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Display photos in selected collection */}
          {selectedCollection && showPhotos && (
            <Box>
              <Flex justifyContent={"space-between"}>
                <Flex fontSize="2xl" mb={4} gap={2}>
                  <Text>Photos in</Text>{" "}
                  <Text fontWeight={"700"}>{selectedCollection.name}</Text>
                </Flex>
                <Button
                  borderRadius={"16px"}
                  py={"16px"}
                  px={"8px"}
                  onClick={() => handleAddPhotos(selectedCollection.id)}
                >
                  <Image alt="Add Icon" src={plusIcon} />
                </Button>
              </Flex>

              {photosIdLoading ? (
                <Spinner />
              ) : photosIdError ? (
                <Text color="red.500">{photosError}</Text>
              ) : photos.length === 0 ? (
                <Text color={"orange.400"}>No photos in this collection.</Text>
              ) : (
                <Grid
                  templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                  gap={4}
                >
                  {sortedPhotos.map((photo) => (
                    <Flex
                      key={photo.id}
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      minH={"420px"}
                    >
                      {/* Edit order */}
                      {editingPhoto === photo.id ? (
                        <Input
                          type="number"
                          value={
                            newOrder === "" || newOrder === undefined
                              ? photo.order
                              : newOrder
                          }
                          onChange={(e) => {
                            // Allow empty input by updating the state to an empty string when the user clears the field
                            setNewOrder(
                              e.target.value === "" ? "" : e.target.value
                            );
                          }}
                          size="sm"
                          w={"48px"}
                          height={"48px"}
                          borderRadius={"full"}
                          m={"2px"}
                          textAlign={"center"}
                          fontSize={"16px"}
                        />
                      ) : (
                        <Text mt={"16px"} fontSize={"16px"}>
                          {photo.order}
                        </Text>
                      )}

                      <Image
                        src={photo.url.small}
                        alt={photo.name}
                        objectFit="cover"
                        boxSize="250px"
                        pt="28px"
                      />
                      <Flex
                        p={2}
                        flexDirection={"column"}
                        alignItems={"space-between"}
                        justifyContent="center"
                      >
                        {/* Edit photo name */}
                        {editingPhoto === photo.id ? (
                          <>
                            <Input
                              value={newPhotoName}
                              onChange={(e) => setNewPhotoName(e.target.value)}
                              placeholder="Enter new name"
                            />
                            <Flex justifyContent={"space-between"} mt="8px">
                              <Button
                                onClick={() => handleEditSubmit(photo.id)}
                                width={"45%"}
                                colorScheme="green"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditingPhoto(null)}
                                width={"45%"}
                              >
                                Cancel
                              </Button>
                            </Flex>
                          </>
                        ) : (
                          <>
                            <Text>{photo.name}</Text>
                            <Flex gap="8px" justifyContent={"center"} mt="4px">
                              <Button onClick={() => handleEdit(photo)}>
                                Edit
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() =>
                                  handleDelete(photo.id, selectedCollection.id)
                                }
                              >
                                <Image src={deleteIcon} alt="delete icon" />
                              </Button>
                            </Flex>
                          </>
                        )}
                      </Flex>
                    </Flex>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {/* // TODO : FIX PhotoUploading for new global state management */}
          {/* Photo Uploading */}
          {/* <UploadPhotos
            isOpen={isAddPhotosOpen}
            onOpen={onAddPhotosOpen}
            onClose={onAddPhotosClose}
            setSelectedCollectionId={setSelectedCollectionId}
          /> */}
        </VStack>
      )}
    </>
  );
};

export default CollectionsSection;
