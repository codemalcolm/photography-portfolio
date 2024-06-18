import React from 'react'

const GalleryItem = (props) => {
    const {image} = props
  return (
    <img src={image.imageUrl} />
  )
}

export default GalleryItem