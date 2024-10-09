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

        <div className="grid--main">
            { photos.map((photo) => (
                <div className="grid__item-container" key={photo.id}>
                    <img className="grid__item-image" key={photo.id} src={photo.url} fetchpriority='high'/>
                </div>
            ))}

        </div>
    </Box>
  )
}

export default Gallery