export type UserRole = 'USER' | 'ADMIN';

export interface JwtPayload {
  sub: string;
  role: UserRole;
  exp: number;
  iat: number;
}
