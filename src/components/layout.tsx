import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import layoutStyles from '@/styles/components/Layout.module.css';
import utilStyles from '@/styles/utils.module.css';
import { ReactNode } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { useGetAnimeContextValue } from '@/contexts/anime-context';

export const siteTitle = 'Anime Spotlight';

export default function Layout({
  children,
  page
}: {
  children: ReactNode;
  page: string;
}) {
  const { state } = useGetAnimeContextValue();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="og:title" content={siteTitle} />
        <meta
          name="description"
          content="Explore and personalize your anime adventure with trending series, comprehensive details, editing options, and the option to curate your list of favorite animes."
        />
        <meta name="twitter-card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta property="og:image" content={} /> */}
      </Head>
      <header>
        <div
          className={[
            layoutStyles.headerContainer,
            utilStyles.horizontalAlignment
          ].join(' ')}
        >
          <Link href="/">
            <Image
              priority
              height={104}
              width={128}
              src="/images/logo.png"
              alt="Anime Spotlight logo"
            />
          </Link>
          <div className={layoutStyles.headerItemContainer}>
            <Link href="/">
              <Button
                size="large"
                className={[
                  layoutStyles.headerBtn,
                  page === 'home' ? utilStyles.seletcedBtn : ''
                ].join(' ')}
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
            </Link>
            <Link href="/new-anime">
              <Button
                size="large"
                className={[
                  layoutStyles.headerBtn,
                  page === 'new-anime' ? utilStyles.seletcedBtn : ''
                ].join(' ')}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Link>
          </div>
          <div className={layoutStyles.headerMenu}>
            <IconButton
              id="edit-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              size="medium"
              disabled={state.loading}
              onClick={handleMenuButtonClick}
              // className={cardStyles.menuButton}
            >
              <MenuIcon fontSize="large" />
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
              <MenuItem
                // onClick={() => {
                //   handleDirectToAnimePage(true);
                // }}
              >
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div
          className={[
            layoutStyles.footerContainer,
            utilStyles.horizontalAlignment
          ].join(' ')}
        >
          <Link href="/">
            <Image
              priority
              height={104}
              width={128}
              src="/images/logo.png"
              alt="Anime Spotlight logo"
            />
          </Link>
          <span className={layoutStyles.textAlignCenter}>
            © 2023 Anime Spotlight. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
