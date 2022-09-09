import { useState, useEffect } from 'react';
import NextNProgress from "nextjs-progressbar";
import '../styles/globals.css';
import '../styles/Error.css';
import '../styles/Home.module.css';
import "rsuite/dist/rsuite.min.css";
import { updateTheme, readTheme } from '../utils/utils';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

import { CustomProvider } from 'rsuite';

function MyApp({ Component, pageProps }) {

  // adding theme for every page
  const [theme, setTheme] = useState('dark'); //'light' | 'dark' | 'high-contrast';
  pageProps.theme = theme;
  pageProps.setTheme = (newTheme) => {
    updateTheme(newTheme);
    setTheme(newTheme);
  };
  useEffect(() => {
    setTheme(readTheme())
  },[])

  return (
    <CustomProvider theme={theme}>
      <NextNProgress color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3} />
      <Component {...pageProps} />
    </CustomProvider>
  )
}

export default MyApp
