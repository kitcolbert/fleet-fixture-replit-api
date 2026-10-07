import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const booksTable = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
});

export const insertBookSchema = createInsertSchema(booksTable)
  .omit({ id: true })
  .extend({
    title: z.string().trim().min(1).max(200),
    author: z.string().trim().min(1).max(160),
  });

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof booksTable.$inferSelect;
