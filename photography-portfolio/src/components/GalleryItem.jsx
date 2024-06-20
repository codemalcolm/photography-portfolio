import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const GalleryItem = (props) => {
    const {image} = props
    const { imageUrl, width, height } = image;
    const calculateGridSpan = (width, height) => {
      let style = {};
    
      if (width > 650) {
        style.gridColumn = 'span 2';
      } else if (height > 650) {
        style.gridRow = 'span 2';
      } else if (width === height) {
        style.gridColumn = 'span 2';
        style.gridRow = 'span 2';
      }
    
      return style;
    };
    const gridStyles = calculateGridSpan(width, height);

    
  return (
    <Box >
      <Image
        src={image.imageUrl} 

      />
    </Box>

  )
}

export default GalleryItem