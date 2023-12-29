import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import { Alert, Snackbar, Button } from '@mui/material';
import animeApiService from '@/services/anime-api-service';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Layout from '@/components/layout';
import AnimeForm from '@/components/new-anime/anime-form';
import { AnimeFields } from '@/types/anime-types';
// import { AnimeEditFields } from '@/types/components/anime-form-types';
import { Anime } from '@/types/anime-types';

const UPDATING_ANIME_MESSAGE = 'Updating anime...';

// TODO: uncaught server-side error of 404 if no anime found
export const getServerSideProps = async ({ params }) => {
  const res = await animeApiService.getAnimeById(params.id);
  return {
    props: {
      anime: res.data.anime
    }
  };
};

export default function Anime(props: { anime: Anime }) {
  const [editMode, setEditMode] = useState(false);
  const [anime, setAnime] = useState<Anime>({ ...props.anime });
  const { state, dispatch, deleteAnime, addAnime, updateAnime } =
    useGetAnimeContextValue();
  const alertIsExist = !!state.message || !!state.error;
  const [preAlertIsExist, setPreAlertIsExist] = useState(alertIsExist);
  const [alertOpen, setAlertOpen] = useState(alertIsExist);

  const router = useRouter();
  // const initialAnimeFields: AnimeEditFields = {...anime};
  // delete initialAnimeFields.id;

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

  const handleEditButtonClick = (): void => {
    dispatch({ type: 'RESET_NOTIFICATIONS' });
    setEditMode(true);
  };

  const onCancelEditing = () => {
    dispatch({ type: 'RESET_NOTIFICATIONS' });
    setEditMode(false);
  };

  const onUpdate = async (updatedAnimeFields: AnimeFields): Promise<void> => {
    try {
      const updatedAnime = await updateAnime(anime.id, updatedAnimeFields);
      setAnime(updatedAnime);
      setEditMode(false);
    } catch (e) {}
  };

  return (
    <Layout page="anime">
      <h1>anime page</h1>
      {!editMode ? (
        <div>
          <h3>{anime.title}</h3>
          <h3>{anime.enTitle}</h3>
          <p>{router.query.id}</p>
          <Button disabled={state.loading} onClick={handleEditButtonClick}>Edit</Button>
        </div>
      ) : (
        <AnimeForm
          initialAnime={anime}
          submitForm={onUpdate}
          cancel={onCancelEditing}
          isDisabled={state.loading}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state.loading}
      >
        <Alert severity="warning" variant="filled">
          {UPDATING_ANIME_MESSAGE}
        </Alert>
      </Snackbar>
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
    </Layout>
  );
}
