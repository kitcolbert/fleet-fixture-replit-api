import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { booksTable, db } from "@workspace/db";
import {
  CreateBookBody,
  CreateBookResponse,
  DeleteBookParams,
  ListBooksResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/books", async (_req, res): Promise<void> => {
  const books = await db.select().from(booksTable).orderBy(asc(booksTable.id));
  res.set("Cache-Control", "no-store").json(ListBooksResponse.parse(books));
});

router.post("/books", async (req, res): Promise<void> => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const parsed = CreateBookBody.safeParse({
    title: typeof body.title === "string" ? body.title.trim() : body.title,
    author: typeof body.author === "string" ? body.author.trim() : body.author,
  });

  if (!parsed.success) {
    res.status(400).json({
      error: "Provide a title (1–200 characters) and author (1–160 characters).",
    });
    return;
  }

  const [book] = await db.insert(booksTable).values(parsed.data).returning();
  res.status(201).json(CreateBookResponse.parse(book));
});

router.delete("/books/:id", async (req, res): Promise<void> => {
  const rawId = req.params.id;
  const parsed = DeleteBookParams.safeParse(req.params);
  if (
    typeof rawId !== "string" ||
    !/^[1-9]\d*$/.test(rawId) ||
    !parsed.success ||
    parsed.data.id > 2147483647
  ) {
    res.status(400).json({ error: "Book ID must be a positive integer." });
    return;
  }

  const [deleted] = await db
    .delete(booksTable)
    .where(eq(booksTable.id, parsed.data.id))
    .returning({ id: booksTable.id });

  if (!deleted) {
    res.status(404).json({ error: "Book not found." });
    return;
  }

  res.status(204).end();
});

export default router;
