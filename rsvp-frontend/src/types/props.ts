import type { WeddingRsvp } from "./weddingRsvp";

export type GuestFormComponentProps = {
  invitation: WeddingRsvp;
  setInvitation: React.Dispatch<React.SetStateAction<WeddingRsvp>>;
};
