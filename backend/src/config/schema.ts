import {
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

export const userRoles = ["user", "owner", "staff", "admin"] as const;
export const applicationStatuses = ["approved", "pending", "rejected"] as const;

export const restaurantsTable = mysqlTable("restaurants", {
  id: int("restaurant_id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  address: text("address").notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  imageUrl: text("image_url"),
  imagePublicId: varchar("image_public_id", { length: 255 }),
  isDeleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const usersTable = mysqlTable("users", {
  id: int("user_id").autoincrement().primaryKey(),
  restaurantId: int("restaurant_id")
    .notNull()
    .references(() => restaurantsTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  password: varchar("password", { length: 50 }).notNull(),
  role: mysqlEnum("role", userRoles).notNull().default("user"),
  imageUrl: text("image_url"),
  imagePublicId: varchar("image_public_id", { length: 255 }),
  isDeleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const applicationsTable = mysqlTable("employments", {
  id: int("employment_id").autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  restaurantId: int("restaurant_id")
    .notNull()
    .references(() => restaurantsTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  message: text("message"),
  status: mysqlEnum("status", applicationStatuses).notNull().default("pending"),
  fileUrl: text("file_url"),
  filePublicId: varchar("file_public_id", { length: 255 }),
  fileName: varchar("file_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const categoriesTable = mysqlTable("categories", {
  id: int("categories_id").autoincrement().primaryKey(),
  restaurantId: int("restaurant_id")
    .notNull()
    .references(() => restaurantsTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  isDeleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const productsTable = mysqlTable("products", {
  id: int("product_id").autoincrement().primaryKey(),
  categoryId: int("category_id")
    .notNull()
    .references(() => categoriesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  restaurantId: int("restaurant_id")
    .notNull()
    .references(() => restaurantsTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  imageUrl: text("image_url"),
  imagePublicId: varchar("image_public_id", { length: 255 }),
  isDeleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// TODOS: BUAT SCHEMA
