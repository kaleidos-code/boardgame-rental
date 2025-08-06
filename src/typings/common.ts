import { JWT } from 'next-auth/jwt'

import { User } from '../api/user/models/User'

export interface ServerSideComponentProp {
    params: Record<string, any> & {
      slug: string
      locale: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export type UserExtension = {
  user: Partial<User> | null;
};

export type GraphQlContext = {
  req: Request;
  res: Response;
  session?: UserExtension;
};

export type JWTTokenExtended = JWT & UserExtension
