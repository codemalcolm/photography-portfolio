import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import PageLayout from "./Layouts/PageLayout";
import TestPage from "./Pages/TestPage";
import { SmoothScrollProvider } from "./contexts/SmoothScrollContext";

function App() {
  return (
    <SmoothScrollProvider>
        <PageLayout>
          <Routes>
            <Route path="/" element={<TestPage />} />
          </Routes>
        </PageLayout>
    </SmoothScrollProvider>
  );
}

export default App;
