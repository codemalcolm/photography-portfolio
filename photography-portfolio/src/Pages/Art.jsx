import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import ShowGalleryWrapper from "../components/ShowGalleryWrapper"
import CollectionMenu from "../components/CollectionMenu"
import ShowCarouselWrapper from "../components/ShowCarouselWrapper"
import useGetCategories from "../hooks/useGetCategories"

const Art = () => {
  const {isLoading, categories} = useGetCategories("art")
  if(!isLoading){
    console.log(categories,"photos here")
  }
  return (
    <>
      <Box id='lol'>

        <Routes>
            <Route path="/" element={<CollectionMenu data={categories}/>} />
            <Route path="carousel/:showId" element={<ShowCarouselWrapper showsData={categories}/>} />
            <Route path="gallery/:showId" element={<ShowGalleryWrapper showsData={categories}/>} />
        </Routes>

      </Box>

    </>
  )
}

export default Art