import { date, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

export const contas = pgTable("tb_conta", {
  id_conta: text("id_conta")
    .primaryKey()
    .$defaultFn(() => createId()),
  nom_conta: text("nom_conta").notNull(),
  id_usuario: text("id_usuario").notNull(),
  dat_registro: date("dat_registro").default("now()"),
});

export const relacoesContas = relations(contas, ({ many }) => ({
  transacoes: many(transacoes),
}));

export const insertContaSchema = createInsertSchema(contas);

export const categorias = pgTable("tb_categoria", {
  id_categoria: text("id_categoria")
    .primaryKey()
    .$defaultFn(() => createId()),
  nom_categoria: text("nom_categoria").notNull(),
  id_usuario: text("id_usuario").notNull(),
  dat_registro: date("dat_registro").default("now()"),
});

export const insertCategoriaSchema = createInsertSchema(categorias);

export const transacoes = pgTable("tb_transacao", {
  id_transacao: text("id_transacao")
    .primaryKey()
    .$defaultFn(() => createId()),
  valor: integer("valor").notNull(),
  beneficiario: text("beneficiario").notNull(),
  notas: text("notas"),
  data: timestamp("data", { mode: "date" }).notNull(),
  id_conta: text("id_conta")
    .references(() => contas.id_conta)
    .notNull(),
  id_categoria: text("id_categoria")
    .references(() => categorias.id_categoria)
    .notNull(),
});

export const insertTransacaoSchema = createInsertSchema(transacoes, {
  data: z.coerce.date(),
});

export const relacoesTransacoes = relations(transacoes, ({ one }) => ({
  conta: one(contas, {
    fields: [transacoes.id_conta],
    references: [contas.id_conta],
  }),
  categoria: one(categorias, {
    fields: [transacoes.id_categoria],
    references: [categorias.id_categoria],
  }),
}));
