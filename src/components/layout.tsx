import { useState } from 'react';
import { useRouter } from 'next/router';
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
import { homePath, newAnimePath } from '@/constants/paths';

export const siteTitle = 'Anime Spotlight';
export enum Page {
  HOME = 'home',
  ANIME = 'anime',
  NEW_ANIME = 'new-anime'
}

const HOME_ITEM = 'Home';
const NEW_ANIME_ITEM = 'Add';

export default function Layout({
  children,
  page
}: {
  children: ReactNode;
  page: Page;
}) {
  const router = useRouter();
  const { state, dispatch } = useGetAnimeContextValue();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDirectToPage = (toPage: Page) => {
    if (!state.loading && toPage !== page) {
      dispatch({ type: 'RESET_NOTIFICATIONS' });
      router.push({
        pathname: toPage === Page.NEW_ANIME ? newAnimePath : homePath
      });
    }
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
            <Button
              size="large"
              className={[
                layoutStyles.headerBtn,
                page === Page.HOME ? utilStyles.seletcedBtn : ''
              ].join(' ')}
              startIcon={<HomeIcon />}
              onClick={() => handleDirectToPage(Page.HOME)}
            >
              {HOME_ITEM}
            </Button>
            <Button
              size="large"
              className={[
                layoutStyles.headerBtn,
                page === Page.NEW_ANIME ? utilStyles.seletcedBtn : ''
              ].join(' ')}
              startIcon={<AddIcon />}
              onClick={() => handleDirectToPage(Page.NEW_ANIME)}
            >
              {NEW_ANIME_ITEM}
            </Button>
          </div>
          <div className={layoutStyles.headerMenu}>
            <IconButton
              id="menu-button"
              aria-controls={open ? 'header-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              size="medium"
              disabled={state.loading}
              onClick={handleMenuButtonClick}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              id="header-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'menu-button'
              }}
            >
              <MenuItem
                selected={page === Page.HOME}
                onClick={() => handleDirectToPage(Page.HOME)}
              >
                <ListItemIcon>
                  <HomeIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>{HOME_ITEM}</ListItemText>
              </MenuItem>
              <MenuItem
                selected={page === Page.NEW_ANIME}
                onClick={() => handleDirectToPage(Page.NEW_ANIME)}
              >
                <ListItemIcon>
                  <AddIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>{NEW_ANIME_ITEM}</ListItemText>
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
