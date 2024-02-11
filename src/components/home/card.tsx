import { MouseEvent, SyntheticEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cardStyles from '@/styles/components/Card.module.scss';
import utilStyles from '@/styles/utils.module.scss';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import { animeTypeFormatter, animeRatingFormatter } from '@/utils/anime-utils';
import { paths } from '@/constants/paths';
import { Subtype } from '@/types/anime-types';

export default function AnimeCard({
  id,
  title,
  enTitle,
  subtype,
  episodeCount,
  startDate,
  rating,
  posterImage,
  deleteAnime
}: {
  id: number;
  title: string;
  enTitle: string | null;
  subtype: Subtype;
  episodeCount: number | null;
  startDate: string;
  rating: number | null;
  posterImage: string;
  deleteAnime: (id: number, title: string) => Promise<void>;
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { state, dispatch } = useGetAnimeContextValue();
  const open = Boolean(anchorEl);
  const startYear = useMemo(
    () => startDate.split('-')[0] ?? 'unkown',
    [startDate]
  );

  const type = animeTypeFormatter(subtype);
  const handleMenuButtonClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: SyntheticEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const handleDelete = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    deleteAnime(id, title);
    setAnchorEl(null);
  };

  const handleDirectToAnimePage = (
    event: MouseEvent<HTMLElement>,
    edit: boolean
  ) => {
    event.stopPropagation();
    if (!state.loading) {
      dispatch({ type: 'RESET_NOTIFICATIONS' });
      router.push({
        pathname: paths.anime,
        query: edit ? { id, edit: 'true' } : { id }
      });
    }
  };

  return (
    <div
      className={cardStyles.card}
      onClick={(event: MouseEvent<HTMLElement>) => {
        handleDirectToAnimePage(event, false);
      }}
    >
      <div className={cardStyles.cardImageContainer}>
        <Image
          priority
          src={posterImage}
          className={cardStyles.image}
          height={78 * 2}
          width={55 * 2}
          alt=""
        />
      </div>
      <div className={cardStyles.cardInfoContainer}>
        <div className={cardStyles.titleContainer}>
          <h3 className={cardStyles.title}>{title}</h3>
          {enTitle ? (
            <p
              className={[cardStyles.subTitle, utilStyles.secondaryColor].join(
                ' '
              )}
            >
              {enTitle}
            </p>
          ) : null}
        </div>
        <div className={cardStyles.details}>
          <Chip label={type} color="success" variant="outlined" size="small" />
          {episodeCount && (
            <Chip
              label={`${episodeCount} ep(s)`}
              color="warning"
              variant="outlined"
              size="small"
            />
          )}
        </div>
      </div>
      <div className={cardStyles.cardEditContainer}>
        <IconButton
          id="edit-button"
          aria-controls={open ? 'edit-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          size="medium"
          disabled={state.loading}
          onClick={handleMenuButtonClick}
          className={cardStyles.menuButton}
        >
          <MoreVertIcon fontSize="large" />
        </IconButton>
        <Menu
          id="edit-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'edit-button'
          }}
        >
          <MenuItem
            onClick={(event: MouseEvent<HTMLElement>) => {
              handleDirectToAnimePage(event, true);
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
        <div className={cardStyles.ratingContainer}>
          <StarIcon color="warning" fontSize="large" />
          <span className={utilStyles.largeContextFontSize}>
            {animeRatingFormatter(rating)}
          </span>
        </div>
      </div>
    </div>
  );
}
