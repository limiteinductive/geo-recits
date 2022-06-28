import { Component } from "solid-js";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import Map from "../components/Map";


const Home: Component = () => {

  return (
    <>
      <Navbar />
      <video
        autoplay
        loop
        muted
        class="h-28rem w-100% object-fit-cover z-index-0"
      >
        <source src="/src/assets/video.mp4" type="video/mp4" />
      </video>
      <Cards />
      <Map />
      <div></div>
    </>
  );
};

export default Home;
