import React from 'react';
import { useParams } from 'react-router-dom';
import PhotoCarousel from './PhotoCarousel';
import GalleryItem from './GalleryItem';
import PhotoGallery from './PhotoGallery';
import useGetPhotos from '../hooks/useGetPhotos';

const ShowGalleryWrapper = ({ showsData }) => {
  const { showId } = useParams();
  const {isLoading, posts} = useGetPhotos(showId)
  
  

  console.log('ShowCarouselWrapper rendered'); // Check if component renders
  console.log('showId:', showId); // Log showId to verify extraction

  const show = showsData.find((show) => show.id === showId);
  console.log('show:', show); // Log show data to verify

  if (!show) {
    console.log('Show not found'); // Log if show is not found
    return <div>Show not found</div>;
  }

  const slides = posts.map((photo) => ({
    id: photo.name || [],
    name: photo.name || 'No name found',
    category: photo.category || 'No description found',
    imageUrl: photo.imageUrl || null,
  }));

  console.log('slides:', slides); // Log slides data to verify

  const options = {
    dragFree: false,
    containScroll: false,
  };

  return (
    <PhotoGallery slides={slides} show={show}/>
  )
};

export default ShowGalleryWrapper;
