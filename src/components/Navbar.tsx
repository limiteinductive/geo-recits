import { createScrollPosition } from "@solid-primitives/scroll";
import { Link } from "solid-app-router";
import { Component, createEffect } from "solid-js";

const Navbar: Component = () => {
  const windowScroll = createScrollPosition();

  createEffect(() => {
    console.log(windowScroll.x, windowScroll.y);
    }
    );

  return (
    <nav class={`position-fixed w-100vw h-40pxn font-sans ${windowScroll.y ? "bg-9FAFA1A0" : "bg-9FAFA1"} border-color-9FAFA1A0 display-flex flex-between-center p-x-20 border-b-1px z-index-20`}>
      <HomeLogo />
      <NavItems />
      <Searchbar />
      <LoginButton />
    </nav>
  );
};

const HomeLogo: Component = () => {
  return (
    <Link href="/">
      <div display-flex min-width-px >
        <div class="i-ri-ancient-pavilion-fill font-size-40px p-y-2rem" />
        <span class="lh-4rem fs-24px fw-bold">Géo-Récits</span>
      </div>
    </Link>
  );
};

const NavItems: Component = () => {
  return (
    <div flex-around-center fs-18px>
      <Link href="/carte" class="m-x-5vw">
        <span fw-semi-bold>Carte</span>
      </Link>

      <Link href="/project" class="m-x-5vw">
        <span fw-semi-bold>Projet</span>
      </Link>

      <Link href="/participer" class="m-x-5vw">
        <span fw-semi-bold>Participer</span>
      </Link>
    </div>
  );
};

const Searchbar: Component = () => {
  return (
    <div class="position-relative">
      <div class="position-absolute top-4px left-8px">
        <div i-ic-baseline-search fs-22px/>
      </div>

      <input
        type="text"
        placeholder="Rechercher"
        class="border-none outline-none br-12 w-100pct h-34px p-l-34px p-x-4 bg-9FAFA110"
      />
    </div>
  );
};

const LoginButton: Component = () => {
  return <></>;
};

export default Navbar;
