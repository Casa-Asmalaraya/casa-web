import { axiosInstance } from "~/axios-instance";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { UrlUtils } from "~/utils/url-utils";

export class ListingService {
  static async getListAsync(options?: {
    page?: string | null;
    search?: string | null;
    accessToken?: string;
    signal?: AbortSignal;
  }): Promise<InListingDto[]> {
    const paths = ["listing"];
    const searchParams = [];

    if (options?.page) {
      searchParams.push(`page=${options?.page}`);
    }

    if (options?.search) {
      searchParams.push(`search=${options?.search}`);
    }

    const response = await axiosInstance.get(UrlUtils.generateUrl(paths, { searchParams }), {
      headers: options?.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {},
      signal: options?.signal,
    });

    return response.data.data as InListingDto[];
  }

  static async getAsync(id: number, options?: { accessToken?: string; signal?: AbortSignal }): Promise<InListingDto> {
    const paths = ["listing/", id.toString()];

    const response = await axiosInstance.get(UrlUtils.generateUrl(paths), {
      headers: options?.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {},
      signal: options?.signal,
    });

    return response.data.data as InListingDto;
  }
}
