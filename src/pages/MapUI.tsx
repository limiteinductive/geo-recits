import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import MapGL, { Viewport, Source, Layer, Popup } from "solid-map-gl";
import { Atom, atom } from "solid-use";
import Marker from "../components/Marker";

import "./map.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibGltaXRlaW5kdWN0aXZlIiwiYSI6ImNsNTJ0cmVuazBqN2wzZXBwYjRhaW84b3UifQ.Vh2inPsp2_Bbm-TaomM-lA";

const mapClick = atom(0);
const leftToggle = atom(false);

const MapUI: Component = () => {
  const [viewport, setViewport] = createSignal({
    center: [0.0, 0.0],
    zoom: 4,
  } as Viewport);

  return (
    <MapGL
      options={{
        accessToken: MAPBOX_ACCESS_TOKEN,
        style: "mb:frank",
        atributionControl: false,
      }}
      viewport={viewport()}
      onViewportChange={(view: Viewport) => setViewport(view)}
      onClick={() => {
        if (leftToggle()) {
          console.log("map click");
          mapClick(mapClick() + 1);
        }
      }}
    >
      <MapSearch />
      <LeftPopup open={leftToggle} />
      <Marker
        lngLat={[0, 0]}
        options={{
          color: leftToggle() ? "#C57CE6" : "#b254de",
          scale: leftToggle() ? 1.2 : 1,
        }}
        toggle={leftToggle}
        class="cursor pointer"
      ></Marker>
    </MapGL>
  );
};

const MapSearch: Component = () => {
  return (
    <div position-relative>
      <input
        class="position-absolute top-8px left-8px w-420 h-52px bg-fff border-2px border-color-00000010  border-radius-10px outline-none pl-72px text-00000090 shadow-md"
        placeholder="Recherchez..."
      ></input>
      <div class="position-absolute top-14px left-64px w-1px h-42px bg-00000010"></div>
      <Show
        when={leftToggle()}
        fallback={
          <div class="i-cil:search position-absolute top-20px left-384px h-28px w-28px text-00000080" />
        }
      >
        <div
          onClick={() => {
            leftToggle(false);
            mapClick(0);
          }}
          class="i-majesticons:close-line position-absolute top-16px left-382px h-38px w-38px text-00000060 hover:text-DC143Ca0"
        />
      </Show>
      <div class="i-eva:menu-outline position-absolute top-20px left-24px h-28px w-28px text-000000A0" />
    </div>
  );
};

interface PopupData {
  cover: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

const LeftPopup: Component<{ open: Atom<boolean>; data?: Atom<PopupData> }> = (
  props
) => {
  createEffect(() => {
    if (mapClick() > 1) {
      console.log("left popup closed");
      props.open(false);
      mapClick(0);
    }
  });

  return (
    <Show when={props.open()}>
      <div class="position-absolute top-0 left-0 -z-10 h-100vh w-435px bg-ffffffa0 backdrop-blur-lg scrollbar-rounded scrollbar-w-100px">
        <img
          class="h-300px w-100% object-cover"
          src={
            "https://images.unsplash.com/photo-1551811484-e4e7b0fc775a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          }
        />
        <div class="p-12px lh-30px w-full h-[calc(100vh-300px)] scrollbar scrollbar-rounded scrollbar-w-8px scrollbar-track-color-#b254de20 scrollbar-thumb-color-#b254de70">
          <div class="my-14px">
          <h1 class="fs-2.7rem fw-bold">Ocean</h1>
          <div display-flex align-items-center gap-2px fw-regular>
            <div class="i-majesticons:map-marker-area"></div>
            <h2 class="fs-0.9rem">Gulf of Guinea</h2>
          </div>
          </div>

          <div class="text-justify lh-25px fs-0.8rem leading-0.7rem text-000000d0">
            <p my-1rem>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              condimentum erat ac sagittis porttitor. Curabitur congue rutrum
              diam. Donec vitae mi ac massa rhoncus porttitor venenatis sit amet
              nibh. Mauris vel condimentum velit, et gravida est. Ut cursus
              hendrerit lectus, sit amet eleifend lectus finibus a. Morbi turpis
              eros, aliquet ut ligula vel, convallis viverra neque.
            </p>
            <p>
              Maecenas convallis maximus justo vitae auctor. Aliquam quis
              ultrices mauris. Integer venenatis eros nec sagittis feugiat.
              Etiam viverra quam nec enim aliquam semper. Donec ante nunc,
              porttitor in ornare a, aliquet a nisi. Praesent convallis vel
              massa et tristique. Phasellus luctus tortor ac vehicula tempus.
              Nunc at gravida metus. Fusce tellus ipsum, varius sit amet quam
              eleifend, tincidunt fermentum quam. Maecenas posuere felis ut
              tincidunt finibus. Nulla vulputate lacus vitae varius iaculis. Sed
              placerat porta varius. Sed sit amet dictum tortor. Sed id lacus eu
              dolor ultricies tincidunt nec mollis sapien. Nam convallis, ipsum
              sit amet blandit viverra, metus orci rutrum ligula, bibendum
              rhoncus metus nibh quis nisi.
            </p>
            <p my-1rem>
              {" "}
              Curabitur sollicitudin nibh semper, feugiat elit quis, rhoncus
              elit. Pellentesque mollis odio tortor, quis fringilla lectus
              maximus eget. Fusce id nisl pulvinar, volutpat sapien vel,
              lobortis orci. Proin ligula est, ultrices id elit id, iaculis
              egestas odio. Vestibulum ultrices lorem quis mi viverra iaculis.
              Nulla lorem ipsum, efficitur sed dictum id, gravida vitae lorem.
              Etiam efficitur convallis semper. Sed convallis sapien a quam
              imperdiet dignissim. Nullam mollis enim feugiat tristique aliquet.
              Proin neque turpis, maximus quis gravida et, euismod laoreet quam.
              Vivamus finibus eget orci non aliquam. Mauris quis justo vel urna
              fringilla hendrerit. In libero dolor, varius vel laoreet nec,
              auctor pharetra magna. Nunc ac turpis vitae lorem auctor vehicula.
              Fusce non posuere orci, ac molestie justo. Donec vel sem nibh.
              Phasellus suscipit, mi vitae venenatis dignissim, ex lorem aliquam
              ligula, non interdum leo nulla in lacus. Praesent pulvinar
              molestie ex quis faucibus. Maecenas at ultrices mauris. Proin
              consequat enim purus, sit amet semper lorem blandit ut.
            </p>
            <p my-1rem>
              Maecenas at ultrices mauris. Proin consequat enim purus, sit amet
              semper lorem blandit ut. Cras at mauris mauris. Phasellus gravida,
              dolor ut vulputate sagittis, arcu nisl pharetra erat, at maximus
              nunc justo vitae sapien. Integer scelerisque non massa sed
              ultrices. Cras quis turpis id erat aliquam tincidunt. Fusce
              tincidunt dignissim orci, eget porttitor ipsum egestas sed. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Donec tempor, tellus ut vehicula iaculis,
              ligula felis fringilla tortor, ut feugiat lorem orci in arcu. Ut
              nec tortor a diam iaculis sodales sit amet ut enim. Pellentesque
              quis nunc tortor. Pellentesque enim sem, vulputate ac feugiat in,
              dapibus nec orci. Nam nisl libero, pulvinar nec varius eget,
              ullamcorper et augue.
            </p>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default MapUI;
