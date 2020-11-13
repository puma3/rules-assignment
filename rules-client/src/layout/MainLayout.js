import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import GavelIcon from '@material-ui/icons/Gavel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 12,
  },
  content: {
    maxWidth: 1024,
    margin: '20px auto',
    paddingLeft: 16,
    paddingRight: 16
  }
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <GavelIcon className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            Rules App
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout;
