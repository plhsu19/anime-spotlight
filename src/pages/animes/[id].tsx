import { useRouter } from 'next/router';
import { useState } from 'react';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import { Alert, Snackbar } from '@mui/material';
import animeApiService from '@/services/anime-api-service';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Layout from '@/components/layout';

// TODO: server-side return 404 if no anime found, currently 500 (404 from anime-api)
export const getServerSideProps = async ({ params }) => {
  const res = await animeApiService.getAnimeById(params.id);
  return {
    props: {
      anime: res.data.anime
    }
  };
};

export default function Anime(props) {
  const router = useRouter();
  const { state, dispatch, deleteAnime, updateAnime } = useGetAnimeContextValue();
  const alertIsExist = !!state.message || !!state.error;
  const [preAlertIsExist, setPreAlertIsExist] = useState(alertIsExist);
  const [alertOpen, setAlertOpen] = useState(alertIsExist);

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
    <Layout page="anime">
      <h1>anime page</h1>
      <p>{router.query.id}</p>
      <p>{'query parameter edit: ' + router.query.edit}</p>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          severity={!!state.error ? 'error' : 'success'}
          variant="filled"
          onClose={handleAlertClose}
        >
          {state.error ?? state.message}
        </Alert>
      </Snackbar>
      <h3>{props.anime.title}</h3>
    </Layout>
  );
}
