import { Flex, Image, Text } from "@chakra-ui/react";
import profileImage from "../assets/images/profilovka.webp";

const ContactPage = () => {
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
      <Text mb={"16px"} fontSize={"18px"}>
        machacek_foto@proton.me
      </Text>
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
