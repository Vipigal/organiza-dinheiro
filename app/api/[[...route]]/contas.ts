import { db } from "@/database/drizzle";
import { conta } from "@/database/schemas/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Context, Hono } from "hono";

const app = new Hono().get("/", clerkMiddleware(), async (ctx) => {
  const auth = getAuth(ctx);

  if (!auth?.userId) {
    return ctx.json({ error: "Não autenticado" }, 401);
  }
  const data = await db
    .select({ id: conta.id, id_usuario: conta.id_usuario })
    .from(conta);
  // .where(eq(conta.id_usuario, auth.userId)) //talvez funcione caso o id_usuario seja sempre um texto, assumindo que nossa tabela de usuario tenha id que venha do clerk
  return ctx.json({ data }, 200);
});

export default app;
