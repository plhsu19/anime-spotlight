import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import { Button } from '@mui/material';
import { Subtype, Status } from '@/types/anime-types';

export default function NewAnime() {
  const { state, addAnime } = useGetAnimeContextValue();
  const handleCreate = async () => {
    await addAnime({
      title: "Pei's anime II: Nikaime Mei Bouken!",
      enTitle: "Pei's anime II: The 2nd adventure",
      description: 'Some continuous but not that amazing plot',
      rating: 59,
      startDate: '2023-08-03',
      endDate: '2024-12-27',
      status: Status.current,
      subtype: Subtype.MOVIE,
      posterImage:
        'https://media.kitsu.io/anime/42765/poster_image/large-5ce19551c1a6cf995b378205b9149b5c.jpeg',
      coverImage: 'https://media.kitsu.io/anime/cover_images/42765/small.jpg',
      episodeCount: 12,
      categories: ['love', 'lie', 'brave', 'honey']
    });
  };

  return (
    <Layout page="new-anime">
      <h1>create new anime page</h1>
      <Button onClick={handleCreate}>Create</Button>
    </Layout>
  );
}
