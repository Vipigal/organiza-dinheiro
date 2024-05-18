import { date, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { createId } from "@paralleldrive/cuid2";

export const usuario = pgTable("tb_usuario", {
  id: text("id_usuario").primaryKey(),
  nom_usuario: text("nom_usuario"),
  dat_registro: date("dat_registro").default("now()"),
});

export const conta = pgTable("tb_conta", {
  id_conta: text("id_conta")
    .primaryKey()
    .$defaultFn(() => createId()),
  nom_conta: text("nom_conta").notNull(),
  id_usuario: text("id_usuario").references(() => usuario.id),
  dat_registro: date("dat_registro").default("now()"),
});

export const insertContaSchema = createInsertSchema(conta);
