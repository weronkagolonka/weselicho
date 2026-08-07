import type { WeddingRsvp } from "@weselicho/shared";
import "little-state-machine";

declare module "little-state-machine" {
  /* eslint @typescript-eslint/no-empty-object-type: "off" */
  interface GlobalState extends WeddingRsvp {}
}
