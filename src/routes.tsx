import { createStore } from "little-state-machine";
import { createBrowserRouter } from "react-router";
import App from "./App";
import { Email } from "./components/form/pages/Email";
import { Guests } from "./components/form/pages/Guests";
import { Participation } from "./components/form/pages/Participation";
import { pages } from "./constants";
import { GuestFormPage } from "./pages/GuestFormPage";
import { Home } from "./pages/HomePage";
import { defaultWeddingRsvp } from "./utils/weddingRsvp";
import { Summary } from "./components/form/pages/Summary";
import { OtherDetails } from "./components/form/pages/OtherDetails";

createStore(defaultWeddingRsvp());

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: pages.form,
        Component: GuestFormPage,
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
