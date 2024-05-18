import { db } from "@/database/drizzle";
import { conta, insertContaSchema } from "@/database/schemas/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);

    if (!auth?.userId) {
      return ctx.json({ error: "Não autenticado" }, 401);
    }
    const data = await db
      .select({ id_conta: conta.id_conta, id_usuario: conta.id_usuario })
      .from(conta);
    // .where(eq(conta.id_usuario, auth.userId)) //talvez funcione caso o id_usuario seja sempre um texto, assumindo que nossa tabela de usuario tenha id que venha do clerk
    return ctx.json({ data }, 200);
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertContaSchema),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { nom_conta } = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado" }, 401);
      }

      const [data] = await db
        .insert(conta)
        .values({
          nom_conta,
          id_usuario: auth.userId,
        })
        .returning();

      return ctx.json({ data }, 200);
    }
  );

export default app;
