import { InRegionDto } from "../region/in-region-dto";
import { InListingFacilityDto } from "./in-listing-facility-dto";
import { InListingPhotoDto } from "./in-listing-photo-dto";
import { InListingRoomDto } from "./in-listing-room-dto";
import { InListingRuleDto } from "./in-listing-rule-dto";

export interface InListingDto {
  id?: number;
  name?: string;
  description?: string;
  minimumStay?: number;
  maximumStay?: number;
  maximumGuest?: number;
  price?: number;
  address?: string;
  googleMapLink?: string;
  province?: InRegionDto | null;
  regency?: InRegionDto | null;
  district?: InRegionDto | null;
  village?: InRegionDto | null;
  coverPhoto?: InListingPhotoDto | null;
  photos?: InListingPhotoDto[];
  listingRooms?: InListingRoomDto[];
  listingFacilities?: InListingFacilityDto[];
  listingRules?: InListingRuleDto[];
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
