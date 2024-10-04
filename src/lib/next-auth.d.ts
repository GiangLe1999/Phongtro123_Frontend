import { RoleType } from "../__generated__/graphql";

declare module "next-auth" {
  interface Session {
    user: {
      id: name;
      tel: string;
      name: string;
      role: RoleType;
      verified: boolean;
      balance: number;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: name;
      tel: string;
      name: string;
      role: RoleType;
      verified: boolean;
      balance: number;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
