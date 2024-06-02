import { db } from "@/database/drizzle";
import { categorias, insertCategoriaSchema } from "@/database/schemas/schema";
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
      .from(categorias)
      .where(eq(categorias.id_usuario, auth.userId)); //talvez funcione caso o id_usuario seja sempre um texto, assumindo que nossa tabela de usuario tenha id que venha do clerk
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
          id_categoria: categorias.id_categoria,
          nom_categoria: categorias.nom_categoria,
          dat_registro: categorias.dat_registro,
        })
        .from(categorias)
        .where(
          and(
            eq(categorias.id_usuario, auth.userId),
            eq(categorias.id_categoria, id)
          )
        );

      if (!data) {
        return ctx.json({ error: "categoria não encontrada." as const }, 404);
      }

      return ctx.json({ data }, 200);
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertCategoriaSchema.pick({
        nom_categoria: true,
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { nom_categoria } = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado" as const }, 401);
      }

      const [data] = await db
        .insert(categorias)
        .values({
          nom_categoria,
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
      let id_categorias = Array.isArray(ids) ? ids : [ids];

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado" as const }, 401);
      }

      const data = await db
        .delete(categorias)
        .where(
          and(
            eq(categorias.id_usuario, auth.userId),
            inArray(categorias.id_categoria, id_categorias)
          )
        )
        .returning({ id_categoria: categorias.id_categoria });

      return ctx.json({ data }, 200);
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator("json", insertCategoriaSchema.pick({ nom_categoria: true })),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { id } = ctx.req.valid("param");
      const { nom_categoria } = ctx.req.valid("json");

      if (!id) {
        return ctx.json({ error: "Parâmetros Inválidos." as const }, 400);
      }

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado." as const }, 401);
      }

      const [data] = await db
        .update(categorias)
        .set({ nom_categoria })
        .where(
          and(
            eq(categorias.id_usuario, auth.userId),
            eq(categorias.id_categoria, id)
          )
        )
        .returning();

      if (!data) {
        return ctx.json({ error: "Categoria não encontrada." as const }, 404);
      }

      return ctx.json({ data }, 200);
    }
  );

export default app;
