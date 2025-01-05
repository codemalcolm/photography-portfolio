import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import fbIcon from "../assets/icons/fb-icon.svg";
import igIcon from "../assets/icons/ig-icon.svg";
import hamburgerIcon from "../assets/icons/hamburger-icon.svg";
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Link
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleNavLinkClick = () => {
		// if (!scrollToSection(sectionId, { duration: 5 })) return;
		// onClose(); // Close the drawer if it's open (for mobile)
		//ADD! sectionId to parameter on uncomment
	};

	return (
		<Box zIndex={2} position={"relative"}>
			<Box
				position={"absolute"}
				px={6}
				py={3}
				flex={1}
				w={{ base: "calc(100%)", md: "calc(100% - 540px)" }}
				mx={"auto"}
				left={"50%"}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -5%)",
				}}
				bgColor={"*"}
			>
				<Flex
					mt="8px"
					justifyContent={"space-between"}
					alignItems={"center"}
					color={"white"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={3}>
						<Link to={"/"}>
							<Box
								display={{ xs: "none", lg: "block" }}
								_hover={{ color: "#ADD4D9" }}
								cursor={"pointer"}
							>
								JIŘÍ MACHÁČEK
							</Box>
						</Link>
					</Flex>

					{/* Navbar links */}
					<Flex
						gap={10}
						alignItems={"center"}
						display={{ base: "none", lg: "flex" }}
						opacity={"100%"}
						color={"white"}
					>
						<Flex gap={10}>
							<Box
								_hover={{ color: "#ADD4D9" }}
								onClick={() => handleNavLinkClick("#photography")}
							>
								<RouterLink to="photography">photography</RouterLink>
							</Box>
							<Box
								_hover={{ color: "#ADD4D9" }}
								onClick={() => handleNavLinkClick("#about")}
							>
								<RouterLink to="about">about</RouterLink>
							</Box>
							<Box
								_hover={{ color: "#ADD4D9" }}
								onClick={() => handleNavLinkClick("#contact")}
							>
								<RouterLink to="/contact">contact</RouterLink>
							</Box>

						</Flex>

						<Flex gap={2} alignItems="center">
							<Box _hover={{ color: "#ADD4D9" }}>
								<Link
									href="https://www.facebook.com/jirka.machacek.56"
									target={"_blank"}
								>
									<Image src={fbIcon} alt="Facebook Icon" w={"18px"} h={"18px"}/>
								</Link>
							</Box>

							<Box _hover={{ currentColor: "#ADD4D9" }}>
								<Link
									href="https://www.instagram.com/jirimachacek.raw?igsh=MWg1a2xwbmxqeGxwdw=="
									target={"_blank"}
								>
									<Image src={igIcon} alt="Instagram Icon" w={"18px"} h={"18px"}/>
								</Link>
							</Box>
						</Flex>
					</Flex>

					{/* Hamburger */}
					<Flex display={{ base: "flex", lg: "none" }} opacity={isOpen ? 0 : 1}>
						<Image
							src={hamburgerIcon}
							style={{
								cursor: "pointer",
							}}
							onClick={onOpen}
						/>
					</Flex>

					<Drawer onClose={onClose} isOpen={isOpen} size={"xs"} zIndex={2} >
						<DrawerOverlay/>
						<DrawerContent bgGradient="linear(to-tr, gray.900, black)">
							<DrawerCloseButton color={"white"} size={"xs"} padding={5} />

							<DrawerBody border="none">
								<Flex mt={"64px"} flexDirection={"column"} alignItems={"space-between"}>
									<Flex flexDirection={"column"} gap={2} color={"white"}>
										<RouterLink
											to="photography"
											_hover={{ color: "white" }}
											onClick={onClose}
										>
											<Text fontSize={22} pl={2} py={2}>
												photography
											</Text>
										</RouterLink>
										<RouterLink
											to="about"
											_hover={{ color: "white" }}
											onClick={onClose}
										>
											<Text fontSize={22} pl={2} py={2}>
												about
											</Text>
										</RouterLink>
										<RouterLink
											to="contact"
											_hover={{ color: "white" }}
											onClick={onClose}
										>
											<Text fontSize={22} pl={2} py={2}>
												contact
											</Text>
										</RouterLink>
									</Flex>
									{/* Socials */}
									<Flex alignItems={"center"} width={"100%"} height={"36px"} justifyContent={"end"} gap="6px">
										<Box _hover={{ color: "#ADD4D9" }}>
											<a
												href="https://www.facebook.com/jirka.machacek.56"
												target={"_blank"}
											>
												<img src={fbIcon} alt="Facebook Icon" />
											</a>
										</Box>

										<Box _hover={{ color: "#ADD4D9" }}>
											<a
												href="https://www.instagram.com/jirimachacek.raw?igsh=MWg1a2xwbmxqeGxwdw=="
												target={"_blank"}
											>
												<img src={igIcon} alt="Instagram Icon"/>
											</a>
										</Box>
									</Flex>
								</Flex>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				</Flex>
			</Box>
		</Box>
	);
};

export default Navbar;
