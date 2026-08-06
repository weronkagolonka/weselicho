import {
  DietaryRestriction,
  GuestType,
  type BabyGuest,
  type Guest,
  type WeddingRsvp,
} from "../types/weddingRsvp";

export function defaultWeddingRsvp(): WeddingRsvp {
  return {
    recipient: {
      name: "",
      surname: "",
      email: "",
    },
    participating: undefined,
    details: {
      guests: {
        Adult: [],
        Teen: [],
        Child: [],
        Baby: [],
      },
      fromAbroad: undefined,
      requiresTransport: undefined,
      requiresAccommodation: undefined,
    },
  };
}

export function defaultGuest(guestType: GuestType): Guest | BabyGuest {
  if (guestType === GuestType.Baby) {
    return {
      name: "",
      surname: "",
      requiresFood: false,
      requiresHighChair: false,
    };
  }
  return {
    name: "",
    surname: "",
    dietaryRestriction: DietaryRestriction.None,
    pregnant: false,
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
