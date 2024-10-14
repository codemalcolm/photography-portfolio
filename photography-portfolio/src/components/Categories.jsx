import { Flex, Image, Text, Box, Spinner } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Categories = ({ categories }) => {

	return (
		<Flex
			gap={18}
			justifyContent="center"
			alignItems="center"
			height={"100vh"}
			overflowY={{"2xl": "auto", base:"auto"}}
			flexWrap="wrap"
			flexDirection={"row"}
			paddingY={"32px"}

		>
			{categories.map((category) => (
				<RouterLink key={category.id} to={`${category.id}`}>
					<Flex
						flexDirection="column"
						position="relative"
						_hover={{ opacity: "0.8", color: "white" }}
					>
						<Box maxWidth="660px" maxHeight="440px" padding="16px" flex="1 1 300px">
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
