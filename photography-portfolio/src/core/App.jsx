import { Suspense } from "react";
import { Router } from "../core/Router.jsx";
import PageLayout from "../Layouts/PageLayout.jsx";
import { Box, Spinner } from "@chakra-ui/react";


function App() {
  return (
    <PageLayout>
      <Suspense
        fallback={
          <Box
            position="fixed" // Make sure the Box takes up the entire viewport and stays in place
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="1000" // Ensure the spinner stays above other content
            transition="opacity 1s ease-in-out"
          >
            <Spinner size="md" color="white" />
          </Box>
        }
      >
        <Router />
      </Suspense>
    </PageLayout>
  );
}

export default App;
