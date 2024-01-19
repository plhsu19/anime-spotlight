import { useMemo } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Chip, Rating, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Anime, Status } from '@/types/anime-types';
import {
  animeTypeFormatter,
  animeStatusFormatter,
  animeRatingFormatter
} from '@/utils/anime-utils';

import utilStyles from '@/styles/utils.module.scss';
import animeViewStyles from '@/styles/components/animes/AnimeView.module.scss';

const EDIT_BUTTON_LABEL = 'Edit';
const DELETE_BUTTON_LABEL = 'Delete';

export default function AnimeView({
  anime,
  isLoading,
  handleEditButtonClick,
  handleDeleteButtonClick
}: {
  anime: Anime;
  isLoading: boolean;
  handleEditButtonClick: () => void;
  handleDeleteButtonClick: () => Promise<void>;
}) {
  const startDate = useMemo(() => {
    return dayjs(anime.startDate).format('MMM, YYYY');
  }, [anime.startDate]);

  const endDate = useMemo(() => {
    if (anime.endDate === null) {
      return anime.status === Status.CURRENT ? 'Present' : '?';
    } else {
      return dayjs(anime.endDate).format('MMM, YYYY');
    }
  }, [anime.endDate, anime.status]);

  const displayRating = useMemo(() => {
    if (anime.rating === null) {
      return anime.rating;
    } else {
      return anime.rating / 2;
    }
  }, [anime.rating]);

  return (
    <div className={animeViewStyles.animeView}>
      <Image
        src={anime.posterImage}
        alt={anime.title}
        width={55 * 4.5}
        height={78 * 4.5}
      />
      <div className={animeViewStyles.animeInfos}>
        <div className={animeViewStyles.ratingContainer}>
          <Rating
            name="rating"
            value={displayRating}
            readOnly
            size="large"
            max={5}
            precision={0.1}
          />
          <div>
            <span>Rating: </span>
            <span className={animeViewStyles.rating}>
              {animeRatingFormatter(anime.rating)}
            </span>
            <span className={utilStyles.secondaryColor}> of 10</span>
          </div>
        </div>
        <div className={animeViewStyles.btnContainer}>
          <Button
            className={animeViewStyles.editBtn}
            disabled={isLoading}
            onClick={handleEditButtonClick}
            color="warning"
            variant="contained"
            startIcon={<EditIcon />}
          >
            {EDIT_BUTTON_LABEL}
          </Button>
          <Button
            className={animeViewStyles.deleteBtn}
            disabled={isLoading}
            onClick={handleDeleteButtonClick}
            color="error"
            variant="outlined"
            startIcon={<DeleteForeverIcon />}
          >
            {DELETE_BUTTON_LABEL}
          </Button>
        </div>
        <div className={animeViewStyles.detailContainer}>
          <span>{animeTypeFormatter(anime.subtype)}</span>
          <span> | </span>
          <span>{`${startDate} - ${endDate}`}</span>
          <span> | </span>
          <span>{animeStatusFormatter(anime.status)}</span>
          {!!anime.episodeCount && (
            <div>
              <span> | </span>
              <span>{`${anime.episodeCount} Episodes`}</span>
            </div>
          )}
        </div>
        {anime.categories.length > 0 && (
          <div className={animeViewStyles.categories}>
            {anime.categories.map((category, idx) => (
              <Chip
                key={idx}
                label={category}
                color="warning"
                variant="outlined"
              />
            ))}
          </div>
        )}
        <span className={animeViewStyles.description}>{anime.description}</span>
      </div>
    </div>
  );
}
