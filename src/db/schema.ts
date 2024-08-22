import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const emailListSchema = pgTable("emailList", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  period: varchar("period", { length: 255 }).notNull(),
});

export const baseSchema = createInsertSchema(emailListSchema, {
  email: (schema) => schema.email.email(),
  period: z
    .literal("morning")
    .or(z.literal("afternoon"))
    .or(z.literal("evening")),
}).pick({ email: true, period: true });

export type SelectEmailList = z.infer<typeof baseSchema>;
export type InsertEmailList = InferSelectModel<typeof emailListSchema>;


