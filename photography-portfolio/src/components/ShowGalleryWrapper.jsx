import React from 'react';
import { useParams } from 'react-router-dom';
import PhotoCarousel from './PhotoCarousel';
import GalleryItem from './GalleryItem';
import PhotoGallery from './PhotoGallery';
import useGetPhotos from '../hooks/useGetPhotos';

const ShowGalleryWrapper = ({ showsData }) => {
  const { showId } = useParams();
  const {isLoading, posts} = useGetPhotos(showId)
  
  const images = [
    {
        name: 'Forest Path',
        imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        category: 'nature'
    },
    {
        name: 'City Skyline',
        imageUrl: 'https://images.unsplash.com/photo-1518300648855-25d2b486dfb7',
        category: 'architecture'
    },
    {
        name: 'Mountain Lake',
        imageUrl: 'https://images.unsplash.com/photo-1541233349642-6e425fe6190e',
        category: 'nature'
    },
    {
        name: 'Delicious Meal',
        imageUrl: 'https://images.unsplash.com/photo-1514516871883-b38d2c8c51f8',
        category: 'food'
    },
    {
        name: 'People in the City',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        category: 'people'
    },
    {
        name: 'Modern Building',
        imageUrl: 'https://images.unsplash.com/photo-1496317556649-4f9377266c0d',
        category: 'architecture'
    },
    {
        name: 'Tech Workspace',
        imageUrl: 'https://images.unsplash.com/photo-1517430816045-df4b7de01f35',
        category: 'technology'
    },
    {
        name: 'Sunset over Forest',
        imageUrl: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1',
        category: 'nature'
    },
    {
        name: 'Gourmet Dish',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
        category: 'food'
    },
    {
        name: 'Urban Lifestyle',
        imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
        category: 'people'
    },
    {
        name: 'Office Setup',
        imageUrl: 'https://images.unsplash.com/photo-1531497865145-91cdaac62e11',
        category: 'technology'
    },
    {
        name: 'Mountain Path',
        imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        category: 'nature'
    },
    {
        name: 'City Lights',
        imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        category: 'architecture'
    },
    {
        name: 'Forest Trail',
        imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        category: 'nature'
    },
    {
        name: 'Healthy Breakfast',
        imageUrl: 'https://images.unsplash.com/photo-1514516871883-b38d2c8c51f8',
        category: 'food'
    },
    {
        name: 'City People',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        category: 'people'
    },
    {
        name: 'Modern Office',
        imageUrl: 'https://images.unsplash.com/photo-1517430816045-df4b7de01f35',
        category: 'technology'
    },
    {
        name: 'Nature View',
        imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        category: 'nature'
    },
    {
        name: 'Culinary Art',
        imageUrl: 'https://images.unsplash.com/photo-1514516871883-b38d2c8c51f8',
        category: 'food'
    },
    {
        name: 'City Crowd',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        category: 'people'
    }
];

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
