import React from 'react'
import useFetchPhotosByIds from '../hooks/useFetchPhotosByIds';
import useGetCollectionName from '../hooks/PhotoCollection/useGetCollectionName';
import useFetchPhotoIdsByCollection from '../hooks/PhotoCollection/useFetchPhotoIdsByCollection';
import { Box } from '@chakra-ui/react';


const Gallery = () => {
    const collectionId= "1XpHp9mPSbghndA2zuEc"
    const { photoIds, isLoading, error } = useFetchPhotoIdsByCollection(collectionId); // Fetch the specific collection
    const {collectionName, loading: nameLoading, error : nameError } = useGetCollectionName(collectionId)
    const { photos, loading: photosLoading, error: photosError} = useFetchPhotosByIds(photoIds);
  return (
    <Box width="100%" height="100%" minHeight="100vh" zIndex={999}>

        {/* grid--main */}
        <div className="gallery"> 
            { photos.map((photo) => (
                // grid__item-container
                <div className="pic" key={photo.id}>
                    <img className="img-lol" key={photo.id} src={photo.url} fetchpriority='high'/>
                </div>
            ))}

        </div>
    </Box>
  )
}

export default Gallery