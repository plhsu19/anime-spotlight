import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cardStyles from '@/styles/Card.module.css';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//TODO: 
// 1. understand props of IconButton
// 2. understand props of Menu

export default function AnimeCard({
  id,
  title,
  subtype,
  startDate,
  rating,
  posterImage,
  deleteAnime
}: {
  id: number;
  title: string;
  subtype: string;
  startDate: string;
  rating: number;
  posterImage: string;
  deleteAnime: (id: number) => Promise<void>;
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const startYear = useMemo(
    () => startDate.split('-')[0] ?? 'unkown',
    [startDate]
  );
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    deleteAnime(id);
    setAnchorEl(null);
  };
  const handleEdit = () => {
    router.push(`/animes/${id}?edit=true`);
  };

  //TODO: understand <Image> and its source URL registration
  return (
    <>
      <div className={cardStyles.card}>
        <Image
          priority
          src={posterImage}
          className={cardStyles.borderCircle}
          height={88}
          width={62}
          alt=""
        />
        <div>
          <h3>{title}</h3>
          <p>{startYear}</p>
          <p>{subtype}</p>
        </div>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={handleEdit}>
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
          <p>{rating}</p>
        </div>
      </div>
    </>
  );
}
