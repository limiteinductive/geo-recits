import { Component, createSignal } from "solid-js";
import MapGL, { Viewport, Source, Layer } from "solid-map-gl";

// const MapBox: Component = () => {
//   mapboxgl.accessToken =
//
//   const map = new mapboxgl.Map({
//     container: "map", // container ID
//     style: "mapbox://styles/mapbox/streets-v11", // style URL
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: 9, // starting zoom
//     projection: { name: "globe" }, // display the map as a 3D globe
//   });

//   map.on("style.load", () => {
//     map.setFog({}); // Set the default atmosphere style
//   });
//   return <div id="map"></div>;
// };

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibGltaXRlaW5kdWN0aXZlIiwiYSI6ImNsNTJ0cmVuazBqN2wzZXBwYjRhaW84b3UifQ.Vh2inPsp2_Bbm-TaomM-lA";

const MapUI: Component = () => {
  const [viewport, setViewport] = createSignal({
    center: [0.0, 0.0],
    zoom: 4,
  } as Viewport);

  return (
    <MapGL
      options={{
        accessToken: MAPBOX_ACCESS_TOKEN,
        style: "mb:northstar",
      }}
      viewport={viewport()}
      onViewportChange={(evt: Event) => setViewport(evt)}
    >
      <Source
        source={{
          type: "geojson",
          data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        }}
      >
        <Layer
          style={{
            type: "circle",
            source: "earthquakes",
            paint: {
              "circle-radius": 8,
              "circle-color": "red",
            },
          }}
        />
      </Source>
      <MapSearch />
    </MapGL>
  );
};

const MapSearch: Component = () => {
  return (
    <div position-relative>
      <input class="position-absolute top-8px left-8px w-420 h-52px bg-fff border-2px border-color-00000010  border-radius-10px outline-none pl-72px text-00000090 shadow-md"
      placeholder="Recherchez...">
      </input>
      <div class="position-absolute top-14px left-64px w-1px h-42px bg-00000010"></div>
      <div class="i-eva:menu-outline position-absolute top-20px left-24px h-28px w-28px text-000000A0" />
      <div class="i-cil:search position-absolute top-20px left-384px h-28px w-28px text-00000080" />
     
    </div>
  );
};

export default MapUI;
