import express from "express";
import { db } from "./config/db.js";
import { ENV } from './config/env.js';
import { and, eq } from "drizzle-orm";
import { favoritesTable } from "./db/schema.js";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "Server is running" })
})

app.post("/api/favorites", async (req, res) => {
    try {
        const { userID, recipeID, title, image, cookTime, servings } = req.body;

        if (!userID || !recipeID || !title) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newFavorite = await db
            .insert(favoritesTable)
            .values({
                userID,
                recipeID,
                title,
                image,
                cookTime,
                servings,
            })
            .returning();

        res.status(201).json(newFavorite[0]);
    } catch (error) {
        console.log("Error adding favorite", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.get("/api/favorites/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const userFavorites = await db
            .select()
            .from(favoritesTable)
            .where(eq(favoritesTable.userID, userId));

        res.status(200).json(userFavorites);
    } catch (error) {
        console.log("Error fetching the favorites", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
    try {
        const { userId, recipeId } = req.params;

        await db
            .delete(favoritesTable)
            .where(
                and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
            );

        res.status(200).json({ message: "Favorite removed successfully" });
    } catch (error) {
        console.log("Error removing a favorite", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
});