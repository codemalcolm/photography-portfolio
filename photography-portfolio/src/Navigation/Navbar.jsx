import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";


const Navbar = () => {
	// const { scrollContainerRef, scrollToSection } = useSmoothScroll();
	// const { scrollToSection } = useSmoothScrollContext();
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
				w={{ base: "calc(100% - 70px)", md: "calc(100% - 540px)" }}
				mx={"auto"}
				opacity={"85%"}
				left={"50%"}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -5%)",
				}}
				// bgGradient="linear(to-r, green.100 0%, green.200 10%, green.400 50%)"
				bgColor={"#090D0B"}
			>
				<Flex justifyContent={"space-between"} alignItems={"center"}
				color={"white"}>
					<Flex alignItems={"center"} justifyContent={"center"} gap={3}>
						<Box
							backgroundColor={"lightgray"}
							rounded={"full"}
							width={25}
							height={25}
							textAlign={"center"}
						>
							i
						</Box>
						<Link to={"/"}>
							<Box
							display={{base:"none", lg:"block"}} 
							_hover={{ color: "#ADD4D9" }}
							cursor={"pointer"}
							>
							Jiří Macháček
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
						<Flex gap={10} >
							<Box
								_hover={{ color: "#ADD4D9" }}
								onClick={() => handleNavLinkClick("#about")}
	
							>
								<Link to="about">about</Link>
							</Box>

							<Box
								_hover={{ color: "#ADD4D9" }}
								onClick={() => handleNavLinkClick("#photography")}
							>
								<Link to="photography">photography</Link>
							</Box>

						</Flex>

						<Flex gap={2}>
							<Box _hover={{ color: "#ADD4D9" }}>
								<a href="https://www.instagram.com/jirimachacek.raw?igsh=MWg1a2xwbmxqeGxwdw==" target={"_blank"}>
									<img src={fbIcon} alt="Facebook Icon"/>
								</a>
							</Box>

							<Box _hover={{ color: "#ADD4D9" }}>
								<a href="https://www.instagram.com/jirimachacek.raw?igsh=MWg1a2xwbmxqeGxwdw==" target={"_blank"}>
								<img src={igIcon} alt="Instagram Icon"/>
								</a>
							</Box>
						</Flex>
					</Flex>

					{/* Hamburger */}
					<Flex display={{ base: "flex", lg: "none" }} opacity={ isOpen ? 0 : 1}>
						<img src={hamburgerIcon}
							style={{
								cursor: "pointer",
							}}
							onClick={onOpen}
						/>
					</Flex>

					<Drawer onClose={onClose} isOpen={isOpen} size={"xs"} zIndex={2}>
						<DrawerOverlay />
						<DrawerContent
							bgGradient="linear(to-tr, gray.900, black)"
							opacity={"75%"}
							backdropFilter={"blur(10px)"}
						>
							<DrawerCloseButton color={"white"}/>

							<DrawerBody>
								<Flex flexDirection={"column"} gap={2} color={"white"} mt={"32px"}>
									<Box 
										fontSize={22} pl={2} py={2} 
										_hover={{ color: "white" }}
										onClick={
											onClose
									// () => handleNavLinkClick("#about")
									}
									>
										<Link to="about">about</Link>
									</Box>

									<Box
										fontSize={22}
										pl={2}
										py={2}
										_hover={{ color: "white" }}
										onClick={onClose}
									>
										<Link to="photography">photography</Link>
									</Box>

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
