import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Navbar = () => {
	return (
		<Box
			border={"solid black 1px"}
			px={6}
			py={3}
			flex={1}
			w={{ base: "calc(100% - 70px)", md: "calc(100% - 540px)" }}
			mx={"auto"}
			bgGradient='linear(to-r, green.100 0%, green.200 10%, green.400 50%)'
			opacity={"60%"}
			backdropFilter={blur("10px")}
			position={"absolute"}
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
				<Flex gap={10} alignItems={"center"}>
					<Link to="/">exhibitions</Link>
					<Link to="/">portfolio</Link>
					<Link to="/">about</Link>
					<Flex gap={2}>
						<Link to="/">
							<FaFacebook />
						</Link>
						<Link to="/">
							<FaInstagram />
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Navbar;
