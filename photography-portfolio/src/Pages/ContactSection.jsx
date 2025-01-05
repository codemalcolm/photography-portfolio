import {
	Box,
	Flex,
	Image,
	keyframes,
	ListItem,
	Text,
	UnorderedList,
    Link
} from "@chakra-ui/react";
import React, { useState } from "react";
import emailIcon from "../assets/icons/email.svg";
import facebookIcon from "../assets/icons/fb-icon.svg";
import instagramIcon from "../assets/icons/ig-icon.svg";


const ContactSection = () => {
	const [copied, setCopied] = useState(false);
	const copyToClipboard = (textToCopy) => {
		navigator.clipboard.writeText(textToCopy).then(
			() => {
				setCopied(true); // Show "Copied!" message
				setTimeout(() => setCopied(false), 4000); // Hide after 2 seconds
			},
			(err) => {
				console.error("Failed to copy: ", err);
			}
		);
	};

	// Define keyframes for fade-in and fade-out
	const fadeInOut = keyframes`
        0% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; }
        `;

	return (
		<Flex
			style={{ height: "100vh" }}
			width={"100%"}
			alignItems={"center"}
			margin={"0 auto"}
			flexDir={"column"}
		>
			<Flex
				flexDir={{ sm: "row", base: "column" }}
				gap={{ sm: 16, base: 8 }}
				mt={"96px"}
			>
				<Flex
					flexDir="column"
					color={"#ffffff"}
					listStyleType={"none"}
					gap={"4px"}
				>
					<Link href="https://www.instagram.com/jirimachacek.raw?igsh=MWg1a2xwbmxqeGxwdw==" target="_blank">
						<Flex my="8px" gap={4} alignItems={"center"}>
							<Image src={instagramIcon} alt="instagram-icon" />
							<Text>@jirimachacek.raw</Text>
						</Flex>
					</Link>
					<Link href="https://www.facebook.com/jirka.machacek.56" target="_blank">
						<Flex my="8px" gap={4} alignItems={"center"}>
							<Image src={facebookIcon} alt="facebook-icon" />
							<Text>Jiří Macháček</Text>
						</Flex>
					</Link>

					<Flex
						my="8px"
						gap={4}
						onClick={() => copyToClipboard("machy1106@gmail.com")}
						cursor={"pointer"}
						position={"relative"}
						alignItems={"center"}
					>
						<Image src={emailIcon} alt="email-icon" />
						<Text>machy1106@gmail.com</Text>
						{copied && (
							<Box
								position="absolute"
								right="-65px"
								backgroundColor="green"
								color="white"
								borderRadius="5px"
								zIndex={1000}
								fontSize="14px"
								padding="4px"
								animation={`${fadeInOut} 4s ease-in-out`}
								pointerEvents="none" // Prevent interaction
							>
								Copied!
							</Box>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ContactSection;
