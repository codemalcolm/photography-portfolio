import GalleryItem from './GalleryItem'
import { Box,Flex,Image,Spinner,Text, VStack } from '@chakra-ui/react'
import useFetchPhotoIdsByCollection from '../hooks/PhotoCollection/useFetchPhotoIdsByCollection';
import useFetchPhotosByIds from '../hooks/useFetchPhotosByIds';
import { useParams, Link as RouterLink } from 'react-router-dom';
import useGetCollectionName from '../hooks/PhotoCollection/useGetCollectionName';
import BackArrow from './BackArrow';
import CarouselIcon from "../assets/icons/carousel.svg"

const PhotoGallery = (props) => {
  const {categoryId} = props
  const { collectionId } = useParams(); // Get collectionId from URL params
  const { photoIds, isLoading, error } = useFetchPhotoIdsByCollection(collectionId); // Fetch the specific collection
  const {collectionName, loading: nameLoading, error : nameError } = useGetCollectionName(collectionId)
  const { photos, loading: photosLoading, error: photosError} = useFetchPhotosByIds(photoIds);
  
  if (photosLoading) {
    return (
      <Box
      position="fixed" // Make sure the Box takes up the entire viewport and stays in place
      top="0" 
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(0, 0, 0, 0.1)" // Optional: add a translucent background
      zIndex="1000" // Ensure the spinner stays above other content
      transition="opacity 1s ease-in-out"
    >
      <Spinner size="xl" />
    </Box>
    );
  }
  return (
    <>
      <VStack>
        <Text fontSize="28px" mb={"32px"} textAlign={"center"}>{collectionName}</Text>
          <div className="scrolling-wrapper2">
            <div className="grid-wrapper">
              { photos.map((image) => (
                <GalleryItem key={image.id} image={image} />
                ))}
            </div>
          </div>
      </VStack>
    </>
  )
}

export default PhotoGallery