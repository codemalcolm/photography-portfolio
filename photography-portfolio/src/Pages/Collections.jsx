import { Box, Spinner, Text, Flex, Image } from "@chakra-ui/react";
import { Route, Routes, Link as RouterLink, useParams } from "react-router-dom";
import CollectionDetail from "../components/CollectionDetail";
import CollectionList from "./CollectionList";
import arrowBack from "../assets/icons/arrow-back-svgrepo-com.svg";
import useFetchPhotoIdsByCollection from "../hooks/PhotoCollection/useFetchPhotoIdsByCollection";
import useFetchPhotosByIds from "../hooks/useFetchPhotosByIds";
import PhotoCarousel from "../components/PhotoCarousel";
import PhotoGallery from "../components/PhotoGallery";
import BackArrow from "../components/BackArrow";

const Collections = () => {
  const {categoryId} = useParams()

	return (
    
		<>
			<BackArrow/>
			{/* Add a route to handle displaying a specific collection's photos */}
			<Routes>
				<Route
					path="/" // Route to match the collectionId in the URL
					element={<CollectionList />} // Show the new CollectionDetail component
				/>
				{/* Route to display details of a specific collection */}
				<Route 
					path="gallery/:collectionId/*" 
					element={<PhotoGallery categoryId={categoryId}/>} 
				/>

				<Route 
					path="carousel/:collectionId/*" 
					element={<PhotoCarousel categoryId={categoryId}/>} 
				/>
			</Routes>
		</>
	);
};

export default Collections;
