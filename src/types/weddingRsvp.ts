export enum DietaryRestriction {
  Vegan = "Vegan",
  Vegetarian = "Vegetarian",
  Allergy = "Allergy",
  None = "None",
}

export enum GuestType {
  Adult = "Adult",
  Teen = "Teen",
  Child = "Child",
  Baby = "Baby",
}

export type Guest = {
  name: string;
  surname: string;
  pregnant: boolean;
  dietaryRestriction: DietaryRestriction;
  allergy?: string;
};

export type BabyGuest = {
  name: string;
  surname: string;
  requiresHighChair: boolean;
  requiresFood: boolean;
};

export type GuestList = Record<
  GuestType.Adult | GuestType.Teen | GuestType.Child,
  Guest[]
> &
  Record<GuestType.Baby, BabyGuest[]>;

export type RsvpDetails = {
  guests: GuestList;
  fromAbroad?: boolean;
  requiresTransport?: boolean;
  requiresAccommodation?: boolean;
};

export type Recipient = {
  email: string;
  phone: string;
  name: string;
  surname: string;
};

export interface WeddingRsvp {
  recipient: Recipient;
  participating?: boolean;
  details: RsvpDetails;
}
