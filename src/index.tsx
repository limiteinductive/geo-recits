/* @refresh reload */
import { Router } from "solid-app-router";
import { render } from "solid-js/web";



import 'uno.css';
import '@unocss/reset/tailwind.css'

import Home from "./pages/Home";


render(
  () => (
      <Router>
        <Home />
      </Router>
  ),
  document.getElementById("root") as HTMLElement
);
