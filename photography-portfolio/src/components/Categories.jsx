import { Flex, Image, Text, Box, Spinner } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Categories = ({ categories }) => {
	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			height={"100vh"}
			overflowY={{ "2xl": "auto", base: "auto" }}
			flexWrap="wrap"
			flexDirection={"row"}
			paddingY={"32px"}
		>
			{categories.map((category) => (
				<RouterLink key={category.id} to={`${category.id}`}>
					<Flex
						flexDirection="column"
						position="relative"
						role="group" // Enables hover pseudo-styling for child elements
					>
						<Box
							maxWidth="660px"
							maxHeight="440px"
							padding="16px"
							flex="1 1 300px"
							position="relative" // Ensures child elements (like Text) position correctly
							_hover={{ filter: "brightness(0.7)" }} // Darkens the image on hover
						>
							<Image
								src={category.imageUrl}
								alt={category.displayName}
								objectFit="cover"
								loading="lazy"
								borderRadius="4px"
							/>
						</Box>
						<Text
							fontSize="28px"
							fontWeight={500}
							color="white"
							position="absolute"
							left="50%"
							top="50%"
							transform="translate(-50%, -50%)"
							transition="font-size 0.3s ease, color 0.3s ease" // Smooth font-size change
							_groupHover={{
								fontSize: "30px", // Enlarges font size by 2px on hover
								color: "white", // Keeps the text white
							}}
						>
							{category.displayName}
						</Text>
					</Flex>
				</RouterLink>
			))}
		</Flex>
	);
};

export default Categories;
