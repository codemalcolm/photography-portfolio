import { Box, Text,  } from '@chakra-ui/react'

import { Link, Route, Routes, useLocation,useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Art from './Art'
import Gallery from '../components/Gallery'

const PortfolioSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step
  };
  return (
    
    <Box
		style={{ height: "100vh"}}
    bgGradient='linear(to-tr, black, gray.900)'
    backgroundColor={"#F5F5F5"}
    overflowY={"hidden"}
    fontWeight={700} fontFamily={"Oswald"} color={"white"}
		>
    <Box display={location.pathname === "/photography" ? "none" : "block"} mt={{base:"40px" ,lg:"0px"}}>
        <Box h={"75px"} w={"75px"} onClick={handleGoBack} style={{ cursor: 'pointer' }}>
            <MdOutlineKeyboardBackspace style={{height:"75px", width:"75px" ,color:"white"}}/>
        </Box>
      </Box>
       

        <Routes>
          <Route path="/" element={<Gallery />} />
          {/* <Route path="shows/*" element={<Shows />} />
          <Route path="street" element={<Street />} /> */}
          <Route path="art/*" element={<Art />} />
      </Routes>
    </Box>
  )
}

export default PortfolioSection