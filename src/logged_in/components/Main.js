import React from "react";
import Navbar from "./navigation/Navbar";
import Routing from "./Routing";

function Main() {
  return (
    <>
      <Navbar selectedTab={"Graphs"}/>
      <Routing />
    </>
  );
}

export default Main;