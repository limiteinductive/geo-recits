/* @refresh reload */
import { Router } from "solid-app-router";
import { render } from "solid-js/web";


import 'uno.css';


render(
  () => (
      <Router>
        <div>Hello world!</div>
      </Router>
  ),
  document.getElementById("root") as HTMLElement
);
