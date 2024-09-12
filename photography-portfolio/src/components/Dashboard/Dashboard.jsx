import React, { useState } from 'react';
import { Box, Button, Text, VStack, Spinner, Image, Grid, Flex, Input } from '@chakra-ui/react';
import useFetchCollections from '../../hooks/PhotoCollection/useFetchCollections';
import useFetchPhotosByIds from '../../hooks/useFetchPhotosByIds';
import useDeletePhoto from '../../hooks/Photos/useDeletePhoto';
import useEditPhoto from '../../hooks/Photos/useEditPhoto';
import useDeleteCollection from '../../hooks/PhotoCollection/useDeleteCollection';
import useEditCollection from '../../hooks/PhotoCollection/useEditCollection';

const Dashboard = () => {
  const { collections, loading: collectionsLoading, error: collectionsError } = useFetchCollections();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false); // Track if photos should be shown
  const { photos, loading: photosLoading, error: photosError } = useFetchPhotosByIds(
    selectedCollection ? selectedCollection.photos : []
  );
  const { deletePhoto } = useDeletePhoto();
  const { editPhoto } = useEditPhoto();
  const { deleteCollection } = useDeleteCollection();
  const { editCollection } = useEditCollection();

  const [editingPhoto, setEditingPhoto] = useState(null);
  const [newPhotoName, setNewPhotoName] = useState('');
  const [editingCollection, setEditingCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCollectionClick = (collection) => {
    if (selectedCollection?.id === collection.id) {
      setShowPhotos(!showPhotos); // Toggle photos display if the same collection is clicked
    } else {
      setSelectedCollection(collection);
      setShowPhotos(true); // Show photos for the new collection
    }
    setEditingPhoto(null); // Reset editing state if switching collections
  };

  const handleDelete = async (photoId) => {
    try {
      await deletePhoto(photoId);
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

  return (
    <Box p={4}>
      <Text fontSize="3xl" mb={4}>Dashboard</Text>

      {/* Display collections */}
      {collectionsLoading ? (
        <Spinner />
      ) : collectionsError ? (
        <Text color="red.500">{collectionsError}</Text>
      ) : (
        <VStack align="stretch" mb={8}>
          {collections.map((collection) => (
            <Flex key={collection.id} align="center" mb={4}>
              <Text flex="1">{collection.name}</Text>
              <Button
                onClick={() => handleCollectionClick(collection)}
                colorScheme={selectedCollection?.id === collection.id ? 'green' : 'gray'}
                mr={2}
                isDisabled={collection.photos.length === 0} // Disable if no photos
              >
                {showPhotos && selectedCollection?.id === collection.id ? 'Hide Photos' : 'Show Photos'}
              </Button>
              <Button onClick={() => handleEditCollection(collection)} mr={2}>
                Edit Collection
              </Button>
              <Button colorScheme="red" onClick={() => handleDeleteCollection(collection.id)}>
                Delete Collection
              </Button>
            </Flex>
          ))}
        </VStack>
      )}

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
                    <Button colorScheme="red" onClick={() => handleDelete(photo.id)}>Delete</Button>
                  </Flex>
                </Box>
              ))}
            </Grid>
          )}
        </Box>
      )}

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
