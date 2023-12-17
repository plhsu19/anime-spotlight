import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import { Alert, Snackbar } from '@mui/material';
import utilStyles from '@/styles/utils.module.css';
import NewAnimeStyles from '@/styles/NewAnime.module.css';
import AnimeForm from '@/components/anime-form';
import { Subtype, Status } from '@/types/anime-types';

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

  const handleCreate = async () => {
    await addAnime({
      title: "Pei's anime IV: Nikaime Mei Bouken!",
      enTitle: "Pei's anime II: The 2nd adventure",
      description: 'Some continuous but not that amazing plot',
      rating: 6.5,
      startDate: '2023-08-03',
      endDate: '2024-12-27',
      status: Status.CURRENT,
      subtype: Subtype.MOVIE,
      posterImage:
        'https://media.kitsu.io/anime/42765/poster_image/large-5ce19551c1a6cf995b378205b9149b5c.jpeg',
      coverImage: 'https://media.kitsu.io/anime/cover_images/42765/small.jpg',
      episodeCount: 12,
      categories: ['love', 'lie', 'brave', 'honey']
    });
  };

  return (
    <Layout page="new-anime">
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
            Adding anime...
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
