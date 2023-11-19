import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Anime, AnimeFields } from '@/types/anime-types';

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('form submitted');
};

export default function AnimeForm({
  submitForm,
  anime
}: {
  submitForm: (fields: AnimeFields) => void;
  anime?: Anime;
}) {
  const [fields, setFields] = useState({
    title: null,
    enTitle: null,
    description: null,
    rating: null,
    startDate: null,
    endDate: null,
    subtype: null,
    status: null,
    posterImage: null,
    coverImage: null,
    episodeCount: null,
    categories: null
  });

  // TODO: handleChange
  // TODO: handleSubmit
  // TODO: validate

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue="Hello World"
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
