import React, { useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navigation/Navbar";
const PageLayout = ({ children }) => {
	const contactRef = useRef(null);
	return (
		<>
			<Flex flexDirection={"column"}>
				<Box
				
				>

                    <Navbar contactRef={contactRef}/>
					{children}
				</Box>
			</Flex>
		</>
	);
};

export default PageLayout;
