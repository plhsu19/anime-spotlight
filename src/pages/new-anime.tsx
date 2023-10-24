import { useRouter } from 'next/router';
import animeApiService from '@/services/anime-api-service';

export default function NewAnime() {
  const router = useRouter();
  return (
    <>
      <h1>create new anime page</h1>
    </>
  );
}
