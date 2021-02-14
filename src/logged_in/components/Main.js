import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Navbar from "./navigation/Navbar";
import Routing from "./Routing";
import smoothScrollTop from '../../shared/smoothScrollTop'

function Main() {

  const userInfo = {
    UserId: null,
    username: ''
  }

  userInfo.UserId = useSelector((state) => state.user.UserId);
  userInfo.username = useSelector((state) => state.user.username);

  userInfo.username = userInfo.username.charAt(0).toUpperCase() + userInfo.username.slice(1)

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
  console.log(selectedTab)

  return (
    <>
      <Navbar 
        selectedTab={selectedTab}
        userInfo={userInfo}
      />
      <Routing 
        selectDashboard={selectDashboard}
        selectGraphs={selectGraphs}
        userInfo={userInfo}
      />
    </>
  );
}

export default Main;