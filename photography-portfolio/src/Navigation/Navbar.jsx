import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import useSmoothScroll from "../hooks/useSmoothScroll";

const Navbar = () => {
	const { scrollTo } = useSmoothScroll();



	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box position={"relative"} zIndex={999}>
			<Box
				px={6}
				py={3}
				flex={1}
				w={{ base: "calc(100% - 70px)", md: "calc(100% - 540px)"}}
				mx={"auto"}
				bgGradient="linear(to-r, green.100 0%, green.200 10%, green.400 50%)"
				opacity={"70%"}
				backdropFilter={blur("10px")}
				position={"absolute"}
				left={"50%"}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -5%)",
				}}
			>
				<Flex justifyContent={"space-between"} alignItems={"center"}>
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
						<Box>Jiří Macháček</Box>
					</Flex>
					{/* Navbar links */}
					<Flex
						gap={10}
						alignItems={"center"}
						color={"black"}
						display={{ base: "none", lg: "flex" }}
					>
						<Flex gap={10}>
							<Box _hover={{ color: "white" }}>
								<Link to="/">portfolio</Link>
							</Box>
							<Box _hover={{ color: "white" }}>
								<Link to="/">about</Link>
							</Box>
							<Box _hover={{ color: "white" }}>
								<Link to="/">exhibitions</Link>
							</Box>
						</Flex>
						<Flex gap={2}>
							<Box _hover={{ color: "white" }}>
								<Link to="/">
									<FaFacebook />
								</Link>
							</Box>

							<Box _hover={{ color: "white" }}>
								<Link to="/">
									<FaInstagram />
								</Link>
							</Box>
						</Flex>
					</Flex>
					{/* Hamburger */}
					<Flex display={{ base: "flex", lg: "none" }}>
						<CgMenuRight
							style={{
								width: "25px",
								height: "25px",
								cursor: "pointer",
							}}
							onClick={onOpen}
						/>
					</Flex>
					<Drawer onClose={onClose} isOpen={isOpen} size={"xs"} zIndex={999}>
						<DrawerOverlay />
						<DrawerContent
							bgGradient="linear(to-t, green.100 1%, green.200 15%, green.400 84%)"
							opacity={"75%"}
							backdropFilter={blur("10px")}
						>
							<DrawerCloseButton />
							<DrawerHeader>Jiří Macháček</DrawerHeader>
							<DrawerBody>
								<Flex flexDirection={"column"} gap={2} >
									<Box fontSize={22} pl={2} py={2} _hover={{color:"white"}}>
										<Link>portfolio</Link>
									</Box>
									<Box fontSize={22} pl={2} py={2} _hover={{color:"white"}}>
										<Link>about</Link>
									</Box>
									<Box fontSize={22} pl={2} py={2} _hover={{color:"white"}}>
										<Link>exhibitions</Link>
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
