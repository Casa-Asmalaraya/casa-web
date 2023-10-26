import { InPhotoDto } from "../in-photo-dto";

export interface InProfileDto {
  id?: string;
  name?: string;
  emailAddress?: string;
  type?: string;
  photo?: InPhotoDto;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
