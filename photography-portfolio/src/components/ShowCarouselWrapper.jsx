import React from 'react';
import { useParams } from 'react-router-dom';
import PhotoCarousel from './PhotoCarousel';
import useGetPhotos from '../hooks/useGetPhotos';

const ShowCarouselWrapper = ({ showsData }) => {
  const { showId } = useParams();

  const {isLoading, posts} = useGetPhotos(showId)

  if(!isLoading) console.log(posts, "herere");

  console.log('ShowCarouselWrapper rendered'); // Check if component renders
  console.log('showId:', showId); // Log showId to verify extraction

  // const show = showsData.find((show) => show.id === showId);
  // console.log('show:', show); // Log show data to verify

  // if (!show) {
  //   console.log('Show not found'); // Log if show is not found
  //   return <div>Show not found</div>;
  // }

  const slides = posts.map((photo) => ({
    id: photo.id || [],
    name: photo.name || 'No name found',
    category: photo.category || 'No description found',
    imageUrl: photo.imageUrl || null,
  }));

  console.log('slides:', slides); // Log slides data to verify

  const options = {
    dragFree: false,
    containScroll: false,
  };

  return <PhotoCarousel slides={slides} options={options} showId={showId}/>;
};

export default ShowCarouselWrapper;
