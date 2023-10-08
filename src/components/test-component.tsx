'use client';
import { useEffect, useState } from 'react';
import animesApiService from '../services/anime-api-service';
import { Status, Subtype } from '@/types/anime-types';

export const TestComponent = () => {
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    console.log('test component mounted');
    // animesApiService
    //   .updateAnime(51, {
    //     title: "Pei's Anime: Hajimete no Bouken I",
    //     enTitle: "Pei's Anime: The First Adventure!",
    //     description: 'Some amazing plot',
    //     rating: 90.3,
    //     startDate: '2023-08-03',
    //     endDate: '2024-12-27',
    //     status: Status.finished,
    //     subtype: Subtype.MOVIE,
    //     posterImage:
    //       'https://media.kitsu.io/anime/42765/poster_image/large-5ce19551c1a6cf995b378205b9149b5c.jpeg',
    //     coverImage: 'https://media.kitsu.io/anime/cover_images/42765/small.jpg',
    //     episodeCount: 25,
    //     categories: ['love', 'lie', 'brave', 'honey'],
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    animesApiService.deleteAnimeById(55).then((res) => {
      console.log(res);
    })
    animesApiService.getAnimes().then((res) => {
      setAnimes(res.data.animes);
    });
  }, []);

  return (
    <div>
      test component
      <ul>
        {animes.map((anime) => (
          <li key={anime.id}>{anime.title}</li>
        ))}
      </ul>
    </div>
  );
};
