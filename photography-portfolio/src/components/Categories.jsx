import { Flex, Image, Text, Box, Spinner } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Categories = ({ categories }) => {

	return (
		<Flex
			gap={18}
			justifyContent="center"
			alignItems="center"
			height="100%"
			width="100%"
		>
			{categories.map((category) => (
				<RouterLink key={category.id} to={`${category.id}`}>
					<Flex
						flexDirection="column"
						position="relative"
						_hover={{ opacity: "0.8", color: "white" }}
					>
						<Box maxWidth="750px" minWidth="285px" padding="16px">
							<Image
								src={category.imageUrl}
								alt={category.displayName}
								objectFit="cover"
								loading="lazy"
							/>
						</Box>
						<Text
							fontSize="22px"
							fontWeight={500}
							color="white"
							position="absolute"
							left="50%"
							top="50%"
							transform="translate(-50%, -50%)"
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
