import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'



// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const breakpoints = {
  base: '0em', // 0px
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '1090px', // 1090px
  xl: '80em', // 1280px
  "2xl": '96em', // 1536px
}

const theme = extendTheme({ colors, breakpoints })

export default theme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme} resetCSS>
        <App/>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
