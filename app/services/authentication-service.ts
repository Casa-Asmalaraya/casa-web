import { OutSignUpDto } from "~/dtos/authentication/out-sign-up-dto";
import { axiosInstance } from "../axios-instance";
import { OutSignInDto } from "../dtos/authentication/out-sign-in-dto";

export class AuthenticationService {
  static async signInAsync(dto: OutSignInDto, options?: { signal?: AbortSignal }): Promise<void> {
    await axiosInstance.post("authentication/sign-in", dto, { signal: options?.signal });
  }

  static async signUpAsync(dto: OutSignUpDto, options?: { signal?: AbortSignal }): Promise<void> {
    await axiosInstance.post("authentication/sign-up", dto, { signal: options?.signal });
  }

  static async checkAsync(options?: { signal?: AbortSignal }): Promise<void> {
    await axiosInstance.get("authentication/check", { signal: options?.signal });
  }
}
