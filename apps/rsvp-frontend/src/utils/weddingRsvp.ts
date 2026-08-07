import { type Guest, type GuestType, type WeddingRsvp } from "@weselicho/shared";

export function defaultWeddingRsvp(): WeddingRsvp {
  return {
    invitee: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
    participating: undefined,
    details: {
      guests: [],
      fromAbroad: undefined,
      requiresTransport: undefined,
      requiresAccommodation: undefined,
    },
  };
}

export function defaultGuest(guestType: GuestType): Guest {
  return {
    type: guestType,
    name: "",
    surname: "",
    dietaryRestriction: "None",
  };
}

export function updateRsvp(
  state: WeddingRsvp,
  payload: Partial<WeddingRsvp>,
): WeddingRsvp {
  return {
    ...state,
    ...payload,
    details: {
      ...state.details,
      ...payload.details,
    },
  };
}

export function getGuestsofType(type: GuestType, guests: Guest[]): Guest[] {
  return guests.filter((g) => g.type === type);
}
