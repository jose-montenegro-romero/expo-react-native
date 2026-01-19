import { db } from '../config/db.js';
import { favoritesTable } from '../db/schema.js';
import { and, eq } from 'drizzle-orm';

export const addFavorite = async (req, res, next) => {
    try {
        const { userId, recipeId, title, image, cookTime, servings } = req.body;

        const newFavorite = await db
            .insert(favoritesTable)
            .values({
                userId,
                recipeId,
                title,
                image,
                cookTime,
                servings,
            })
            .returning();

        res.status(201).json({
            success: true,
            data: newFavorite[0],
        });
    } catch (error) {
        next(error);
    }
};

export const getUserFavorites = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const userFavorites = await db
            .select()
            .from(favoritesTable)
            .where(eq(favoritesTable.userId, userId))
            .orderBy(favoritesTable.createdAt);

        res.status(200).json({
            success: true,
            data: userFavorites,
        });
    } catch (error) {
        next(error);
    }
};

export const removeFavorite = async (req, res, next) => {
    try {
        const { userId, recipeId } = req.params;

        const result = await db
            .delete(favoritesTable)
            .where(
                and(
                    eq(favoritesTable.userId, userId),
                    eq(favoritesTable.recipeId, parseInt(recipeId))
                )
            )
            .returning();

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Favorite not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Favorite removed successfully',
        });
    } catch (error) {
        next(error);
    }
};
