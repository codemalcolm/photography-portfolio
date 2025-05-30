import { Flex, Link, Text } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Flex
      width={"100%"}
      justifyContent={"start"}
      alignItems={"center"}
      margin={"0 auto"}
      flexDir={"column"}
      mt={"64px"}
      overflow={"auto"}
      color={"#ffffff"}
    >
      <Flex
        maxW={{ sm: "1650px", base: "850px" }}
        minW={{ sm: "450px", base: "350px" }}
        justifyContent={"center"}
        flexDir="column"
      >
        <Flex
          flexDir="column"
          gap={"12px"}
          mt={"12px"}
          px={{ sm: "0px", md: "16px", base: "8px" }}
        >
          <Flex flexDir="column">
            <Text>Born in Czech Republic</Text>
            <Text>Based in Prague</Text>
            <Text>2022-2025 - study of photography at Akademie Michael</Text>
          </Flex>
          <Text fontSize={"22px"}>Exhibitions</Text>
          <Flex flexDir={"column"} gap={"4px"}>
            <Flex gap={"8px"}>
              <Text>2024</Text>
              <Text>-</Text>
              <Link href="https://www.akademiemichael.cz/pozvanka-na-vernisaz-vystavy-dvojite-videni/" target="_blank">
                Dvojité Vidění | 400 ASA, Praha
              </Link>
            </Flex>
            <Flex gap={"8px"}>
              <Text>2024</Text>
              <Text>-</Text>
              <Text>Teraformace & Spoty | Prague Photo Festival, Praha</Text>
            </Flex>
          </Flex>
          <Text fontSize={"22px"}>Awards</Text>
          <Flex flexDir={"column"} gap={"4px"}>
            <Flex gap={"8px"}>
              <Text>2024</Text>
              <Text>-</Text>
              <Text>Prague Photo Young Award 2024</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutPage;
