import { pgTable, serial, text, timestamp, integer, index, unique } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable(
    "favorites",
    {
        id: serial("id").primaryKey(),
        userId: text("user_id").notNull(),
        recipeId: integer("recipe_id").notNull(),
        title: text("title").notNull(),
        image: text("image"),
        cookTime: text("cook_time"),
        servings: text("servings"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
        userRecipeUnique: unique().on(table.userId, table.recipeId),
        userIdIdx: index("idx_favorites_user_id").on(table.userId),
        recipeIdIdx: index("idx_favorites_recipe_id").on(table.recipeId),
        createdAtIdx: index("idx_favorites_created_at").on(table.createdAt),
    })
);