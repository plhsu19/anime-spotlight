import { useState } from 'react';
import Head from 'next/head';
import Layout, { Page } from '@/components/layout';
import { useGetAnimeContextValue } from '@/contexts/anime-context';
import { Alert, Snackbar } from '@mui/material';
import utilStyles from '@/styles/utils.module.css';
import AnimeForm from '@/components/new-anime/anime-form';

export default function About() {
  return (
    <Layout page={Page.ABOUT}>
      <Head>
        <title>About</title>
      </Head>
      <main>
        <div
          className={[
            utilStyles.verticalAlignItems,
            utilStyles.horizontalAlignment
          ].join(' ')}
        >
          <h1>About</h1>
          <p>About this side project and me </p>
        </div>
      </main>
    </Layout>
  );
}
