import { Box } from '@chakra-ui/react'

import jiriImg from "../assets/images/exhibitions_section.png"

const ExhibitionSection = () => {
  return (
    <Box
		style={{ height: "100vh", width:"100%"}}
		>
			<img src={jiriImg} alt="Landing" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </Box>
  )
}

export default ExhibitionSection