import { GuestType } from "./types/weddingRsvp";

const guestFormFieldIdPrefix = "guest-form-field-";
export const guestFormFieldIds = {
  details: `${guestFormFieldIdPrefix}details`,
  participation: `${guestFormFieldIdPrefix}participation`,
  email: `${guestFormFieldIdPrefix}email`,
  [GuestType.Adult]: `${guestFormFieldIdPrefix}adult-guests`,
  [GuestType.Teen]: `${guestFormFieldIdPrefix}teen-guests`,
  [GuestType.Child]: `${guestFormFieldIdPrefix}child-guests`,
  [GuestType.Baby]: `${guestFormFieldIdPrefix}baby-guests`,
};

export const pages = {
  home: "/",
  email: "/form-email",
  participation: "/form-participation",
  guests: "/form-guests",
  otherDetails: "/form-other-details",
  summary: "/form-summary",
};
