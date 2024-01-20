import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import {
  DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE,
  DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE,
  DELETE_ANIME_SUCCESSFUL_MESSAGE
} from '@/constants/texts';
import { Alert, Snackbar } from '@mui/material';
import animeApiService from '@/services/anime-api-service';
import type { GetServerSideProps } from 'next';
import Layout, { Page } from '@/components/layout';
import AnimeForm from '@/components/new-anime/anime-form';
import AnimeView from '@/components/animes/anime-view';
import { AnimeFields } from '@/types/anime-types';
import { Anime } from '@/types/anime-types';
import utilStyles from '@/styles/utils.module.scss';
import animesStyles from '@/styles/Animes.module.scss';
import { paths } from '@/constants/paths';
import { PROCESSING_REQUEST_MESSAGE } from '@/constants/texts';
import { ErrorRespone } from '@/types/services/anime-api-service-types';
import { AxiosError } from 'axios';

const BACKGROUND_IMAGE_OPACITY_LAYER = 'rgb(0, 0, 0, 0.8)';

// TODO: uncaught server-side error of 404 if no anime found
export const getServerSideProps = (async ({ params }) => {
  try {
    if (params?.id == null || typeof params?.id !== 'string') {
      throw new Error('Invalid anime id in url.');
    } else if (Number.isNaN(parseInt(params.id))) {
      throw new Error('Invalid anime id in url: not a number.');
    } else {
      const res = await animeApiService.getAnimeById(params.id);
      return {
        props: {
          anime: res.data.anime
        }
      };
    }
  } catch (e) {
    console.log(`fetching anime id ${params?.id} failed with error: `, e);
    throw e;
  }
}) satisfies GetServerSideProps;

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

  const handleEdit = (): void => {
    dispatch({ type: 'RESET_NOTIFICATIONS' });
    setEditMode(true);
    updateEditQueryParams(true);
  };

  const handleDelete = async (): Promise<void> => {
    dispatch({ type: 'START_LOADING' });
    let message = null;
    let error = null;

    try {
      await animeApiService.deleteAnimeById(anime.id);
      message = DELETE_ANIME_SUCCESSFUL_MESSAGE.replace('%s', anime.title);
      dispatch({ type: 'END_LOADING', payload: { message, error } });
      router.push({ pathname: paths.home });
    } catch (e) {
      const axiosError = e as AxiosError<ErrorRespone>;
      if (axiosError.response?.status === 404) {
        error = DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE.replace('%s', anime.title);
      } else {
        error = DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE.replace(
          '%s',
          anime.title
        );
      }
    }
    dispatch({ type: 'END_LOADING', payload: { message, error } });
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
        <title>{anime.title}</title>
      </Head>
      <main
        style={
          !!anime.coverImage && !editMode
            ? {
                backgroundImage: `linear-gradient(${BACKGROUND_IMAGE_OPACITY_LAYER}, ${BACKGROUND_IMAGE_OPACITY_LAYER}), url(${anime.coverImage})`
              }
            : undefined
        }
        className={animesStyles.background}
      >
        <div className={utilStyles.horizontalAlignment}>
          <div className={animesStyles.titleContainer}>
            <h3 className={animesStyles.title}>{anime.title}</h3>
            {!editMode && anime.enTitle && (
              <span
                className={[
                  animesStyles.subTitle,
                  utilStyles.secondaryColor
                ].join(' ')}
              >{`English title: ${anime.enTitle}`}</span>
            )}
          </div>
          {!editMode ? (
            <AnimeView
              anime={anime}
              isLoading={state.loading}
              handleEditButtonClick={handleEdit}
              handleDeleteButtonClick={handleDelete}
            />
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
              {PROCESSING_REQUEST_MESSAGE}
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
      </main>
    </Layout>
  );
}
