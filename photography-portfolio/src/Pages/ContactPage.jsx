import { Box, Flex, Image, keyframes, Text, Link } from "@chakra-ui/react";
import { useState } from "react";
import emailIcon from "../assets/icons/email.svg";
import facebookIcon from "../assets/icons/fb-icon.svg";
import instagramIcon from "../assets/icons/ig-icon.svg";
import profileImage from "../assets/images/profilovka.webp";

const ContactPage = () => {
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
			// style={{ height: "100vh" }}
			width={"100%"}
			justifyContent={"start"}
			alignItems={"center"}
			margin={"0 auto"}
			flexDir={"column"}
			mt={"64px"}
			overflow={"auto"}
			color={"#ffffff"}
		>
			<Text mb={"16px"} fontSize={"18px"}>machacek_foto@proton.me</Text>
			<Flex
				maxW={{ sm: "850px", base: "850px" }}
				minW={{ sm: "450px", base: "350px" }}
				justifyContent={"center"}
				flexDir="column"
			>
				<Image src={profileImage} alt="profile-photo" objectFit={"cover"} />
				
			</Flex>
		</Flex>
	);
};

export default ContactPage;
