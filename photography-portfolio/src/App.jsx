import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import PageLayout from "./Layouts/PageLayout";
import TestPage from "./Pages/TestPage";
import { SmoothScrollProvider } from "./contexts/SmoothScrollContext";
import "../src/index.css"
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./Pages/PortfolioSection";
import HeroPage from "./Pages/HeroPage";


function App() {
  return (
    <SmoothScrollProvider>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="about" element={<AboutSection />} />
            <Route path="photography/*" element={<PortfolioSection />} />
          </Routes>
        </PageLayout>
    </SmoothScrollProvider>
  );
}

export default App;
