import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import red from "@material-ui/core/colors/red";

const useStyles = makeStyles((theme) => ({
  error: {
    color: red[500],
  },
  results: {
    display: "grid",
    gridTemplateColumns: "20px auto",
  },
}));

const Results = ({ response: { h, k, error } }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Results</Typography>
        {error ? (
          <Typography className={classes.error}>Error: {error}</Typography>
        ) : (
          <div className={classes.results}>
            <Typography variant="subtitle1">
              <Box fontWeight="fontWeightBold">H:</Box>
            </Typography>
            <Typography variant="subtitle1">{h}</Typography>
            <Typography variant="subtitle1">
              <Box fontWeight="fontWeightBold">K:</Box>
            </Typography>
            <Typography variant="subtitle1">{k}</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Results;
