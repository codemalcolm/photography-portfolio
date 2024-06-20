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

  const data = [
    {
      id: 'show1',
      title: 'Show 1',
      description: 'Description for Show 1. This show features an array of stunning visuals and performances.',
      photos:"",
    },
    {
      id: 'show2',
      title: 'Show 2',
      description: 'Description for Show 2. This show explores the boundaries of modern art and digital media.',
      photos: [
        // Add photos data here if needed
      ],
    },
    {
      id: 'show3',
      title: 'Show 3',
      description: 'Description for Show 3. A collection of works showcasing the vibrant colors of urban life.',
      photos: [
        // Add photos data here if needed
      ],
    },
    {
      id: 'show4',
      title: 'Show 4',
      description: 'Description for Show 4. A journey through the landscapes of nature and the sublime.',
      photos: [
        // Add photos data here if needed
      ],
    },
    {
      id: 'show5',
      title: 'Show 5',
      description: 'Description for Show 5. An exploration of abstract forms and geometries in contemporary art.',
      photos: [
        {
          id: 238476,
          name: 'Cityscape',
          description: 'A majestic mountain range.',
          imageUrl: 'https://images.unsplash.com/photo-1718384909687-3dba6949d84f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 765843,
          name: 'Ocean',
          description: 'A serene forest.',
          imageUrl: 'https://images.unsplash.com/photo-1717131879398-b92a8dc6eaf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 983745,
          name: 'Forest',
          description: 'A beautiful view of the sunset.',
          imageUrl: 'https://images.unsplash.com/photo-1718486182950-88d67ee8d734?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
        },
        {
          id: 123678,
          name: 'Sunset',
          description: 'A vast ocean.',
          imageUrl: 'https://images.unsplash.com/photo-1718421670854-dd312e834f35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 456732,
          name: 'Mountain',
          description: 'A bustling cityscape.',
          imageUrl: 'https://plus.unsplash.com/premium_photo-1718146019339-0b1bbd663523?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
        },
      ],
    },
  ];
 
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