import { useRouter } from 'next/router';
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
  return (
    <Layout page="anime">
      <h1>anime page</h1>
      <p>{router.query.id}</p>
      <p>{'query parameter edit: ' + router.query.edit}</p>
      <h3>{props.anime.title}</h3>
    </Layout>
  );
}
