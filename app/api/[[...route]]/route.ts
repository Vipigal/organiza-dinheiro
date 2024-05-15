import { Hono } from "hono";
import { handle } from "hono/vercel";
import contas from "./contas";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, ctx) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.log("Erro caiu no app.onError", err.message);
  return ctx.json({ error: "Internal Server Error" }, 500);
});

// app.use("*", clerkMiddleware());

const routes = app.route("/contas", contas);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;

// app.get(
//   "/hello/:id",
//   zValidator(
//     "param",
//     z.object({
//       id: z.string(),
//     })
//   ),
//   async (ctx) => {
//     const auth = getAuth(ctx);

//     if (auth?.userId) {
//       console.log(auth.userId);
//     }
//     return ctx.json({ hello: "world", id: ctx.req.valid("param").id });
//   }
// );
