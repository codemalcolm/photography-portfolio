import { useState } from 'react';
import useFetchCollections from '../../hooks/PhotoCollection/useFetchCollections';
import { Box, Button, Input, Text, VStack, Image, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import useUploadPhotos from '../../hooks/Photos/useUploadPhotos';

const UploadPhotosForm = ({props}) => {
  const { isAddPhotosOpen, onAddPhotosOpen, onAddPhotosClose } = useDisclosure();
  const { uploadPhotos, loading, error, success } = useUploadPhotos();
  const { collections, loading: collectionsLoading, error: collectionsError } = useFetchCollections();
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  
  

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setNames(new Array(selectedFiles.length).fill('')); // Initialize names array with empty strings
    setCurrentNameIndex(0);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCollectionId) {
      uploadPhotos(files, names, selectedCollectionId); // Pass the selected collection ID
      onAddPhotosClose(); // Close modal after submission
    } else {
      alert("Please select a collection first!");
    }
  };

  return (
    <Box>
      <Button onClick={onAddPhotosOpen} colorScheme="teal">Upload Photos</Button>

      {/* Modal for uploading photos */}
      <Modal isOpen={isAddPhotosOpen} onClose={onAddPhotosClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Photos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              {/* Collection Selection */}
              <Box mb={4}>
                <Text fontSize="xl" mb={2}>Select a Collection:</Text>
                {collectionsLoading ? (
                  <Spinner />
                ) : collectionsError ? (
                  <Text color="red.500">{collectionsError}</Text>
                ) : (
                  <VStack>
                    {collections.map((collection) => (
                      <Button
                        key={collection.id}
                        onClick={() => setSelectedCollectionId(collection.id)} // Set the selected collection ID
                        colorScheme={selectedCollectionId === collection.id ? 'blue' : 'gray'} // Highlight selected collection
                      >
                        {collection.name}
                      </Button>
                    ))}
                  </VStack>
                )}
              </Box>

              {/* File Input */}
              <Box mb={4} color="red">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
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
                      value={names[currentNameIndex] || ''}
                      onChange={handleNameChange}
                      placeholder="Enter photo name"
                    />
                  </Box>

                  {/* Previous and Next buttons */}
                  <Box>
                    <Button onClick={handlePreviousName} isDisabled={currentNameIndex === 0} mr={2}>Previous</Button>
                    <Button onClick={handleNextName} isDisabled={currentNameIndex === files.length - 1}>Next</Button>
                  </Box>
                </VStack>
              )}

              <Button type="submit" isLoading={loading} loadingText="Uploading...">
                Upload Photos
              </Button>

              {error && (
                <Text color="red.500" mt={4}>
                  {error}
                </Text>
              )}
              {success && (
                <Text color="green.500" mt={4}>
                  Photos uploaded successfully!
                </Text>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onAddPhotosClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UploadPhotosForm;
