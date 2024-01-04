import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState, MouseEvent } from 'react';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import { Alert, Snackbar, Button } from '@mui/material';
import animeApiService from '@/services/anime-api-service';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Layout, { Page } from '@/components/layout';
import AnimeForm from '@/components/new-anime/anime-form';
import { AnimeFields } from '@/types/anime-types';
import { Anime } from '@/types/anime-types';
import utilStyles from '@/styles/utils.module.css';

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
  const router = useRouter();
  const [editMode, setEditMode] = useState(router.query.edit === 'true');
  const [anime, setAnime] = useState<Anime>({ ...props.anime });
  const { state, dispatch, deleteAnime, addAnime, updateAnime } =
    useGetAnimeContextValue();
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

  const handleEditButtonClick = (): void => {
    dispatch({ type: 'RESET_NOTIFICATIONS' });
    setEditMode(true);
    updateEditQueryParams(true);
  };

  const onCancelEditing = () => {
    dispatch({ type: 'RESET_NOTIFICATIONS' });
    setEditMode(false);
    updateEditQueryParams(false);
  };

  const onUpdate = async (updatedAnimeFields: AnimeFields): Promise<void> => {
    try {
      const updatedAnime = await updateAnime(anime.id, updatedAnimeFields);
      setAnime(updatedAnime);
      setEditMode(false);
      updateEditQueryParams(false);
    } catch (e) {}
  };

  const updateEditQueryParams = (edit: boolean) => {
    router.replace(
      {
        pathname: router.pathname,
        query: edit ? { id: anime.id, edit: 'true' } : { id: anime.id }
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Layout page={Page.ANIME}>
      <Head>
        <title>anime.title</title>
      </Head>
      <div
        className={[
          utilStyles.verticalAlignItems,
          utilStyles.horizontalAlignment
        ].join(' ')}
      >
        <h1>Anime Page</h1>
        {!editMode ? (
          <div>
            {!!anime.coverImage ? (
              <Image
                src={anime.coverImage}
                alt={anime.title}
                width={1141/2}
                height={271/2}
              />
            ) : null}
            <h3>{anime.title}</h3>
            <h3>{anime.enTitle}</h3>
            <p>{router.query.id}</p>
            <Button disabled={state.loading} onClick={handleEditButtonClick}>
              Edit
            </Button>
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
      </div>
    </Layout>
  );
}
