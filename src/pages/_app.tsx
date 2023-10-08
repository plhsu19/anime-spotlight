import '@/styles/globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimeProvider } from '@/contexts/anime-context';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AnimeProvider initialAnimes={pageProps.animes}>
        <Component {...pageProps} />
      </AnimeProvider>
    </ThemeProvider>
  );
}
