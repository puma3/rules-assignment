import React, { useCallback, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fab from "@material-ui/core/Fab";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import SendIcon from "@material-ui/icons/Send";
import { isValidFloatInput, isValidIntInput } from "../../../utils/validation";

const useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: 500
  },
  divider: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    position: "relative",
  },
  valuesContainer: {
    backgroundColor: "#272c34",
    color: "white",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
  textfield: {
    marginTop: theme.spacing(2),
  },
}));

const Inputs = ({ getResult }) => {
  const classes = useStyles();

  const [aValue, setAValue] = useState(true);
  const [bValue, setBValue] = useState(true);
  const [cValue, setCValue] = useState(true);
  const [dValue, setDValue] = useState(0.0);
  const [eValue, setEValue] = useState(0);
  const [fValue, setFValue] = useState(0);

  const setFloatValue = useCallback((input, setter) => {
    console.log("input", input);
    if (isValidFloatInput(input) && setter) setter(input || 0);
  }, []);

  const setIntValue = useCallback((input, setter) => {
    if (isValidIntInput(input) && setter) setter(parseInt(input) || 0);
  }, []);

  const inputs = useMemo(
    () => ({
      a: aValue,
      b: bValue,
      c: cValue,
      d: parseFloat(dValue),
      e: eValue,
      f: fValue,
    }),
    [aValue, bValue, cValue, dValue, eValue, fValue]
  );

  const values = useMemo(() => JSON.stringify(inputs, null, 2), [inputs]);

  return (
    <Card className={classes.card}>
      <div className={classes.divider}>
        <CardContent>
          <Typography variant="h6">Inputs</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={aValue}
                onChange={() => setAValue(!aValue)}
                color="primary"
              />
            }
            label="A"
            labelPlacement="start"
          />
          <br />
          <FormControlLabel
            control={
              <Switch
                checked={bValue}
                onChange={() => setBValue(!bValue)}
                color="primary"
              />
            }
            label="B"
            labelPlacement="start"
          />
          <br />
          <FormControlLabel
            control={
              <Switch
                checked={cValue}
                onChange={() => setCValue(!cValue)}
                color="primary"
              />
            }
            label="C"
            labelPlacement="start"
          />
          <br />
          <TextField
            className={classes.textfield}
            label="D"
            value={dValue}
            onChange={(e) => setFloatValue(e.target.value, setDValue)}
            name="d"
            id="d-number-input"
            variant="outlined"
          />
          <br />
          <TextField
            className={classes.textfield}
            label="E"
            value={eValue}
            onChange={(e) => setIntValue(e.target.value, setEValue)}
            name="e"
            id="e-number-input"
            variant="outlined"
          />
          <br />
          <TextField
            className={classes.textfield}
            label="F"
            value={fValue}
            onChange={(e) => setIntValue(e.target.value, setFValue)}
            name="f"
            id="f-number-input"
            variant="outlined"
          />
        </CardContent>
        <div className={classes.valuesContainer}>
          <CardContent>
            <Typography variant="h6" color="secondary">
              Values
            </Typography>
            <pre>{values}</pre>
            <Fab
              color="primary"
              className={classes.fab}
              variant="extended"
              onClick={() => getResult(inputs)}
            >
              <SendIcon className={classes.fabIcon} />
              Submit
            </Fab>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default Inputs;
