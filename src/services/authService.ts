import type { LoginRequest, LoginResponse } from "../types/auth";
import { api } from "./api";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}
