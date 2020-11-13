import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Inputs from './components/Inputs';
import Results from './components/Results';

import { ResultConsumer } from '../../contexts/ResultContext';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <ResultConsumer>{({ response, getResult }) => (
      <Grid container className={classes.root} spacing={2}>
        <Grid item sm={6} xs={12}>
          <Inputs getResult={getResult} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Results response={response} />
        </Grid>
      </Grid>
    )}</ResultConsumer>
  )
}

export default Home;
