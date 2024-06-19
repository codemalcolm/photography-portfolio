import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import koncertImg1 from "../assets/images/Zizkovska_noc/_X3A0706-Edit-Edit.jpg"
import koncertImg2 from "../assets/images/wings.jpg"

const Gallery = () => {
  return (
    <Flex gap={18} justifyContent={"center"} alignItems={"center"} height={"100%"} width={"100%"}>
        <Link to={`shows`}>
            <Flex flexDirection={"column"} position={"relative"}>
                <Box width={"750px"} minWidth={"285px"} minHeight={"285px"}>
                    <Image src={koncertImg1} objectFit={"cover"}/>
                </Box>
                <Text color="white" position={"absolute"} left={"45%"} textAlign={"center"}>
                    Shows
                </Text>
            </Flex>
        </Link>

        <Link to={`art`}>
            <Flex flexDirection={"column"} position={"relative"}>
                <Box width={"750px"} minWidth={"285px"} minHeight={"285px"} >
                    <Image src={koncertImg2} objectFit={"cover"}/>
                </Box>
                <Text color="white" position={"absolute"} left={"50%"} textAlign={"center"}>
                    Art
                </Text>
            </Flex>
        </Link>
    </Flex>
  )
}

export default Gallery