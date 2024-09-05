import { Box, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import PhotoCarousel from "./PhotoCarousel";
import ShowCarouselWrapper from "./ShowCarouselWrapper";

const CollectionMenu = (props) => {
	const { data } = props;
	return (
		<Box px={"16px"} ml={{base:"32px",lg:"60px"}}>
			<Text fontSize={"36px"}></Text>
			<VStack spacing={2} align="start" mt={"32px"}>
				{data?.map((show) => (
					<Link key={show.id} to={`carousel/${show.id}`}>
						<Box>{show.collectionName}</Box>
					</Link>
				))}
			</VStack>
		</Box>
	);
};

export default CollectionMenu;
