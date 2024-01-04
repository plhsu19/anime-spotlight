import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cardStyles from '@/styles/components/Card.module.css';
import utilStyles from '@/styles/utils.module.css';
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
import { animePath } from '@/constants/paths';

//TODO:
// 1. understand props of IconButton
// 2. understand props of Menu

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
  subtype: string;
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

  const type = useMemo(
    () => (subtype === 'TV' ? 'TV Series' : subtype),
    [subtype]
  );
  const computedRating: string = useMemo(() => {
    if (rating == null) return '-';
    return rating % 1 !== 0 ? rating.toString() : rating + '.0';
  }, [rating]);

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    deleteAnime(id, title);
    setAnchorEl(null);
  };
  const handleDirectToAnimePage = (edit: boolean) => {
    if (!state.loading) {
      dispatch({ type: 'RESET_NOTIFICATIONS' });
      router.push({
        pathname: animePath,
        query: edit ? { id, edit: 'true' } : { id }
      });
    }
  };

  return (
    <>
      <div className={cardStyles.card}>
        <div className={cardStyles.cardImageContainer}>
          <Image
            priority
            src={posterImage}
            className={cardStyles.image}
            height={158.4}
            width={111.6}
            alt=""
            onClick={() => {
              handleDirectToAnimePage(false);
            }}
          />
        </div>
        <div
          className={cardStyles.cardInfoContainer}
          onClick={() => {
            handleDirectToAnimePage(false);
          }}
        >
          <div className={cardStyles.titleContainer}>
            <h3 className={cardStyles.title}>{title}</h3>
            {enTitle ? (
              <p
                className={[
                  cardStyles.subTitle,
                  utilStyles.secondaryColor
                ].join(' ')}
              >
                {enTitle}
              </p>
            ) : null}
          </div>
          <div className={cardStyles.details}>
            <Chip
              label={type}
              color="success"
              variant="outlined"
              size="small"
            />
            <Chip
              label={`${episodeCount ?? 'unkown'} ep(s)`}
              color="warning"
              variant="outlined"
              size="small"
            />
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
              onClick={() => {
                handleDirectToAnimePage(true);
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
          <div
            className={cardStyles.ratingContainer}
            onClick={() => {
              handleDirectToAnimePage(false);
            }}
          >
            <StarIcon color="warning" fontSize="large" />
            <span className={utilStyles.largeContextFontSize}>
              {computedRating}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
