import { axiosInstance } from "~/axios-instance";
import { InRegionDto } from "~/dtos/region/in-region-dto";
import { UrlUtils } from "~/utils/url-utils";

export class RegionService {
  static async getListAsync(options?: {
    parentId?: string | null;
    page?: string | null;
    search?: string | null;
    accessToken?: string;
    signal?: AbortSignal;
  }): Promise<InRegionDto[]> {
    const paths = ["region"];
    const searchParams = [];

    if (options?.parentId) {
      searchParams.push(`parentId=${options?.parentId}`);
    }

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

    return response.data.data as InRegionDto[];
  }
}
