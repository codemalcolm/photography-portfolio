import { useState } from 'react';
import useAddPhotoCollection from '../../hooks/PhotoCollection/useAddPhotoCollection';
import useFetchCategories from '../../hooks/Category/useFetchCategories';
import { Box, Button, Input, Text, Textarea, Spinner } from '@chakra-ui/react';

const AddPhotoCollectionForm = () => {
  const { addPhotoCollection, loading: addingCollection, error: addError, success: addSuccess } = useAddPhotoCollection();
  const { categories, loading: fetchingCategories, error: fetchError } = useFetchCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the addPhotoCollection function from the custom hook
    addPhotoCollection(selectedCategoryId, {
      name: collectionName,
      description: collectionDescription,
      photos: [] // Start with an empty photos array
    });

    // Clear the input fields after submission
    setCollectionName('');
    setCollectionDescription('');
  };

  if (fetchingCategories) return <Spinner size="lg" />;
  if (fetchError) return <Text color="red.500">Error fetching categories: {fetchError}</Text>;

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Add New Photo Collection
      </Text>

      <Box mb={4}>
        <Text mb={2}>Select Category:</Text>
        <Box mb={4}>
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              colorScheme={selectedCategoryId === category.id ? 'teal' : 'blue'}
              mr={2}
            >
              {category.displayName}
            </Button>
          ))}
        </Box>
      </Box>

      <form onSubmit={handleSubmit}>
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
    </Box>
  );
};

export default AddPhotoCollectionForm;