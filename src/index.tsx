/* @refresh reload */
import { Route, Router, Routes } from "solid-app-router";
import { render } from "solid-js/web";



import 'uno.css';
import '@unocss/reset/tailwind.css'

import Home from "./pages/Home";
import MapUI from "./pages/MapUI";



render(
  () => (
      <Router>
        <Routes >
          <Route path="/" component={Home} />
          <Route path="/map" component={MapUI} />
        </Routes>
      </Router>
  ),
  document.getElementById("root") as HTMLElement
);
