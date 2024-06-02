import { db } from "@/database/drizzle";
import {
  transacoes,
  insertTransacaoSchema,
  categorias,
  insertCategoriaSchema,
  contas,
} from "@/database/schemas/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { subDays, parse } from "date-fns";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        dat_inicio: z.string().optional(),
        dat_fim: z.string().optional(),
        id_conta: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (ctx) => {
      const auth = getAuth(ctx);

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado" as const }, 401);
      }

      const { dat_fim, dat_inicio, id_conta } = ctx.req.valid("query");

      const default_dat_fim = new Date();
      const default_dat_inicio = subDays(default_dat_fim, 30);

      const startDate = dat_inicio
        ? parse(dat_inicio, "yyyy-MM-dd", new Date())
        : default_dat_inicio;
      const endDate = dat_fim
        ? parse(dat_fim, "yyyy-MM-dd", new Date())
        : default_dat_fim;

      const data = await db
        .select({
          id_transacao: transacoes.id_transacao,
          data: transacoes.data,
          id_categoria: categorias.id_categoria,
          nom_categoria: categorias.nom_categoria,
          beneficiario: transacoes.beneficiario,
          valor: transacoes.valor,
          notas: transacoes.notas,
          nom_conta: contas.nom_conta,
          id_conta: contas.id_conta,
        })
        .from(transacoes)
        .innerJoin(contas, eq(transacoes.id_conta, contas.id_conta))
        .leftJoin(
          categorias,
          eq(transacoes.id_categoria, categorias.id_categoria)
        )
        .where(
          and(
            id_conta ? eq(transacoes.id_conta, id_conta) : undefined,
            eq(contas.id_usuario, auth.userId),
            gte(transacoes.data, startDate),
            lte(transacoes.data, endDate)
          )
        )
        .orderBy(transacoes.data);

      return ctx.json({ data }, 200);
    }
  )
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
          id_transacao: transacoes.id_transacao,
          data: transacoes.data,
          id_categoria: categorias.id_categoria,
          beneficiario: transacoes.beneficiario,
          valor: transacoes.valor,
          notas: transacoes.notas,
          id_conta: contas.id_conta,
        })
        .from(transacoes)
        .innerJoin(contas, eq(transacoes.id_conta, contas.id_conta))
        .leftJoin(
          categorias,
          eq(transacoes.id_categoria, categorias.id_categoria)
        )
        .where(
          and(
            eq(transacoes.id_transacao, id),
            eq(contas.id_usuario, auth.userId)
          )
        );

      if (!data) {
        return ctx.json({ error: "transacao não encontrada." as const }, 404);
      }

      return ctx.json({ data }, 200);
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertTransacaoSchema.omit({
        id_transacao: true,
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const values = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado" as const }, 401);
      }

      const [data] = await db
        .insert(transacoes)
        .values({
          ...values,
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
      const ids_transacoes = Array.isArray(ids) ? ids : [ids];

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado" as const }, 401);
      }

      const transacoes_a_deletar = db.$with("transacoes_a_deletar").as(
        db
          .select({ id: transacoes.id_transacao })
          .from(transacoes)
          .innerJoin(contas, eq(transacoes.id_conta, contas.id_conta))
          .where(
            and(
              inArray(transacoes.id_transacao, ids_transacoes),
              eq(contas.id_usuario, auth.userId)
            )
          )
      );

      const data = await db
        .with(transacoes_a_deletar)
        .delete(transacoes)
        .where(
          inArray(
            transacoes.id_transacao,
            sql`(select id from ${transacoes_a_deletar})`
          )
        )
        .returning({ id_transacao: transacoes.id_transacao });

      return ctx.json({ data }, 200);
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator("json", insertTransacaoSchema.omit({ id_transacao: true })),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { id } = ctx.req.valid("param");
      const values = ctx.req.valid("json");

      if (!id) {
        return ctx.json({ error: "Parâmetros Inválidos." as const }, 400);
      }

      if (!auth?.userId) {
        return ctx.json({ error: "Não autenticado." as const }, 401);
      }

      const transacoes_a_atualizar = db.$with("transacoes_a_atualizar").as(
        db
          .select({ id: transacoes.id_transacao })
          .from(transacoes)
          .innerJoin(contas, eq(transacoes.id_conta, contas.id_conta))
          .where(
            and(
              eq(transacoes.id_transacao, id),
              eq(contas.id_usuario, auth.userId)
            )
          )
      );

      const [data] = await db
        .with(transacoes_a_atualizar)
        .update(transacoes)
        .set(values)
        .where(
          inArray(
            transacoes.id_transacao,
            sql`(select id from ${transacoes_a_atualizar})`
          )
        )
        .returning();

      if (!data) {
        return ctx.json({ error: "Transacao não encontrada." as const }, 404);
      }

      return ctx.json({ data }, 200);
    }
  );

export default app;
