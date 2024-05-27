import React from "react";
import { Routes, Route } from "react-router-dom";
import PageLayout from "./Layouts/PageLayout";
import TestPage from "./Pages/TestPage";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<TestPage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;