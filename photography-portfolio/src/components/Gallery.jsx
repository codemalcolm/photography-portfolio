import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import koncertImg1 from "../assets/images/Zizkovska_noc/_X3A0706-Edit-Edit.jpg"
import koncertImg2 from "../assets/images/wings.jpg"

const Gallery = () => {
  return (
    <Flex gap={18} justifyContent={"center"} alignItems={"center"} height={"100%"} width={"100%"}>
       

        <Link to={`art`} >
            <Flex flexDirection={"column"} position={"relative"} _hover={{opacity:"0.8" ,color:"white"}}>
                <Box maxWidth={"750px"} minWidth={"285px"} minHeight={"285px"} padding={"16px"}>
                    <Image src={koncertImg2} objectFit={"cover"}/>
                </Box>
                <Text fontSize={"22px"} fontWeight={500} color="white" position={"absolute"} left={"47%"} top={"45%"} textAlign={"center"}>
                    Art
                </Text>
            </Flex>
        </Link>
    </Flex>
  )
}

export default Gallery