import '@/styles/globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimeProvider } from '@/contexts/anime-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AnimeProvider fetchedAnimes={pageProps.animes}>
          <Component {...pageProps} />
        </AnimeProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
