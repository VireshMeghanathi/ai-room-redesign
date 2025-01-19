import { pgTable, serial ,varchar, integer} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  imageUrl: varchar('imageUrl').notNull(),
  credits:integer('credits').default(10)
});