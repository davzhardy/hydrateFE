import React, { Fragment } from 'react';
import {
  Typography,
} from "@material-ui/core";
import LoadingGif from '../gifs/Loading.gif'

// https://css-tricks.com/react-suspense-in-practice/
// https://medium.com/@ShankyTiwari/show-better-loading-screen-in-react-using-suspense-and-suspenselist-34028c4be378

function LoadingScreen () {
  return (
    <Fragment style={{justifyContent: "center"}}>
      <Typography>
        Page loading
      </Typography>
      <img src={LoadingGif} alt="Loading" />
    </Fragment>
  )
}

export default LoadingScreen