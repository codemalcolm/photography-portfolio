import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import PageLayout from "./Layouts/PageLayout";
import HeroPage from "./Pages/HeroPage";

function App() {

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HeroPage />}/>
        </Routes>
      </PageLayout>
      
    </>
  )
}

export default App
