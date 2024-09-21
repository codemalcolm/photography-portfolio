import React from 'react'
import GalleryItem from './GalleryItem'
import { Box,Text } from '@chakra-ui/react'
import useFetchPhotoIdsByCollection from '../hooks/PhotoCollection/useFetchPhotoIdsByCollection';
import useFetchPhotosByIds from '../hooks/useFetchPhotosByIds';
import { useParams } from 'react-router-dom';

const PhotoGallery = () => {
  const { collectionId } = useParams(); // Get collectionId from URL params
  const { photoIds, isLoading, error } = useFetchPhotoIdsByCollection(collectionId); // Fetch the specific collection
  const { photos, loading: photosLoading, error: photosError} = useFetchPhotosByIds(photoIds);

  return (
    <Box>
      {/* <Text fontSize="28px" mb={"32px"} textAlign={"center"}>{show.collectionName}</Text> */}
        <div className="scrolling-wrapper">
          <div className="grid-wrapper">
            { photos.map((image) => (
              <GalleryItem key={image.id} image={image} />
              ))}
          </div>
        </div>
    </Box>
  )
}

export default PhotoGallery