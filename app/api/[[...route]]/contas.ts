import { db } from "@/database/drizzle";
import { conta, insertContaSchema } from "@/database/schemas/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";

const app = new Hono()
  .get("/", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);

    if (!auth?.userId) {
      return ctx.json({ error: "Não autenticado" as const }, 401);
    }
    const data = await db
      .select()
      .from(conta)
      .where(eq(conta.id_usuario, auth.userId)); //talvez funcione caso o id_usuario seja sempre um texto, assumindo que nossa tabela de usuario tenha id que venha do clerk
    return ctx.json({ data }, 200);
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string().optional() })),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { id } = ctx.req.valid("param");

      if (!id) {
        return ctx.json({ error: "Parâmetros Inválidos." as const }, 400);
      }

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado." as const }, 401);
      }

      const [data] = await db
        .select({
          id_conta: conta.id_conta,
          nom_conta: conta.nom_conta,
          dat_registro: conta.dat_registro,
        })
        .from(conta)
        .where(and(eq(conta.id_usuario, auth.userId), eq(conta.id_conta, id)));

      if (!data) {
        return ctx.json({ error: "Conta não encontrada." as const }, 404);
      }

      return ctx.json({ data }, 200);
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertContaSchema.pick({
        nom_conta: true,
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { nom_conta } = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado" as const }, 401);
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
  )
  .post(
    "/delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()).or(z.string()),
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { ids } = ctx.req.valid("json");
      let id_contas = Array.isArray(ids) ? ids : [ids];

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado" as const }, 401);
      }

      const data = await db
        .delete(conta)
        .where(
          and(
            eq(conta.id_usuario, auth.userId),
            inArray(conta.id_conta, id_contas)
          )
        )
        .returning({ id_conta: conta.id_conta });

      return ctx.json({ data }, 200);
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator("json", insertContaSchema.pick({ nom_conta: true })),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { id } = ctx.req.valid("param");
      const { nom_conta } = ctx.req.valid("json");

      if (!id) {
        return ctx.json({ error: "Parâmetros Inválidos." as const }, 400);
      }

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado." as const }, 401);
      }

      const [data] = await db
        .update(conta)
        .set({ nom_conta })
        .where(and(eq(conta.id_usuario, auth.userId), eq(conta.id_conta, id)))
        .returning();

      if (!data) {
        return ctx.json({ error: "Conta não encontrada." as const }, 404);
      }

      return ctx.json({ data }, 200);
    }
  );

export default app;
