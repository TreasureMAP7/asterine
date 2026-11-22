import {
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
  text,
  boolean,
  decimal,
} from "drizzle-orm/mysql-core";

export const userRoles = ["user", "owner", "staff", "admin"] as const;
export const applicationStatuses = ["approved", "pending", "rejected"] as const;
export const orderStatuses = [
  "completed",
  "pending",
  "preparing",
  "cancelled",
] as const;

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
  restaurantId: int("restaurant_id").references(() => restaurantsTable.id, {
    onDelete: "cascade",
  }),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
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
      onDelete: "cascade",
    }),
  restaurantId: int("restaurant_id")
    .notNull()
    .references(() => restaurantsTable.id, {
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
      onDelete: "restrict",
    }),
  restaurantId: int("restaurant_id")
    .notNull()
    .references(() => restaurantsTable.id, {
      onDelete: "cascade",
    }),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  price: decimal("price", { precision: 12, scale: 2 }),
  stock: int("stock").notNull(),
  imageUrl: text("image_url"),
  imagePublicId: varchar("image_public_id", { length: 255 }),
  isDeleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const ordersTable = mysqlTable("orders", {
  id: int("order_id").autoincrement().primaryKey(),
  restaurantId: int("restaurant_id")
    .notNull()
    .references(() => restaurantsTable.id, { onDelete: "restrict" }),
  createdBy: int("created_by")
    .notNull()
    .references(() => usersTable.id, { onDelete: "restrict" }),
  customerId: int("customer_id").references(() => usersTable.id, {
    onDelete: "set null",
  }),
  customerName: varchar("customer_name", { length: 255 }),
  customerPhone: varchar("customer_phone", { length: 20 }),
  status: mysqlEnum("status", orderStatuses).notNull().default("pending"),
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
  deliveryFee: decimal("delivery_fee", { precision: 12, scale: 2 }).notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const orderItemsTable = mysqlTable("order_items", {
  id: int("order_item_id").autoincrement().primaryKey(),
  orderId: int("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  productId: int("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "restrict" }),
  productName: varchar("product_name", { length: 255 }).notNull(),
  productPrice: decimal("product_price", { precision: 12, scale: 2 }).notNull(),
  quantity: int("quantity").notNull(),
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});