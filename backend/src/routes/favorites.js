import express from 'express';
import { validateFavoriteInput, validateUserId, validateRecipeId } from '../middleware/validation.js';
import {
    addFavorite,
    getUserFavorites,
    removeFavorite,
} from '../controllers/favoritesController.js';

const router = express.Router();

/**
 * POST /api/favorites
 * Add a new favorite recipe
 */
router.post('/', validateFavoriteInput, addFavorite);

/**
 * GET /api/favorites/:userId
 * Get all favorites for a user
 */
router.get('/:userId', validateUserId, getUserFavorites);

/**
 * DELETE /api/favorites/:userId/:recipeId
 * Remove a favorite recipe
 */
router.delete('/:userId/:recipeId', validateUserId, validateRecipeId, removeFavorite);

export default router;
