import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import MapGL, { Viewport, Source, Layer, Popup } from "solid-map-gl";
import { Atom, atom } from "solid-use";
import Marker from "../components/Marker";
import { createElementSize } from "@solid-primitives/resize-observer";
import { Slider, createSlider } from "solid-slider";
import KeenSlider, {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
  TrackDetails,
} from "keen-slider";

import "./map.css";
import { preview } from "vite";
import faunadb from "faunadb";

import "keen-slider/keen-slider.min.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibGltaXRlaW5kdWN0aXZlIiwiYSI6ImNsNTJ0cmVuazBqN2wzZXBwYjRhaW84b3UifQ.Vh2inPsp2_Bbm-TaomM-lA";

interface PopupData {
  coverUrl: string;
  title: string;
  date?: string;
  location: string;
  description: string;
}

const DATA: PopupData[] = [
  {
    coverUrl:
      "https://images.unsplash.com/photo-1551811484-e4e7b0fc775a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "Ocean",
    location: "Gulf of Guinea",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum erat ac sagittis porttitor. Curabitur congue rutrum diam. Donec vitae mi ac massa rhoncus porttitor venenatis sit amet nibh. Mauris vel condimentum velit, et gravida est. Ut cursushendrerit lectus, sit amet eleifend lectus finibus a. Morbi turpis eros, aliquet ut ligula vel, convallis viverra neque.",
  },
  {
    coverUrl:
      "https://images.unsplash.com/photo-1624383045192-cf512eb9d78c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "Port Harcourt",
    location: "Nigeria",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum erat ac sagittis porttitor. Curabitur congue rutrum diam. Donec vitae mi ac massa rhoncus porttitor venenatis sit amet nibh. Mauris vel condimentum velit, et gravida est. Ut cursushendrerit lectus, sit amet eleifend lectus finibus a. Morbi turpis eros, aliquet ut ligula vel, convallis viverra neque.",
  },
];

const q = faunadb.query;

var client = new faunadb.Client({
  secret: "fnAEq04GAIAAyG_fRcJuEJQHZmiNXzvHm-gHLAVP",
  domain: "db.eu.fauna.com",
  // NOTE: Use the correct domain for your database's Region Group.
  port: 443,
  scheme: "https",
});


const query = q.Map(
  q.Paginate(q.Documents(q.Collection("location"))),
  q.Lambda((x) => q.Get(x))
);

const placeData: {data: any} = await client.query(query);

console.log(placeData);

const WheelControls: KeenSliderPlugin = (slider) => {
  let touchTimeout: ReturnType<typeof setTimeout>;
  let position: {
    x: number;
    y: number;
  };
  let wheelActive: boolean;

  function dispatch(e: WheelEvent, name: string) {
    position.x -= e.deltaX + e.deltaY;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    );
  }

  function wheelStart(e: WheelEvent) {
    position = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(e, "ksDragStart");
  }

  function wheel(e: WheelEvent) {
    dispatch(e, "ksDrag");
  }

  function wheelEnd(e: WheelEvent) {
    dispatch(e, "ksDragEnd");
  }

  function eventWheel(e: WheelEvent) {
    e.preventDefault();

    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }
    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    });
  });
};

const mapClick = atom(0);
const leftToggle = atom(0);

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
      onClick={() => mapClick(mapClick() + 1)}
    >
      <MapSearch />
      <For each={placeData.data}>
        {(place: {data: any}) => {
          return (
            <Show when={place.data.lngLat}>
              <DataMarker
                lngLat={{
                  lng: place.data.lngLat[0],
                  lat: place.data.lngLat[1],
                }}
                data = {{
                  coverUrl: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  title: place.data.Title,
                  location: place.data.Title,
                  description: "lalalal"
                } as PopupData}
              ></DataMarker>
            </Show>
          );
        }}
      </For>
      <DataMarker lngLat={[0, 0]} data={DATA[0]}></DataMarker>
      <DataMarker lngLat={[10, 10]} data={DATA[1]}></DataMarker>
      <DataMarker lngLat={[15, 30]} data={DATA[1]}></DataMarker>

      <Carousel />
    </MapGL>
  );
};

const MapSearch: Component = () => {
  return (
    <div position-relative class="z-30">
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
            mapClick(mapClick() + 1);
          }}
          class="i-majesticons:close-line position-absolute top-16px left-382px h-38px w-38px text-00000060 hover:text-DC143Ca0"
        />
      </Show>
      <div class="i-eva:menu-outline position-absolute top-20px left-24px h-28px w-28px text-000000A0" />
    </div>
  );
};

const DataMarker: Component<{
  lngLat: any;
  options?: any;
  data?: PopupData;
}> = (props) => {
  const active = atom(false);

  createEffect((prev) => {
    if (leftToggle() == 2 && prev) {
      active(false);
      leftToggle(leftToggle() - 1);
    }

    return active();
  }, false);

  createEffect((prev) => {
    if (mapClick() > 1 && prev && leftToggle() < 2) {
      mapClick(0);
      leftToggle(leftToggle() - 1);
      active(false);
    }
    return active();
  });

  return (
    <>
      <LeftPopup open={active} data={props.data} />
      <Marker
        lngLat={props.lngLat}
        options={{
          color: active() ? "#C57CE6" : "#b254de",
          scale: active() ? 1.2 : 1,
        }}
        onClick={() => {
          mapClick(0);
          leftToggle(leftToggle() + (active() ? -1 : 1));
          active(!active());
        }}
      ></Marker>
    </>
  );
};

const LeftPopup: Component<{ open: Atom<boolean>; data: PopupData }> = (
  props
) => {
  return (
    <Show when={props.open()}>
      <div class="position-absolute top-0 left-0 z-20 h-100vh w-442px bg-ffffff scrollbar scrollbar-rounded scrollbar-w-8px scrollbar-track-color-#b254de10 scrollbar-thumb-color-#300c4140">
        <img class="h-300px w-100% object-cover" src={props.data.coverUrl} />
        <div class="px-30px py-20px lh-30px w-full">
          <div class="my-18px">
            <h1 class="fs-2.7rem fw-bold">{props.data.title}</h1>
            <div display-flex align-items-center gap-2px fw-regular>
              <div class="i-majesticons:map-marker-area"></div>
              <h2 class="fs-0.9rem">{props.data.location}</h2>
            </div>
          </div>

          <div class="text-justify lh-25px fs-0.8rem leading-0.9rem text-000000d0">
            <p my-1rem>{props.data.description}</p>
          </div>
        </div>
      </div>
    </Show>
  );
};

const Carousel: Component = () => {
  return (
    <div
      class="position-fixed h-180px mx-auto px-40px shadow-lg bg-ffffff40 backdrop-blur-lg z-10"
      style="bottom: 80px ; left: calc( 480px ); max-width: calc( 100vw - 520px )"
    >
      <CarouselSlider></CarouselSlider>
    </div>
  );
};

const CarouselSlider: Component = (props) => {
  const target = atom<HTMLElement | null>(null);

  const [create, { current, next, prev, moveTo, details, slider, destroy }] =
    createSlider(
      {
        loop: false,
        mode: "snap",
        initial: 1,
        slides: { perView: "auto", spacing: 20, origin: 0.5 },
      },
      WheelControls
    );

  return (
    <div
      ref={target}
      use:create
      class="keen-slider bg-ffffff40 h-180px z-10 py-18px"
      style="max-width: calc(100vw-720px)"
    >
      <For each={Array(10).fill(0)}>
        {(_, i) => <CarouselCard current={current} id={i()} moveTo={moveTo} />}
      </For>
    </div>
  );
};

const CarouselCard: Component<{
  data?: any;
  id: number;
  current: Atom<number>;
  moveTo: any;
}> = (props) => {
  const active = atom(false);

  createEffect((prev) => {
    if (prev != props.current()) {
      active(props.id == props.current());
    }
    return props.current();
  }, 0);

  return (
    <div
      onClick={() => {
        props.moveTo(props.id, 500);
        active(!active());
      }}
      class={`${
        active() ? "ring-8px" : ""
      } keen-slider__slide border-radius-15px min-width-180px max-height-140px bg-ffffff z-10 cursor-pointer`}
    >
      <img
        class="object-cover h-full w-full border-radius-10px z-15 "
        src={`https://picsum.photos/seed/${props.id}/180/140`}
      />
    </div>
  );
};

export default MapUI;
