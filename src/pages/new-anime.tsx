import { useState } from 'react';
import Head from 'next/head';
import Layout, { Page } from '@/components/layout';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import { Alert, Snackbar } from '@mui/material';
import utilStyles from '@/styles/utils.module.css';
import AnimeForm from '@/components/new-anime/anime-form';

const ADDING_ANIME_MESSAGE = 'Adding anime...';

export default function NewAnime() {
  const { state, addAnime } = useGetAnimeContextValue();
  const alertIsExist = !!state.error;
  const [preAlertIsExist, setPreAlertIsExist] = useState(alertIsExist);
  const [alertOpen, setAlertOpen] = useState(false);

  if (alertIsExist !== preAlertIsExist) {
    setAlertOpen(alertIsExist);
    setPreAlertIsExist(alertIsExist);
  }

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Layout page={Page.NEW_ANIME}>
      <Head>
        <title>Add New Anime</title>
      </Head>
      <div
        className={[
          utilStyles.verticalAlignItems,
          utilStyles.horizontalAlignment
        ].join(' ')}
      >
        <h1>Add New Anime</h1>
        <p>
          Add your new favorite series to the list by filling out a simple form,
          and introduce new worlds to fellow anime enthusiasts!
        </p>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={state.loading}
        >
          <Alert severity="warning" variant="filled">
            {ADDING_ANIME_MESSAGE}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <Alert severity="error" variant="filled" onClose={handleAlertClose}>
            {state.error}
          </Alert>
        </Snackbar>
        <AnimeForm submitForm={addAnime} />
      </div>
    </Layout>
  );
}
