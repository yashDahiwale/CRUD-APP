import React, { useState } from "react";

// Main CSS
import "./index.css";

// Import Components
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import Footer from "./components/Footer.jsx";
import DataTable from "./components/DataTable.jsx";
import Bg from "./components/Bg.jsx";
import Loader from "./components/Loader.jsx";
import Divider from "./components/Divider.jsx";

// Locomotive JS For Smooth Scrolling
import '../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
import LocomotiveScroll from 'locomotive-scroll';
const locomotiveScroll = new LocomotiveScroll({
  lenisOptions: {
    smooth: true,
    duration: 1,
  }
});

function App() {

  const [isLiveReload, setIsLiveReload] = useState(false);

  // Live Reload
  const autoLiveReload = () => {
    setIsLiveReload(!isLiveReload);
  }

  return (
    <>
      <Loader />
      <Bg />
      <Header />
      <Form autoLiveReload={autoLiveReload} />
      <Divider />
      <DataTable isLiveReload={isLiveReload} autoLiveReload={autoLiveReload} />
      <Footer />
    </>
  );
}

export default App;
