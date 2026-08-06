import "little-state-machine";
import type { WeddingRsvp } from "./types/weddingRsvp";

declare module "little-state-machine" {
  /* eslint @typescript-eslint/no-empty-object-type: "off" */
  interface GlobalState extends WeddingRsvp {}
}
