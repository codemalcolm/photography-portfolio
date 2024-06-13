import { Box, Button, Flex, Image, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import jiriImg from "../assets/images/jiri.jpg";

const AboutSection = () => {
	return (
		<Flex
			style={{ height: "100vh" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			{/* FlexBox Desktop Version*/}
			<Flex w={"80%"} justifyContent={"center"}>
				<Flex w="450px" border={"1px solid black"} justifyContent={"center"}>
					<Flex padding={"16px"} flexDirection={"column"}>
						<Flex borderRadius={"16px"} border={"1px solid black"}>
							<Image
								src={jiriImg}
								objectFit={"cover"}
								width={"350px"}
								height={"450px"}
								opacity={0.9}
								px={"16px"}
								py={"32px"}
							/>
						</Flex>

						<Flex alignItems={"center"} flexDirection={"column"}>
							<Text fontSize={"32px"} mt={"16px"}>
								Jiří Macháček
							</Text>
							<Button
								w={"225px"}
								borderRadius={"full"}
								border={"1px solid black"}
								backgroundColor={"white"}
							>
								UKÁZAT PRÁCI
							</Button>
						</Flex>
					</Flex>
				</Flex>
				<Flex w="950px" border={"1px solid black"} p={"24px"} flexDirection={"column"}>
					{/* 1st TEXT BOX  */}
					<Box>
						<Text 
							fontSize={"42px"}
							fontWeight={500}
							lineHeight={"42px"}
						>
							O Mně
						</Text>
						<Text 
							mt={"16px"}
							fontSize={"18px"}
							fontWeight={400}
							lineHeight={"18px"}
						>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed convallis magna eu sem. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nunc auctor. Aliquam erat volutpat. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Aliquam ornare wisi eu metus. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
						</Text>
					</Box>

					{/* 2nd TEXT BOX  */}
					<Flex>
						<Box>
							<Text 
								fontSize={"42px"}
								fontWeight={500}
								lineHeight={"42px"}
								mt={"18px"}
							>
								Bibliografie
							</Text>
							<UnorderedList styleType="'- '" fontSize={"18px"} mt={"16px"} textAlign={"start"}>
								<ListItem>Lorem ipsum dolor sit amet</ListItem>
								<ListItem>Consectetur adipiscing elit</ListItem>
								<ListItem>Integer molestie lorem at massa</ListItem>
								<ListItem>Facilisis in pretium nisl aliquet</ListItem>
							</UnorderedList>
						</Box>
						{/* 3rd TEXT BOX  */}
						<Box ml={"22px"}>
							<Text 
								fontSize={"42px"}
								fontWeight={500}
								lineHeight={"42px"}
								mt={"18px"}
							>
								Exhibice
							</Text>
							<UnorderedList styleType="'- '" fontSize={"18px"} mt={"16px"} textAlign={"start"}>
								<ListItem><Link fontWeight={500}>Lorem ipsum dolor sit amet</Link></ListItem>
								<ListItem><Link fontWeight={500}>Consectetur adipiscing elit</Link></ListItem>
								<ListItem><Link fontWeight={500}>Integer molestie lorem at massa</Link></ListItem>
								<ListItem><Link fontWeight={500}>Facilisis in pretium nisl aliquet</Link></ListItem>
							</UnorderedList>
						</Box>
					</Flex>
					{/* 4th TEXT BOX  */}
					<Box>
							<Text 
								fontSize={"42px"}
								fontWeight={500}
								lineHeight={"42px"}
								mt={"18px"}
							>
								Klienti
							</Text>
							<UnorderedList styleType="'- '" fontSize={"18px"} mt={"16px"} textAlign={"start"}>
								<ListItem>Lorem ipsum dolor sit amet</ListItem>
								<ListItem>Consectetur adipiscing elit</ListItem>
								<ListItem>Integer molestie lorem at massa</ListItem>
								<ListItem>Facilisis in pretium nisl aliquet</ListItem>
							</UnorderedList>
						</Box>
				</Flex>
			</Flex>
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
