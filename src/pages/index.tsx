import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Button, Grid, List, Stack } from '@mui/material';
import animeApiService from '@/services/anime-api-service';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useContext, useEffect } from 'react';
import AnimeContext from '@/contexts/anime-context';
import { Anime } from '@/types/anime-types';

export const getServerSideProps: GetServerSideProps<{
  animes: Anime[];
}> = async () => {
  const res = await animeApiService.getAnimes();
  return {
    props: {
      animes: res.data.animes
    }
  };
};

// TODO: move Head to layout component
export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { state, setAnimes } = useContext(AnimeContext);
  console.log('initial state animes in context', state.animes);

  useEffect(() => {
    console.log('useEffect: state.animes', state.animes);
    setAnimes(props.animes);
  }, []);

  return (
    <>
      <Head>
        <title>Anime Hub</title>
        <meta
          name="description"
          content="Anime hub to manage your favorite animes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <h1>Anime Trends Spotlight</h1>
        <p>
          Discover top series on Anime Hub. Tap cards for detailed insights. Use
          the three dots to edit, and the top-right '+' to add new favorites to
          the list. <br /> Enhance your anime journey!
        </p>
        <div>
          {state.animes === null ? (
            <ul>
              {props.animes.map((anime) => (
                <li key={anime.id}>{anime.title}</li>
              ))}
            </ul>
          ) : (
            <ul>
              {state.animes.map((anime) => (
                <li key={anime.id}>{anime.title}</li>
              ))}
            </ul>
          )}
          {/* <ul>
            {state.animes.map((anime) => (
              <li key={anime.id}>{anime.title}</li>
            ))}
          </ul> */}
        </div>
      </main>
    </>
  );
}
