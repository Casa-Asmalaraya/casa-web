import { axiosInstance } from "~/axios-instance.server";
import { InTokenDto } from "~/dtos/authentication/in-token-dto";
import { OutSignInDto } from "~/dtos/authentication/out-sign-in-dto";
import { UrlUtils } from "~/utils/url-utils";

export class AuthenticationService {
  static async signInAsync(dto: OutSignInDto, options?: { signal?: AbortSignal }): Promise<InTokenDto> {
    const paths = ["authentication/sign-in"];

    const response = await axiosInstance.post(UrlUtils.generateUrl(paths), dto, { signal: options?.signal });

    return response.data.data as InTokenDto;
  }

  static async signUpAsync(dto: OutSignInDto, options?: { signal?: AbortSignal }): Promise<InTokenDto> {
    const paths = ["authentication/sign-up"];

    const response = await axiosInstance.post(UrlUtils.generateUrl(paths), dto, { signal: options?.signal });

    return response.data.data as InTokenDto;
  }

  static async checkAsync(options?: { accessToken?: string; signal?: AbortSignal }): Promise<void> {
    const paths = ["authentication/check"];

    await axiosInstance.get(UrlUtils.generateUrl(paths), {
      headers: options?.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {},
      signal: options?.signal,
    });
  }
}
