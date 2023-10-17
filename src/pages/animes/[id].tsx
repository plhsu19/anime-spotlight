import { useRouter } from 'next/router';
import animeApiService from '@/services/anime-api-service';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

// TODO: server-side return 404 if no anime found (404 from backend)
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
  return (
    <>
      <h1>anime page</h1>
      <p>{router.query.id}</p>
      <p>{'query parameter edit: ' + router.query.edit}</p>
      <h3>{props.anime.title}</h3>
    </>
  );
}
