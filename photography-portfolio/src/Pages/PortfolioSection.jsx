import { Box, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import jiriImg from "../assets/images/portfolio_section.png"
import { Link, Route, Routes,} from 'react-router-dom'
import Cars from '../components/Cars'
import Animals from '../components/Animals'

const PortfolioSection = () => {

  return (
    
    <Box
		style={{ height: "100vh"}}
    backgroundColor={"red"}
		>
        <Text fontSize={"36px"}><Link to={`/#photography`}>BACK</Link></Text>
        <Link to={`cars`}>Cars</Link>
        <Link to={`animals`}>Animals</Link>

        <Routes>
          <Route path="/" element={<h3>Please select a category.</h3>} />
          <Route path="cars" element={<Cars />} />
          <Route path="animals" element={<Animals />} />
      </Routes>
    </Box>
  )
}

export default PortfolioSection