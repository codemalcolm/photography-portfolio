import { Box, Spinner, Text, Flex, Image } from "@chakra-ui/react";
import { Route, Routes, Link as RouterLink, useParams } from "react-router-dom";
import React from "react";

const BackArrow = React.lazy(() => import("../components/BackArrow"));
const CollectionList = React.lazy(() => import('./CollectionList'));
const PhotoGallery = React.lazy(() => import('../components/PhotoGallery'));

const Collections = () => {
	const { categoryId } = useParams();

	return (
		<>
			<BackArrow />
			
			<Routes>
				<Route path="/" element={<CollectionList />} />
				<Route path="gallery/:collectionId/*" element={<PhotoGallery categoryId={categoryId} />} />
			</Routes>
		</>
	);
};

export default Collections;
