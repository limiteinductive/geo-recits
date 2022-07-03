import { NavLink } from "solid-app-router";
import { Component } from "solid-js";

import illu from "/src/assets/hero_illustration.png";
import icm from "/src/assets/icm.png";

const Hero: Component = () => {
  return (
    <div class="h-800px w-1280px mx-auto flex">
      <div class="w-50%">
        <HeroTitle />
        <HeroBtn />
      </div>

      <HeroIllustration />
    </div>
  );
};

const HeroTitle: Component = () => {
  return (
    <div class="mt-220px leading-90px relative">
      <span class="underline fs-30px">comprendre</span>
      <h1 class="text-148px fw-900">l'EXIL</h1>
      <h2 class="text-18px fw-light leading-22px py-42px w-600px">
        géo-récits vous fait parcourir les parcours d’artistes et de
        scientifiques exilés du Moyen-Orient, d’Afrique du Nord, d’Europe de
        l’Est, des Balkans et d’Amérique du Sud.
      </h2>
      <img src={icm} class="absolute top-30 left-300px w-32px h-140px" />
    </div>
  );
};

const HeroBtn: Component = () => {
  return (
    <NavLink href="/map">
      <button class="w-300px h-54px bg-C57CE6 color-fff fw-bold fs-22px border-radius-10px flex pt-8px">
        <div class="i-akar-icons-map fs-40px mx-12px"></div>
        <div class="text-center pt-4px">Accédez à la carte</div>
      </button>
    </NavLink>
  );
};

const HeroIllustration: Component = () => {
  return (
    <div class="w-50% mt-180px translate-x-70px">
      <img src={illu} alt="illustration" />
    </div>
  );
};

export default Hero;
