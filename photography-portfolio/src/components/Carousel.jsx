import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import useFetchPhotosByIds from "../hooks/useFetchPhotosByIds";
import useFetchPhotoIdsByCollection from "../hooks/PhotoCollection/useFetchPhotoIdsByCollection";

const Carousel = () => {
	const images = [
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_1270634-Edit-Edit.webp?alt=media&token=0f5c3beb-906c-4109-b822-26a28918518e",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_1280731-Edit.webp?alt=media&token=5972ff0f-073b-4947-9a6f-dd38b6d859c3",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_1290153-Edit-Edit.webp?alt=media&token=1c51d720-7af9-4c6a-882b-105d1066e7da",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_1290432-Edit-Edit1.webp?alt=media&token=64410fe2-d8a6-43c7-adfc-fa68e348ba62",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_X3A0989-Edit1.webp?alt=media&token=7d216dea-b50f-4ed9-982d-0c601f182a9f",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_X3A2417-Edit.webp?alt=media&token=ed365403-c146-4a0d-bab8-6e58355590f7",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_X3A2419-Edit-2-norma-2.webp?alt=media&token=28de6e60-cb82-4881-9486-6d24cc7800d5",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_X3A2453-Edit-Edit-Edit.webp?alt=media&token=3406e616-bf15-4c13-9b29-a1915506d204",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_X3A6748-Edit-Edit.webp?alt=media&token=c1a642dd-1fda-448a-842a-1756c8e627e3",
		"https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/_X3A7438-Edit.webp?alt=media&token=93965635-62eb-4224-bcaf-49e4039289f8",
	];

	const { photoIds, isLoading, error } = useFetchPhotoIdsByCollection(
		"hZFA0TZe3V315hW5Gm09"
	); // Fetch the specific collection

	const {
		photos,
		loading: photosLoading,
		error: photosError,
	} = useFetchPhotosByIds(photoIds);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [loadedImages, setLoadedImages] = useState({ 0: true }); // Only the first image is preloaded initially

  // Sorting photos based on the 'order' field
	const sortedPhotos = photos?.sort((a, b) => a.order - b.order);
	// Preload the next image when the current one is active
	const preloadImage = (index) => {
		const img = new Image();
		const bigUrl = sortedPhotos[index]?.url?.big; // Access the 'big' URL from the object
		if (bigUrl) {
			img.src = bigUrl;
			img.onload = () => {
				setLoadedImages((prev) => ({ ...prev, [index]: true }));
			};
		}
	};

	useEffect(() => {
		// Preload the next image once the carousel starts
		const nextIndex = (currentIndex + 1) % sortedPhotos.length;
		if (!loadedImages[nextIndex]) {
			preloadImage(nextIndex);
		}

		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedPhotos.length);
		}, 6000); // Change image every 6 seconds

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [currentIndex, sortedPhotos, loadedImages]);

	return (
		<Box w="100vw" h="100vh" position="relative" overflow="hidden" bg="black">
			{sortedPhotos.map((photo, index) => {
				const imageUrl = loadedImages[index] ? photo.url.big : undefined; // Use the 'big' image URL
				return (
					<img
						key={index}
						src={imageUrl}
						alt={`Carousel Image ${index + 1}`}
						style={{
							objectFit: "cover",
							width: "100%",
							height: "100%",
							position: "absolute",
							top: 0,
							left: 0,
							opacity: currentIndex === index ? 1 : 0,
							transition: "opacity 1s ease-in-out",
						}}
					/>
				);
			})}
		</Box>
	);
};

export default Carousel;
