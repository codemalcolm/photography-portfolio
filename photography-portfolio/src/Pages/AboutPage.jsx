import {
	Box,
	Button,
	Divider,
	Flex,
	Image,
	Link,
	List,
	ListItem,
	Text,
	UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import jiriImg from "../assets/images/jiri.jpg";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
	const navigate = useNavigate();
	const handleBtnClick = () => {
		navigate("/contact");
	};
	return (
		<Flex
			style={{ height: "100vh" }}
			width={"100%"}
			justifyContent={"center"}
			alignItems={"center"}
			margin={"0 auto"}
			flexDir={"column"}
		>
			<Flex
				flexDir={{ sm: "row", base: "column" }}
				gap={{ sm: 16, base: 8 }}
				alignItems={{ sm: "start", base: "center" }}
				mt={{ sm: "0px", base: "198px" }}
			>
				<Image
					src={jiriImg}
					alt="profile-photo"
					objectFit={"cover"}
					width={{ base: "325px", lg: "350px", sm: "255px" }}
					height={{ base: "420px", lg: "450px", sm: "335px" }}
					opacity={0.85}
				/>
				<Flex
					color="#ffffff"
					flexDirection={"column"}
					alignItems={{ sm: "start", base: "center" }}
					textAlign={"start"}
					width={{ sm: "485px", base: "325px" }}
					gap={"16px"}
				>
					<Text fontSize={{ sm: "24px", base: "18px" }}>
						Jiří Macháček - @jirimachacek.raw
					</Text>
					<Text fontSize={{ sm: "16px", base: "14px" }}>
						Pipsum dolor sit amet, consectetuer adipiscing elit. Etiam posuere
						lacus quis dolor. Praesent more co je Fusce suscipit, sollicitudin
						et, dolor. Aenean vel massa quis mauris vehicula lacinia. Aliquam
						pede. Nullam r
					</Text>
					<Box
						bg={"gray"}
						opacity="0.85"
						h={"1px"}
						w={"65%"}
						m={"0 auto"}
						borderRadius={"full"}
					/>
					<Flex flexDir={"column"} gap={4}>
						<Box>
							<Text fontWeight={"500"} fontSize={{ sm: "24px", base: "16px" }}>
								Klienti:
							</Text>
							<UnorderedList pl={"4px"}>
								<ListItem>Klient 1 - Lorem ipsum dolor sit amet</ListItem>
								<ListItem>Klient 2 - adipiscing elit</ListItem>
								<ListItem>Klient 3 - molestie lorem at massa</ListItem>
								<ListItem>
									Klient 4 - Facilisis in pretium nisl aliquet
								</ListItem>
							</UnorderedList>
						</Box>
						<Box>
							<Text fontWeight={"500"} fontSize={{ sm: "24px", base: "16px" }}>
								Exhibice:
							</Text>
							<UnorderedList pl={"4px"}>
								<ListItem>Exhibice 1 - Lorem ipsum dolor sit amet</ListItem>
								<ListItem>Exhibice 2 - adipiscing elit</ListItem>
								<ListItem>Exhibice 3 - molestie lorem at massa</ListItem>
								<ListItem>
									Exhibice 4 - Facilisis in pretium nisl aliquet
								</ListItem>
							</UnorderedList>
						</Box>
					</Flex>
				</Flex>
			</Flex>
			<Button
				w={{ sm: "25%", base: "75%" }}
				borderRadius={"10px"}
				mt={8}
				py={"16px"}
				onClick={handleBtnClick}
			>
				Contact Me
			</Button>
		</Flex>
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
