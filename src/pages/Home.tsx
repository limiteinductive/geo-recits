import { Component } from "solid-js";
import { createScrollPosition } from "@solid-primitives/scroll";


import Cards from "../components/Cards";
import Navbar from "../components/Navbar";

import videoSrc from '/src/assets/video.mp4';
import Footer from "../components/Footer";
import What from "../components/What";
import Hero from "../components/Hero";


const Home: Component = () => {



  return (
    <div>
      <Navbar />
      <Hero />
      <What />
      <Footer />
      <div></div>
    </div>
  );
};

export default Home;
