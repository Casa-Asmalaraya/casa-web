import { OutBookingGuestDto } from "./out-booking-guest-dto";

export interface OutBookingDto {
  listingId?: number;
  fromDate?: number;
  toDate?: number;
  guests?: OutBookingGuestDto[];
}
