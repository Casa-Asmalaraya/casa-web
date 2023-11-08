import { axiosInstance } from "~/axios-instance.server";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { OutBookingDto } from "~/dtos/booking/out-booking-dto";
import { UrlUtils } from "~/utils/url-utils";

export class BookingService {
  static async getListAsync(options?: {
    page?: string | null;
    search?: string | null;
    accessToken?: string;
    signal?: AbortSignal;
  }): Promise<InBookingDto[]> {
    const paths = ["booking"];
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

    return response.data.data as InBookingDto[];
  }

  static async getAsync(id: number, options?: { accessToken?: string; signal?: AbortSignal }): Promise<InBookingDto> {
    const paths = ["booking/", id.toString()];

    const response = await axiosInstance.get(UrlUtils.generateUrl(paths), {
      headers: options?.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {},
      signal: options?.signal,
    });

    return response.data.data as InBookingDto;
  }

  static async addAsync(
    dto: OutBookingDto,
    options?: { accessToken?: string; signal?: AbortSignal }
  ): Promise<InBookingDto> {
    const paths = ["booking"];

    const response = await axiosInstance.post(UrlUtils.generateUrl(paths), dto, {
      headers: options?.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {},
      signal: options?.signal,
    });

    return response.data.data as InBookingDto;
  }
}
