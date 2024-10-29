import {
	Box,
	Button,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	useDisclosure,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import useUploadPhotosTest from "../hooks/Photos/useUploadPhotosTest";
import useFetchCollections from "../hooks/PhotoCollection/useFetchCollections";


const TestImagePicker = () => {
	const {
		isOpen: isAddPhotosOpen,
		onOpen: onAddPhotosOpen,
		onClose: onAddPhotosClose,
	} = useDisclosure(); // Add Photos Modal
	const {
		uploadPhotos,
		loading: photosLoading,
		error: photosError,
		success: photosSuccess,
	} = useUploadPhotosTest();
	const {
		collections,
		loading: collectionsLoading,
		error: collectionsError,
	} = useFetchCollections();
	const [selectedCollectionId, setSelectedCollectionId] = useState("");
	const [files, setFiles] = useState([]);
	const [bigFiles, setBigFiles] = useState([]); // Store big images
	const [names, setNames] = useState([]);
	const [currentNameIndex, setCurrentNameIndex] = useState(0);

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		setFiles(selectedFiles);
		setNames(new Array(selectedFiles.length).fill("")); // Initialize names array with empty strings
		setCurrentNameIndex(0);
	};

	const handleBigFileChange = (e) => {
		const selectedBigFiles = Array.from(e.target.files);
		setBigFiles(selectedBigFiles);
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

	const handleNameChange = (e) => {
		const updatedNames = [...names];
		updatedNames[currentNameIndex] = e.target.value;
		setNames(updatedNames);
	};

	const handleNextName = () => {
		setCurrentNameIndex((prevIndex) =>
			Math.min(prevIndex + 1, files.length - 1)
		);
	};

	const handlePreviousName = () => {
		setCurrentNameIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const handleAddPhotos = (id) => {
		setSelectedCollectionId(id);
		onAddPhotosOpen();
	};

	return (
		<>
			<Button
				borderRadius={"16px"}
				py={"16px"}
				px={"8px"}
				onClick={() => { handleAddPhotos(selectedCollectionId); }}
			>
				Add photos
			</Button>

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
		</>
	);
};

export default TestImagePicker;

// const [bigFiles, setBigFiles] = useState([]); // big images
// const [bigFileNames, setBigFileNames] = useState([]); // big images

// const handleBigFileChange = (e) => {
//   const selectedBigFiles = Array.from(e.target.bigFiles);
//   setBigFiles(selectedBigFiles);
//   setBigFileNames(new Array(selectedBigFiles.length).fill('')); // Initialize names array with empty strings
//   setCurrentNameIndex(0);
// };
