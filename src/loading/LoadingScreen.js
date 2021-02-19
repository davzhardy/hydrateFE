import React, { Fragment } from 'react';
import {
  Typography,
} from "@material-ui/core";

function LoadingScreen () {
  return (
    <Fragment >
     	<Typography>
        Page loading
      </Typography>
		</Fragment>
  )
}

export default LoadingScreen




// import LoadingGif from '../gifs/Loading.gif'

// https://css-tricks.com/react-suspense-in-practice/
// https://medium.com/@ShankyTiwari/show-better-loading-screen-in-react-using-suspense-and-suspenselist-34028c4be378

// {/* <div class="preloader" style="display: none;">
// 		<div class="status" style="display: none;">
// 							<style>@keyframes dtb-dashoffset-11{from{stroke-dashoffset:0}to{stroke-dashoffset:256.58892822265625}}</style>
// 					<svg class="preloader none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: 0px 0px; display: none;">
// 						<path class="none" fill="none" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z" stroke-width="4" stroke-dasharray="159.085 97.504" style="animation:dtb-dashoffset-11 1s infinite linear;"></path>
// 					</svg>
				
// 									</div>
// 	</div> */}

//   <Fragment style={{justifyContent: "center"}}>
//   <Typography>
//     Page loading
//   </Typography>
//   <img src={LoadingGif} alt="Loading" />
// </Fragment>