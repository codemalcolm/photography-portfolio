import { Box, Image } from '@chakra-ui/react'



const GalleryItem = (props) => {
    const {image} = props
    const { url, width, height } = image;
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
    <div>
      <img
        src={image.url} 
        fetchpriority="high"
        loading='lazy'
      />
    </div>

  )
}

export default GalleryItem