import React from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Collections from './Collections';
import useFetchCategories from '../hooks/Category/useFetchCategories';
import Categories from '../components/Categories';
const LazyCollections = React.lazy(() => import("./Collections"))

const PortfolioSection = () => {
  const { categories, loading } = useFetchCategories();

  return (
    <Box
      style={{ height: '100vh' }}
      bg="#101118"
      overflowY="hidden"
      color="white"
      fontWeight={700}
      fontFamily="Oswald"
    >
      <Routes>
        <Route path="/" element={<Categories categories={categories} isLoading={loading} />} />
        {/* Route to display collections for a selected category */}
        <Route path=":categoryId/*" element={<LazyCollections />} />
      </Routes>
    </Box>
  );
};

export default PortfolioSection;