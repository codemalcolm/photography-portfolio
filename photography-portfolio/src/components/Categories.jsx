import { Flex, Image, Text, Box } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useFetchCategories from "../hooks/Category/useFetchCategories";
import { useEffect, useState } from "react";

const Categories = () => {
	const { categories, loading, error } = useFetchCategories();
	const [loadedImages, setLoadedImages] = useState(new Set());
	const navigate = useNavigate();

	// Handle when an image finishes loading
	const handleImageLoad = (id) => {
		setLoadedImages((prev) => new Set([...prev, id]));
	};

	useEffect(() => {}, []);

	const handleCategoryClick = async (category) => {
		if (category.hybrid) {
			// Redirect to the first collection's gallery for hybrid categories
			const firstCollectionId = category.collections[0];
			if (firstCollectionId) {
				navigate(`${category.id}/gallery/${firstCollectionId}`);
			}
		} else {
			// Redirect to the collections page for normal categories
			navigate(`${category.id}`);
		}
	};

	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			height="100vh"
			overflowY={{ "2xl": "auto", base: "auto" }}
			flexWrap="wrap"
			flexDirection="row"
			paddingY="32px"
		>
			{categories.map((category) => (
				<Box
					key={category.id}
					onClick={() => handleCategoryClick(category)}
					cursor="pointer"
				>
					<Flex flexDirection="column" position="relative" role="group">
						<Box
							maxWidth="660px"
							maxHeight="440px"
							padding="16px"
							flex="1 1 300px"
							position="relative"
							_hover={{ filter: "brightness(0.7)" }}
						>
							<Image
								src={category.imageUrl}
								alt={category.displayName}
								objectFit="cover"
								loading="lazy"
								borderRadius="4px"
								onLoad={() => handleImageLoad(category.id)}
							/>
						</Box>
						{loadedImages.has(category.id) && (
							<Text
								fontSize="28px"
								fontWeight={500}
								color="white"
								position="absolute"
								left="50%"
								top="50%"
								transform="translate(-50%, -50%)"
								transition="font-size 0.3s ease, color 0.3s ease"
								_groupHover={{
									fontSize: "30px",
									color: "white",
								}}
							>
								{category.displayName}
							</Text>
						)}
					</Flex>
				</Box>
			))}
		</Flex>
	);
};

export default Categories;
