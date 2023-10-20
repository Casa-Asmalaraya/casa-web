import { InListingRoomItemDto } from "./in_listing_room_item_dto";

export interface InListingRoomDto {
  id?: number;
  name?: string;
  isShared?: boolean;
  items?: InListingRoomItemDto[];
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
