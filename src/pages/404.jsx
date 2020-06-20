import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Grid from '../components/Grid';
import Page from '../components/Page';
import Label from '../../config/site-labels';

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title={Label.notFound} />
      <Grid>
        <Page title={Label.notFound}>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Page>
      </Grid>
    </Layout>
  );
};

export default NotFoundPage;
