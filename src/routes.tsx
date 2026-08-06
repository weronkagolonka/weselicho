import { createStore } from "little-state-machine";
import { createBrowserRouter } from "react-router";
import App from "./App";
import { Email } from "./pages/form/Email";
import { Guests } from "./pages/form/Guests";
import { Participation } from "./pages/form/Participation";
import { pages } from "./constants";
import { Home } from "./pages/HomePage";
import { defaultWeddingRsvp } from "./utils/weddingRsvp";
import { Summary } from "./pages/form/Summary";
import { OtherDetails } from "./pages/form/OtherDetails";

createStore(defaultWeddingRsvp());

export const router = createBrowserRouter([
  {
    path: pages.home,
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: pages.email,
        Component: Email,
      },
      {
        path: pages.participation,
        Component: Participation,
      },
      {
        path: pages.guests,
        Component: Guests,
      },
      {
        path: pages.otherDetails,
        Component: OtherDetails,
      },
      {
        path: pages.summary,
        Component: Summary,
      },
    ],
  },
]);
