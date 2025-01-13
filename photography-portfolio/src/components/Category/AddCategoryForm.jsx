import { useState } from "react";
import useAddCategory from "../../hooks/Category/useAddCategory";
import {
  Box,
  Button,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const AddCategoryForm = () => {
  const { addCategory, loading, error, success } = useAddCategory();
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for modal control

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
    <>
      {/* Button to open the modal */}
      <Button onClick={onOpen} colorScheme="blue">
        Add New Category
      </Button>

      {/* Modal for adding category */}
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
    </>
  );
};

export default AddCategoryForm;
