import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import EmblaCarousel from '../components/EmblaCarousel/EmblaCarousel'
import '../components/EmblaCarousel/css/base.css'
import '../components/EmblaCarousel/css/embla.css'
import PhotoCarousel from "../components/PhotoCarousel"
import { Link, Route, Routes } from 'react-router-dom'
import CollectionMenu from '../components/CollectionMenu'
import { CgCarousel } from 'react-icons/cg'
import ShowCarouselWrapper from '../components/ShowCarouselWrapper'
import ShowGalleryWrapper from '../components/ShowGalleryWrapper'
import useGetPhotos from '../hooks/useGetPhotos'
import useGetCategories from '../hooks/useGetCategories'

const Shows = () => {
  
// const {isLoading, posts} = useGetPhotos("zizkovska-noc")
const {isLoading, categories} = useGetCategories()
  if(!isLoading){
    console.log(categories,"photos here")
  }

  return (
    <>
      <Box id='lol' overflowY={"hidden"}>

        <Routes>
            <Route path="/" element={<CollectionMenu data={categories}/>} />
            <Route path="carousel/:showId" element={<ShowCarouselWrapper showsData={categories}/>} />
            <Route path="gallery/:showId" element={<ShowGalleryWrapper showsData={categories}/>} />
        </Routes>

      </Box>

    </>
  )
}

export default Shows