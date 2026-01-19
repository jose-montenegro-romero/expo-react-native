/**
 * Validation middleware for favorite endpoints
 */

export const validateFavoriteInput = (req, res, next) => {
    const { userId, recipeId, title } = req.body;

    // Check required fields
    if (!userId || !recipeId || !title) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: userId, recipeId, title',
        });
    }

    // Validate userId is a string
    if (typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'userId must be a non-empty string',
        });
    }

    // Validate recipeId is a number
    if (typeof recipeId !== 'number' || recipeId <= 0) {
        return res.status(400).json({
            success: false,
            error: 'recipeId must be a positive number',
        });
    }

    // Validate title is a string
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'title must be a non-empty string',
        });
    }

    next();
};

export const validateUserId = (req, res, next) => {
    const { userId } = req.params;

    if (!userId || userId.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'userId is required',
        });
    }

    next();
};

export const validateRecipeId = (req, res, next) => {
    const { recipeId } = req.params;

    if (!recipeId || isNaN(parseInt(recipeId)) || parseInt(recipeId) <= 0) {
        return res.status(400).json({
            success: false,
            error: 'recipeId must be a valid positive number',
        });
    }

    next();
};
