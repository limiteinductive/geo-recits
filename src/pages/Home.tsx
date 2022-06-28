import { Component } from "solid-js";
import { createScrollPosition } from "@solid-primitives/scroll";


import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import Map from "../components/Map";

import videoSrc from '/src/assets/video.mp4';
import Footer from "../components/Footer";


const Home: Component = () => {



  return (
    <div>
      <Navbar />
      <video
        autoplay
        loop
        muted
        class="h-28rem w-100% object-fit-cover z-index-0"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <Cards />
      <Map />
      <Footer />
      <div></div>
    </div>
  );
};

export default Home;
