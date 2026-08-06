import { createStore } from "little-state-machine";
import { createBrowserRouter } from "react-router";
import App from "./App";
import { Participation } from "./pages/form/Participation";
import { pages } from "./constants";
import { Home } from "./pages/HomePage";
import { defaultWeddingRsvp } from "./utils/weddingRsvp";
import { Summary } from "./pages/form/Summary";
import { OtherDetails } from "./pages/form/OtherDetails";
import { GuestLocation } from "./pages/form/GuestLocation";
import { ConfirmationDetails } from "./pages/form/ConfirmationDetails";
import { Guests } from "./pages/form/Guests";

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
        path: pages.confirmationDetails,
        Component: ConfirmationDetails,
      },
      {
        path: pages.participation,
        Component: Participation,
      },
      {
        path: pages.guestLocation,
        Component: GuestLocation,
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
