import { InListingDto } from "../listing/in-listing-dto";
import { InBookingGuestDto } from "./in-booking-guest-dto";
import { InBookingPaymentDto } from "./in-booking-payment-dto";

export interface InBookingDto {
  id?: number;
  fromDate?: number;
  toDate?: number;
  totalPrice?: number;
  bookingStatus?: string;
  listing?: InListingDto;
  payment?: InBookingPaymentDto;
  guests?: InBookingGuestDto[];
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
