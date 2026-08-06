import {
  DietaryRestriction,
  GuestType,
  type BabyGuest,
  type Guest,
  type Guestt,
  type WeddingRsvp,
} from "../types/weddingRsvp";

export function defaultWeddingRsvp(): WeddingRsvp {
  return {
    recipient: {
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

export function defaultGuest(guestType: GuestType): Guestt {
  return {
    type: guestType,
    name: "",
    surname: "",
    dietaryRestriction: DietaryRestriction.None,
  };
}

export function updateGuest<T extends Guest | BabyGuest>(
  guest: T,
  payload: Partial<T>,
): T {
  return {
    ...guest,
    ...payload,
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

export function getGuestsofType(type: GuestType, guests: Guestt[]): Guestt[] {
  return guests.filter((g) => g.type === type);
}
