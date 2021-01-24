import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingWheel = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "15px 0px",
        color: '#83BF22'
      }}
    >
      <CircularProgress disableShrink color="#83BF22" />
    </div>
  );
};
export default LoadingWheel;
