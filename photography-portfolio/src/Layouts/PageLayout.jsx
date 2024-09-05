import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navigation/Navbar";

const PageLayout = ({ children }) => {
	return (
		<Flex flexDirection={"column"} bgColor={"black"}>
			<Box>
				<Navbar />
				{children}
			</Box>
		</Flex>
	);
};

export default PageLayout;
