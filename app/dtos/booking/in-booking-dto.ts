import { InListingDto } from "../listing/in-listing-dto";
import { InBookingGuestDto } from "./in-booking-guest-dto";

export interface InBookingDto {
  id?: number;
  fromDate?: number;
  toDate?: number;
  status?: string;
  listing?: InListingDto;
  guest?: InBookingGuestDto[];
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
