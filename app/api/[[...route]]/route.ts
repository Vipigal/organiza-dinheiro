import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use("*", clerkMiddleware());

app.get(
  "/hello/:id",
  zValidator(
    "param",
    z.object({
      id: z.string(),
    })
  ),
  async (ctx) => {
    const auth = getAuth(ctx);

    if (auth?.userId) {
      console.log(auth.userId);
    }
    return ctx.json({ hello: "world", id: ctx.req.valid("param").id });
  }
);

export const GET = handle(app);
export const POST = handle(app);
