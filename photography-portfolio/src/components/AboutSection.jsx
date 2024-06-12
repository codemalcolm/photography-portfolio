import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import jiriImg from "../assets/images/about_section.png";

const AboutSection = () => {
	return (
		<Box
		style={{ height: "100vh"}}
		>
			<img src={jiriImg} alt="about-section" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
		</Box>
		// <Flex py={"220px"} px={"360px"}>
		// 	<Box border={"1px solid black"} width={"350px"}>
		// 		<Image
		// 			alt="photographer-photo"
		// 			src={jiriImg}
		// 			width={"350px"}
		// 			height={"450px"}
		// 		/>
		// 	</Box>
		// 	<Box ml={"16px"} border={"1px solid black"} width={"220px"}>
		// 		<Text fontSize={"36px"}>Jiří Macháček</Text>
		// 	</Box>
		// </Flex>
	);
};

export default AboutSection;
