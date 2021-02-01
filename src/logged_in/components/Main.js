import React, { useState } from "react";
import Navbar from "./navigation/Navbar";
import Routing from "./Routing";
import smoothScrollTop from '../../shared/smoothScrollTop'

function Main() {

  const [selectedTab, setSelectedTab] = useState(null);

  const selectDashboard = () => {
    smoothScrollTop();
    document.title = "DrInk - Dashboard";
    setSelectedTab("Dashboard"); 
  }

  const selectGraphs = () => {
    smoothScrollTop();
    document.title = "DrInk - Graphs";
    setSelectedTab("Graphs"); 
  }

  return (
    <>
      <Navbar selectedTab={selectedTab}/>
      <Routing 
        selectDashboard={selectDashboard}
        selectGraphs={selectGraphs}

      />
    </>
  );
}

export default Main;