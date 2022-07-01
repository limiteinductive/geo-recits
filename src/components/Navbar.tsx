import { createScrollPosition } from "@solid-primitives/scroll";
import { Link } from "solid-app-router";
import { Component, createEffect } from "solid-js";
import { atom } from "solid-use";

import logo from "/src/assets/logo.png";

const Navbar: Component = () => {
  const windowScroll = createScrollPosition();

  let scrollOffset = 200;
  const hideNavbar = atom(false);

  createEffect((prevScrollY: number) => {
    if (prevScrollY < windowScroll.y) {
      scrollOffset = scrollOffset + (prevScrollY - windowScroll.y);
    } else {
      scrollOffset = scrollOffset - (windowScroll.y - prevScrollY);
    }

    if (scrollOffset > 200) {
      scrollOffset = 200;
      hideNavbar(false);
    }

    if (scrollOffset < 0) {
      scrollOffset = 0;
      hideNavbar(true);
    }

    console.log(hideNavbar());

    console.log(scrollOffset);

    return windowScroll.y;
  }, 0);

  return (
    <nav
      class={`${hideNavbar() ? "-translate-y-100px" : ""} ${
        windowScroll.y == 0 ? "" : "backdrop-blur-4px shadow-b-4px"
      } transition duration-500 ease-out  position-fixed top-0 w-100vw h-80px font-sans bg-fff40 flex-between-center p-x-20 z-index-20`}
    >
      <div class="w-1280px flex mx-auto">
        <HomeLogo />
        <NavItems />
        <NavBtn />
      </div>
    </nav>
  );
};

const HomeLogo: Component = () => {
  return (
    <Link href="/" class="-translate-x-42px">
      <img src={logo} />
    </Link>
  );
};

const NavItems: Component = () => {
  return (
    <div class="flex-around-center fs-18px mx-auto gap-4vw -translate-x-50px">
      <Link href="/carte">
        <span fw-semi-bold>Évenements</span>
      </Link>

      <Link href="/project">
        <span fw-semi-bold>Équipe & Partenaires</span>
      </Link>

      <Link href="/participer">
        <span fw-semi-bold>Contact</span>
      </Link>
    </div>
  );
};

const NavBtn: Component = () => {
  return (
    <div class="-translate-x-10px w-192px h-46px border-3.5px border-radius-10px mt-16px display-flex">
      <div class="i-akar-icons-map fs-36px mx-14px mt-2px">
      </div>
      <div class="mt-4px fw-bold fs-21.5px">
Découvrir
      </div>

    </div>
  );
};

export default Navbar;
