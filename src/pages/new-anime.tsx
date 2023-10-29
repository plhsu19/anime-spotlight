import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import animeApiService from '@/services/anime-api-service';

export default function NewAnime() {
  const router = useRouter();
  return (
    <Layout page="new-anime">
      <h1>create new anime page</h1>
    </Layout>
  );
}
