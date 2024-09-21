import { Box } from '@chakra-ui/react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Collections from './Collections';
import useFetchCategories from '../hooks/Category/useFetchCategories';
import Categories from '../components/Categories';

const PortfolioSection = () => {
  const navigate = useNavigate();
  const { categories, loading } = useFetchCategories();

  return (
    <Box
      style={{ height: '100vh' }}
      bgGradient="linear(to-tr, black, gray.900)"
      overflowY="hidden"
      color="white"
      fontWeight={700}
      fontFamily="Oswald"
    >
      <Routes>
        <Route path="/" element={<Categories categories={categories} isLoading={loading} />} />
        {/* Route to display collections for a selected category */}
        <Route path=":categoryId/*" element={<Collections />} />
      </Routes>
    </Box>
  );
};

export default PortfolioSection;