'use client';
import { useEffect, useState } from 'react';
import animesApiService from '../services/animes-api-service';

export const TestComponent = () => {
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    console.log('test component mounted');
    animesApiService.getAnimeById(3).then((res) => {
      console.log(res.data.anime)
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
