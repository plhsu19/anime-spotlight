import Image from 'next/image';
import cardStyles from '@/styles/Card.module.css';
import { Button } from '@mui/material';

export default function AnimeCard({
  id,
  title,
  // subtype,
  // startYear,
  // rating,
  posterImage,
  deleteAnime
}) {
  return (
    <div className={cardStyles.card}>
      <Image
        priority
        src={posterImage}
        className={cardStyles.borderCircle}
        height={88}
        width={62}
        alt=""
      />
      <p>{title}</p>
      <Button
        variant="contained"
        onClick={() => {
          deleteAnime(id);
        }}
      >
        Delete
      </Button>
    </div>
  );
}
