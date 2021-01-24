import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  progress: {
    color: '#83BF22',
  }
}))

export default function LoadingWheel() {
  const classes = useStyles();
  
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "15px 0px",
      }}
    >
      <CircularProgress disableShrink className={classes.progress} color="primary" />
    </div>
  );
};
