import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import animeApiService from '@/services/anime-api-service';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useContext } from 'react';
import AnimeContext from '@/contexts/anime-context';
import { Anime } from '@/types/anime-types';
import Card from '@/components/card';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { newAnimePath } from '@/constants/paths';

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
  const { state, deleteAnime } = useContext(AnimeContext);
  const router = useRouter();

  const deleteHandler = () => {
    deleteAnime(50);
  };
  const handleDirectToCreateAnimePage = () => {
    router.push(newAnimePath);
  };

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
        <div className={styles.main}>
          <h1>Anime Trends Spotlight 🔦</h1>
          <p>
            Discover top anime series. Tap cards for detailed insights. Use the
            three dots to edit or remove the animes, and the top-right '+' to
            add new favorites to the list. Enhance your anime journey!
          </p>
          <IconButton
            aria-label="addAnime"
            size="medium"
            color="primary"
            className={styles.btnAdd}
            onClick={handleDirectToCreateAnimePage}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <div className={styles.cardList}>
            {state.animes.map((anime) => (
              <Card
                key={anime.id}
                id={anime.id}
                title={anime.title}
                subtype={anime.subtype}
                rating={anime.rating}
                episodeCount={anime.episodeCount}
                startDate={anime.startDate}
                posterImage={anime.posterImage}
                deleteAnime={deleteAnime}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
