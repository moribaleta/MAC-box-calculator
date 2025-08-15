
export const LABOR_LEVELS = {
    low: 70, // Low labor cost multiplier
    medium: 100, // Medium labor cost multiplier
    high: 120, // High labor cost multiplier
}


export const COST_SQI_PER_PANEL = {
    panel1: 0.5, // Cost per square inch for panel 1
    panel2: 0.5, // Cost per square inch for panel 2
    bottom: 0.5, // Cost per square inch for bottom
    cover: 0.5, // Cost per square inch for cover
};// Cost per square inch

export const THICKNESS = {
    level1: 0.4,
    level2: 0.5, // Thickness for level 2
    level3: 0.7, // Thickness for level 3
}

export const BASE_WINEBOX_LABOR_CONST_BY_TOTAL_SQI = 96; // Base labor constant by volume for a wine box, used to calculate the labor cost based on the total volume of the box

//TODO: This is a constant that can be used to calculate the cost of labor based on the total
export const LABOR_COST_MULTIPLIERS = 1.33; // Number of labor cost multipliers to consider

/**
 * Percentage of the total cost for stain
 * This is a constant that can be used to calculate the cost of stain based on the total
 */ 
export const STAIN_COST_PERCENTAGE = 0.2

/**
 * Percentage of the total cost for paint
 * This is a constant that can be used to calculate the cost of paint based on the total
 */
export const PAINT_COST_PERCENTAGE = 0.2;


/**
 * Percentage of the total cost for supplies
 * ie glue, screws, etc.
 * This is a constant that can be used to calculate the cost of supplies based on the total
 */
export const SUPPLIES_COST_PERCENTAGE = 0.2;