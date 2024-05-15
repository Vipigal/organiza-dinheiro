import { Hono } from "hono";
import { handle } from "hono/vercel";
import contas from "./contas";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// app.use("*", clerkMiddleware());

const routes = app.route("/contas", contas);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
