import { createParamDecorator, ExecutionContext } from "@nestjs/common";
export type AuthedUser = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};
export const AuthedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
