import Head from 'next/head';
import Layout, { Page } from '@/components/layout';
import Link from 'next/link';
import utilStyles from '@/styles/utils.module.css';
import aboutStyles from '@/styles/About.module.css';

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
          <div className={aboutStyles.content}>
            <p>
              Hi, I&apos;m Pei-Lun, a software developer currently based in
              Berlin. Anime Spotlight is a side project that aims to showcase a
              fully functional app, equipped with
              <span className={utilStyles.bold}>CRUD RESTful APIs</span> and
              <span className={utilStyles.bold}>server-side rendering</span>,
              all centered around my passion for anime. <br />
              <ul>
                <li>
                  <span className={utilStyles.bold}>Frontend:</span> <br />
                  TypeScript, React.js (Functional Components and Hooks; Context
                  and Reducer for state management), Next.js(server-side
                  rendering), Material UI
                </li>
                <li>
                  <span className={utilStyles.bold}>Backend:</span> <br />
                  Node.js, Express.js
                </li>
                <li>
                  <span className={utilStyles.bold}>Both:</span> <br />
                  Joi (data validation), Axios, ESLint, Prettier
                </li>
              </ul>
              Feel free to connect with me on{' '}
              <Link
                className={aboutStyles.link}
                href="https://www.linkedin.com/in/peilun-hsu/"
                target="_blank"
              >
                LinkedIn
              </Link>
              if you have any questions or feedback. Thank you for stopping by!{' '}
              <br />
              <br />
              P.S. The anime information showcased in the application is sourced
              from
              <Link
                className={aboutStyles.link}
                href="https://kitsu.io/"
                target="_blank"
              >
                kitsu.io
              </Link>
              , a public anime catalog site.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
