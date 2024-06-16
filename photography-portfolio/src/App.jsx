import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import PageLayout from "./Layouts/PageLayout";
import TestPage from "./Pages/TestPage";
import { SmoothScrollProvider } from "./contexts/SmoothScrollContext";
import "../src/index.css"
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./Pages/PortfolioSection";
import Cars from "./components/Cars";
import Animals from "./components/Animals";

function App() {
  return (
    <SmoothScrollProvider>
        <PageLayout>
          <Routes>
            <Route path="/" element={<TestPage />} />
            <Route path="#photography/*" element={<PortfolioSection />} />

          </Routes>
        </PageLayout>
    </SmoothScrollProvider>
  );
}

export default App;
