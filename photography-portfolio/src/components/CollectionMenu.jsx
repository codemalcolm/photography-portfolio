import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import PhotoCarousel from './PhotoCarousel';
import ShowCarouselWrapper from './ShowCarouselWrapper';



const CollectionMenu = (props) => {
    const {data} = props
    return (
      <Box>
        <h1>CollectionMenu</h1>
        <VStack spacing={4}>
        {data?.map((show) => (
          <Link key={show.id} to={`carousel/${show.id}`}>
            {show.title}
          </Link>
        ))}
      </VStack>
        {/* <Routes>
          <Route path="gallery/*" element={<div>We here lol</div>} />
          <Route path="carousel" element={<div>ssssssssss</div>} />
        </Routes> */}
      </Box>
    );
  };
    
  export default CollectionMenu;