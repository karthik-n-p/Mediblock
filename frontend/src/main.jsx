import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/landing-page/header.jsx'
import LandingContent from './components/landing-page/landing-content.jsx'

import App from './App.jsx'

const theme = extendTheme({
  fonts: {
    body:  "Open Sans",
    
    
  }






});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <ChakraProvider theme={theme}>
    <Header/>
    <LandingContent/>
    </ChakraProvider>
  </React.StrictMode>,
)
