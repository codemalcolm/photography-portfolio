import {
	Box,
	Button,
	Divider,
	Flex,
	Image,
	Link,
	ListItem,
	Text,
	UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import jiriImg from "../assets/images/jiri-beer.jpg";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
	const navigate = useNavigate();
	const handleBtnClick = () => {
	  navigate("/photography")
	}
	return (
		<Flex
			style={{ height: "100vh" }}
			width={"100%"}
			justifyContent={"center"}
			alignItems={"center"}
			margin={"0 auto"}
			backgroundColor={"#F5F5F5"}
		>
			{/* FlexBox Desktop Version*/}
			<Flex
				w={{ base: "auto", lg: "80%" }}
				justifyContent={{ base: "start", lg: "center" }}
				flexDirection={{ base: "column", lg: "row" }}
				id="lemme"
			>
				<Flex w="325px" justifyContent={"center"}>
					<Flex
						py={{ base: "0px", lg: "16px" }}
						px={{ base: "0px", lg: "16px" }}
						flexDirection={"column"}
					>
						<Flex
							// borderRadius={"16px"}
							// border={"1px solid black"}
							justifyContent={"center"}
						>
							<Image
								src={jiriImg}
								objectFit={"cover"}
								width={{ base: "195px", lg: "350px", sm: "255px" }}
								height={{ base: "245px", lg: "450px", sm: "335px" }}
								opacity={0.9}
								px={{ base: "10px", lg: "16px" }}
								py={{ base: "18px", lg: "32px" }}
							/>
						</Flex>

						<Flex alignItems={"center"} flexDirection={"column"}>
							<Text fontSize="clamp(28px, 2.5vw, 42px)" mt={"16px"} mb={"8px"}>
								Jiří Macháček
							</Text>
							<Divider
								display={{ base: "block", lg: "none" }}
								height={"1px"}
								width={"75px"}
								bgColor={"gray"}
							/>
							<Button
								w={"100%"}
								maxWidth={"225px"}
								minWidth={"125px"}
								borderRadius={"full"}
								border={"1px solid black"}
								backgroundColor={"white"}
								fontSize={{ base: "12px", lg: "16px" }}
								px={{ base: "0px", lg: "16px" }}
								display={{ base: "none", lg: "block" }}
								onClick={()=>handleBtnClick()}
							>
								UKÁZAT PRÁCI
							</Button>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					w={{ base: "325px", lg: "950px" }}
					py={{ base: "0px", lg: "24px" }}
					px={{ base: "4px", lg: "24px" }}
					flexDirection={"column"}
					justifyContent={"start"}
					gap={"16px"}
					mt={{base:"16px", lg:"16px"}}
				>
					{/* 1st TEXT BOX  */}
					{/* <Box>
						<Text
							fontSize="clamp(22px, 2.5vw, 30px)"
							fontWeight={500}
							lineHeight="clamp(22px, 2.5vw, 30px)"
						>
							O Mně
						</Text>
						<Text
							mt={"16px"}
							fontSize="clamp(12px, 1.5vw, 18px)"
							fontWeight={400}
							lineHeight="clamp(12px, 1.5vw, 18px)"
						>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed
							convallis magna eu Lorem ipsum dolor sit amet, consectetuer
							adipiscing elit. Sed convallis magna eu Lorem ipsum dolor sit
							amet, consectetuer adipiscing elit. Sed convallis magna eu Lorem
							ipsum dolor sit amet, consectetuer adipiscing elit. Sed convallis
							magna eu
						</Text>
					</Box> */}

					{/* 2nd TEXT BOX  */}
					<Flex>
						{/* <Box>
							<Text
								fontSize="clamp(22px, 2.5vw, 30px)"
								fontWeight={500}
								lineHeight="clamp(22px, 2.5vw, 30px)"
								mt={"18px"}
							>
								Bibliografie
							</Text>
							<UnorderedList
								styleType="'- '"
								fontSize="clamp(12px, 1.5vw, 18px)"
								mt={"16px"}
								textAlign={"start"}
							>
								<ListItem>Lorem ipsum dolor sit amet</ListItem>
								<ListItem>Consectetur adipiscing elit</ListItem>
								<ListItem>Integer molestie lorem at massa</ListItem>
								<ListItem>Facilisis in pretium nisl aliquet</ListItem>
							</UnorderedList>
						</Box> */}
						{/* 3rd TEXT BOX  */}
						<Box>
							<Text
								fontSize="clamp(22px, 2.5vw, 30px)"
								fontWeight={500}
								lineHeight="clamp(22px, 2.5vw, 30px)"
								mt={"18px"}
							>
								Exhibice
							</Text>
							<UnorderedList
								styleType="'- '"
								fontSize="clamp(12px, 1.5vw, 18px)"
								mt={"16px"}
								textAlign={"start"}
							>
								<ListItem>
									<Link fontWeight={500}>Lorem ipsum dolor sit amet</Link>
								</ListItem>
								<ListItem>
									<Link fontWeight={500}>Consectetur adipiscing elit</Link>
								</ListItem>
								<ListItem>
									<Link fontWeight={500}>Integer molestie lorem at massa</Link>
								</ListItem>
								<ListItem>
									<Link fontWeight={500}>
										Facilisis in pretium nisl aliquet
									</Link>
								</ListItem>
							</UnorderedList>
						</Box>
					</Flex>
					{/* 4th TEXT BOX  */}
					<Box maxW={"350px"}>
						<Text
							fontSize="clamp(22px, 2.5vw, 30px)"
							fontWeight={500}
							lineHeight="clamp(22px, 2.5vw, 30px)"
							mt={"18px"}
						>
							Klienti
						</Text>
						<UnorderedList
							display={"grid"}
							gridTemplateColumns={"repeat(2, 1fr)"}
							width={"350px"}

							styleType="'• '"
							fontSize="clamp(12px, 1.5vw, 18px)"
							mt={"16px"}
							textAlign={"start"}
							gap={"8px"}
						>
							<ListItem>X-Massacre</ListItem>
							<ListItem>Stop Zevling</ListItem>
							<ListItem>PR Klub</ListItem>
							<ListItem>Digital Forest</ListItem>
							<ListItem>Hefty Mess</ListItem>
							<ListItem>Malcuth & Facutum</ListItem>
							<ListItem>F.H. Prager</ListItem>
						</UnorderedList>
					</Box>
				</Flex>
				<Flex justifyContent={"center"}>
					<Button
						minWidth={"175px"}
						borderRadius={"full"}
						border={"1px solid black"}
						backgroundColor={"white"}
						fontSize={"12px"}
						px={{ base: "0px", lg: "16px" }}
						display={{ base: "block", lg: "none" }}
						mt={"16px"}
					>
						UKÁZAT PRÁCI
					</Button>
				</Flex>
			</Flex>
			{/* FlexBox Mobile Version */}
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
