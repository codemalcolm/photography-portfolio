import React from 'react'
import GalleryItem from './GalleryItem'
import { Box,Text } from '@chakra-ui/react'

const PhotoGallery = (props) => {
    const {slides,show} = props

  return (


    <Box>
      <Text fontSize="28px" mb={"32px"} textAlign={"center"}>{show.collectionName}</Text>
        <div className="scrolling-wrapper">
          <div className="grid-wrapper">
            { slides.map((image) => (
              <GalleryItem key={image.id} image={image} />
              ))}
          </div>
        </div>
    </Box>
  )
}

export default PhotoGallery