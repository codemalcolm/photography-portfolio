import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Grid,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
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
import useUploadPhotos from "../../hooks/Photos/useUploadPhotos";
import useFetchCollections from "../../hooks/PhotoCollection/useFetchCollections";

const UploadPhotos = ({ isOpen, onOpen, onClose, collectionId }) => {
	const [selectedCollectionId, setSelectedCollectionId] = useState("");
	const [files, setFiles] = useState([]); // State for files uploaded
	const [names, setNames] = useState([]); // State for name of files uploaded
	const [bigFiles, setBigFiles] = useState([]); // Store big images

	// Photo uploading
	const {
		uploadPhotos,
		loading: photosLoading,
		error: photosError,
		success: photosSuccess,
	} = useUploadPhotos();

	const {
		collections,
		loading: collectionsLoading,
		error: collectionsError,
	} = useFetchCollections();

	const [currentNameIndex, setCurrentNameIndex] = useState(0); // Index of current fileName - used in mass uploading to destinguish files

	// handling the change (selection) of files (small size)
	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		setFiles(selectedFiles);
		setNames(new Array(selectedFiles.length).fill("")); // Initialize names array with empty strings
		setCurrentNameIndex(0);
	};

	// handling the change (selection) of files (big size)
	const handleBigFileChange = (e) => {
		const selectedBigFiles = Array.from(e.target.files);
		setBigFiles(selectedBigFiles);
	};

	// handling the name changing of file names in the upload photos modal
	const handleNameChange = (e) => {
		const updatedNames = [...names];
		updatedNames[currentNameIndex] = e.target.value;
		setNames(updatedNames);
	};

	// changing the name visible to the next name in the array
	const handleNextName = () => {
		setCurrentNameIndex((prevIndex) =>
			Math.min(prevIndex + 1, files.length - 1)
		);
	};

	// changing the name visible to the previos name in the array
	const handlePreviousName = () => {
		setCurrentNameIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	// handling the submitting of all photos uploaded (small & big)
	const handleSubmitPhotos = async (e) => {
		e.preventDefault();
		if (selectedCollectionId && bigFiles.length === files.length) {
			// Ensure big images match small images
			const uploadedPhotos = await uploadPhotos(
				files,
				bigFiles,
				names,
				selectedCollectionId
			);
			if (uploadedPhotos) {
				onClose(); // Close modal after submission
			}
		} else {
			alert(
				"Please select a collection and ensure both small and big images match!"
			);
		}
	};

	useEffect(()=>{
		setSelectedCollectionId(collectionId)
	},[])
	
	return (
		<>
			{/* Modal for uploading photos */}
			<Modal
				isOpen={isOpen}
				onClose={photosLoading ? undefined : onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Upload Photos</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmitPhotos}>
							{/* Collection Selection */}
							<Box mb={4}>
								<Text fontSize="xl" mb={2}>
									Select a Collection:
								</Text>
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
												colorScheme={
													selectedCollectionId === collection.id
														? "blue"
														: "gray"
												}
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
								<Input
									type="file"
									multiple
									accept="image/*"
									onChange={handleFileChange}
								/>
							</Box>

							{/* Big File Input */}
							<Box mb={4}>
								<Text>Big images</Text>
								<Input
									type="file"
									multiple
									accept="image/*"
									onChange={handleBigFileChange}
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
											value={names[currentNameIndex] || ""}
											onChange={handleNameChange}
											placeholder="Enter photo name"
										/>
									</Box>

									<Box>
										<Button
											onClick={handlePreviousName}
											isDisabled={currentNameIndex === 0}
											mr={2}
										>
											Previous
										</Button>
										<Button
											onClick={handleNextName}
											isDisabled={currentNameIndex === files.length - 1}
										>
											Next
										</Button>
									</Box>
								</VStack>
							)}

							<Button
								type="submit"
								isLoading={photosLoading}
								loadingText="Uploading..."
							>
								Upload Photos
							</Button>

							{photosError && (
								<Text color="red.500" mt={4}>
									{photosError}
								</Text>
							)}
							{photosSuccess && (
								<Text color="green.500" mt={4}>
									Photos uploaded successfully!
								</Text>
							)}
						</form>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} isDisabled={photosLoading}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UploadPhotos;
