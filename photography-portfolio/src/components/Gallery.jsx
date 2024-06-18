import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import koncertImg from "../assets/images/industrial.jpg"

const Gallery = () => {
  return (
    <Flex gap={32} justifyContent={"center"} alignItems={"center"} height={"100%"}>
        <Link to={`koncerty`}>
            <Flex flexDirection={"column"} position={"relative"}>
                <Box width={"285px"} minHeight={"285px"}>
                    <Image src={koncertImg} objectFit={"cover"}/>
                </Box>
                <Text color="white" position={"absolute"} left={"112px"}>
                    Koncerty
                </Text>
            </Flex>
        </Link>

        <Link to={`street`}>
            <Flex flexDirection={"column"} position={"relative"}>
                <Box width={"285px"} minHeight={"285px"}>
                    <Image src={koncertImg} objectFit={"cover"}/>
                </Box>
                <Text color="white" position={"absolute"} left={"112px"}>
                Street
                </Text>
            </Flex>
        </Link>
        <Link to={`art`}>
            <Flex flexDirection={"column"} position={"relative"}>
                <Box width={"285px"} minHeight={"285px"}>
                    <Image src={koncertImg} objectFit={"cover"}/>
                </Box>
                <Text color="white" position={"absolute"} left={"112px"}>
                    Art
                </Text>
            </Flex>
        </Link>
    </Flex>
  )
}

export default Gallery