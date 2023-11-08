import { axiosInstance } from "~/axios-instance.server";
import { InProfileDto } from "~/dtos/profile/in-profile-dto";
import { UrlUtils } from "~/utils/url-utils";

export class ProfileService {
  static async getAsync(options?: { accessToken?: string; signal?: AbortSignal }): Promise<InProfileDto> {
    const paths = ["profile"];

    const response = await axiosInstance.get(UrlUtils.generateUrl(paths), {
      headers: options?.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {},
      signal: options?.signal,
    });

    return response.data.data as InProfileDto;
  }
}
