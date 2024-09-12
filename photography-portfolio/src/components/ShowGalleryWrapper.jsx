import React from 'react';
import { useParams } from 'react-router-dom';
import PhotoCarousel from './PhotoCarousel';
import GalleryItem from './GalleryItem';
import PhotoGallery from './PhotoGallery';
import useGetPhotos from '../hooks/useGetPhotos';
import img1 from '../assets/images/small/_1240933-Edit.webp';
import img2 from '../assets/images/small/_1260005-Edit.webp';
import img3 from '../assets/images/small/_1280213-Edit.webp';
import img4 from '../assets/images/small/_X3A0981-Edit-Edit.webp';
import img5 from '../assets/images/small/_X3A0989-Edit.webp';
import img6 from '../assets/images/small/_X3A2419-Edit-2-norma-2.webp';
import img7 from '../assets/images/small/_X3A2196-Edit-Edit.webp';
import img8 from '../assets/images/small/_X3A2447-Edit-2-Edit.webp';
import img9 from '../assets/images/small/_X3A6748-Edit-Edit.webp';
import img10 from '../assets/images/small/_X3A6694-Edit.webp';

const ShowGalleryWrapper = ({ showsData }) => {
  const { showId } = useParams();
  const {isLoading, posts} = useGetPhotos(showId)
  
  // const items = [
  //   {
  //     id: "1",
  //     name: "Sunset Vista",
  //     category: "Nature",
  //     imageUrl: img1
  //   },
  //   {
  //     id: "2",
  //     name: "City Skyline",
  //     category: "Architecture",
  //     imageUrl: img2
  //   },
  //   {
  //     id: "3",
  //     name: "Abstract Shapes",
  //     category: "Abstract",
  //     imageUrl: img3
  //   },
  //   {
  //     id: "4",
  //     name: "Circuit Board",
  //     category: "Technology",
  //     imageUrl: img4
  //   },
  //   {
  //     id: "5",
  //     name: "Mountain Peak",
  //     category: "Nature",
  //     imageUrl: img5
  //   },
  //   {
  //     id: "6",
  //     name: "Urban Alley",
  //     category: "Architecture",
  //     imageUrl: img6
  //   },
  //   {
  //     id: "7",
  //     name: "Colorful Patterns",
  //     category: "Abstract",
  //     imageUrl: img7
  //   },
  //   {
  //     id: "8",
  //     name: "Microchip Closeup",
  //     category: "Technology",
  //     imageUrl: img8
  //   },
  //   {
  //     id: "9",
  //     name: "River Bend",
  //     category: "Nature",
  //     imageUrl: img9
  //   },
  //   {
  //     id: "10",
  //     name: "Glass Building",
  //     category: "Architecture",
  //     imageUrl: img10
  //   }
  // ];

  // console.log('ShowCarouselWrapper rendered'); // Check if component renders
  // console.log('showId:', showId); // Log showId to verify extraction

  const show = showsData.find((show) => show.id === showId);
  // console.log('show:', show); // Log show data to verify

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



  // console.log('slides:', slides); // Log slides data to verify

  const options = {
    dragFree: false,
    containScroll: false,
  };

  return (
    <PhotoGallery slides={slides} show={show}/>
  )
};

export default ShowGalleryWrapper;
