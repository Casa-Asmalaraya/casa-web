import { InRegionDto } from "../region/in-region-dto";
import { InListingFacilityDto } from "./in-listing-facility-dto";
import { InPhotoDto } from "../in-photo-dto";
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
  lat?: number;
  long?: number;
  province?: InRegionDto | null;
  regency?: InRegionDto | null;
  district?: InRegionDto | null;
  village?: InRegionDto | null;
  coverPhoto?: InPhotoDto | null;
  photos?: InPhotoDto[];
  listingRooms?: InListingRoomDto[];
  listingFacilities?: InListingFacilityDto[];
  listingRules?: InListingRuleDto[];
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
