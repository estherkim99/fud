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
      }}
    >
      <CircularProgress />
    </div>
  );
};
export default LoadingWheel;
