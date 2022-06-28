import { Link } from "solid-app-router";
import { Component } from "solid-js";

const Navbar: Component = () => {
  return (
    <nav class="w-100vw h-4rem bg-90CFEB display-flex flex-between-center p-x-20">
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
      <div display-flex>
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
        class="border border-2px border-color-3C4A3E br-12 w-100pct h-30px p-l-30px p-x-4"
      />
    </div>
  );
};

const LoginButton: Component = () => {
  return <></>;
};

export default Navbar;
