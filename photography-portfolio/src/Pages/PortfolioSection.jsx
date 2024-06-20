import { Box, Text,  } from '@chakra-ui/react'
import jiriImg from "../assets/images/portfolio_section.png"
import { Link, Route, Routes, useLocation,useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Shows from './Shows'
import Street from './Street'
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
    backgroundColor={"#F5F5F5"}
    overflowY={"hidden"}
		>
    <Box display={location.pathname === "/photography" ? "none" : "block"}>
        <Box h={"75px"} w={"75px"} onClick={handleGoBack} style={{ cursor: 'pointer' }}>
            <MdOutlineKeyboardBackspace style={{height:"75px", width:"75px"}}/>
        </Box>
      </Box>
       

        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="shows/*" element={<Shows />} />
          <Route path="street" element={<Street />} />
          <Route path="art/*" element={<Art />} />
      </Routes>
    </Box>
  )
}

export default PortfolioSection