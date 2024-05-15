import { date, pgTable, serial, text } from "drizzle-orm/pg-core";

export const usuario = pgTable("tb_usuario", {
  id: serial("id_usuario").primaryKey(),
  nom_usuario: text("nom_usuario"),
  dat_registro: date("dat_registro").default("now()"),
});

export const conta = pgTable("tb_conta", {
  id: serial("id_conta").primaryKey(),
  id_usuario: serial("id_usuario").references(() => usuario.id),
  dat_registro: date("dat_registro").default("now()"),
});
