import { ClerkOptions } from "@clerk/backend";
import { getAuth } from "@hono/clerk-auth";
import { MiddlewareHandler } from "hono";

declare module "hono" {
  interface Context {
    id_usuario: string;
  }
}

export const authMiddleware = (options?: ClerkOptions): MiddlewareHandler => {
  return async (ctx, next) => {
    const auth = getAuth(ctx);

    if (!auth?.userId || !auth) {
      return ctx.json({ error: "Não Autorizado" as const }, 401);
    }
    ctx.id_usuario = auth.userId;
    await next();
  };
};
