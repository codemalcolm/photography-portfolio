import { Box } from '@chakra-ui/react'
import React from 'react'
import jiriImg from "../assets/images/portfolio_section.png"

const PortfolioSection = () => {
  return (
    <Box
		style={{ height: "100vh"}}
		>
			<img src={jiriImg} alt="Landing" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </Box>
  )
}

export default PortfolioSection