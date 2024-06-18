import React from 'react'
import GalleryItem from './GalleryItem'

const PhotoGallery = (props) => {
    const {slides} = props
  return (
    <div>
       { slides.map((image) => (
        <GalleryItem key={image.id} image={image} />
        ))}
    </div>
  )
}

export default PhotoGallery