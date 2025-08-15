import {ADD_ON_MATERIAL_COST, MARGIN_PERCENTAGE, type ADD_ON_MATERIAL_TYPE} from './addOnMaterialCost';
import {
    BASE_WINEBOX_LABOR_CONST_BY_TOTAL_SQI,
    COST_SQI_PER_PANEL,
    LABOR_LEVELS,
    PAINT_COST_PERCENTAGE,
    STAIN_COST_PERCENTAGE,
    SUPPLIES_COST_PERCENTAGE
} from './consts';
import {type Box, type RawCost} from './types';

/**
 * returns the total square inches of all panels in a box
 * @param box
 * @returns
 */
export const computeRawSQIandCost = (box : Box, costSQI = COST_SQI_PER_PANEL) : RawCost => {
    const rawPanel1SQI = box.panel1.length * box.panel1.width * box.panel1.thickness;
    const rawPanel2SQI = box.panel2.length * box.panel2.width * box.panel2.thickness;
    const rawBottomSQI = box.bottom.length * box.bottom.width * box.bottom.thickness;
    const rawCoverSQI = box.cover.length * box.cover.width * box.cover.thickness;

    const totalRawSQI = rawPanel1SQI + rawPanel2SQI + rawBottomSQI + rawCoverSQI;

    const totalSQIPerWall1 = 2 * rawPanel1SQI
    const totalSQIPerWall2 = 2 * rawPanel2SQI
    const totalSQIPerBottom = rawBottomSQI;
    const totalSQIPerCover = rawCoverSQI;

    const totalCostPerPanel1 = totalSQIPerWall1 * costSQI.panel1;
    const totalCostPerPanel2 = totalSQIPerWall2 * costSQI.panel2;
    const totalCostPerBottom = totalSQIPerBottom * costSQI.bottom;
    const totalCostPerCover = totalSQIPerCover * costSQI.cover;
    const totalCost = totalCostPerPanel1 + totalCostPerPanel2 + totalCostPerBottom + totalCostPerCover;

    return {
        totalSQI: totalRawSQI, // 2 panels of each type
        totalCost: totalCost
    }
}

/**
 * returns the total labor and surface cost based on the raw cost, labor level, and counts for stain, supplies, and paint
 * @param rawCost
 * @param laborLevel
 * @param stainCount
 * @param suppliesCount
 * @param paintCount
 * @returns
 */
export const computeLaborAndSurfaceCost = (rawCost : RawCost, laborLevel : keyof typeof LABOR_LEVELS, stainCount = 1, suppliesCount = 1, paintCount = 0) => {

    // TODO: labor cost multiplier should be based on the raw cost, not a constant
    const totalLaborCost = LABOR_LEVELS[laborLevel] * getRateOfLaborBasedOnTotalSQI(rawCost.totalSQI);
    const totalSuppliesCost = SUPPLIES_COST_PERCENTAGE * suppliesCount * (rawCost.totalCost + totalLaborCost);
    const totalStainCost = STAIN_COST_PERCENTAGE * stainCount * (rawCost.totalCost + totalLaborCost);
    const totalPaintCost = PAINT_COST_PERCENTAGE * paintCount * (rawCost.totalCost + totalLaborCost);

    const totalLaborAndSurfaceCost = rawCost.totalCost + totalLaborCost + totalStainCost + totalPaintCost + totalSuppliesCost;

    return {totalLaborCost, totalSuppliesCost, totalStainCost, totalPaintCost, totalLaborAndSurfaceCost}
}

/**
 * Computes the total cost including add-on materials
 * @param rawCost
 * @param addOnMaterialCost
 * @returns
 */
export const computeCostWithAddOns = (laborAndSurfaceCost : number, addOnMaterialCost : Record < ADD_ON_MATERIAL_TYPE, number >) => {
    const addOnTotalCost = Object
        .entries(addOnMaterialCost)
        .reduce((acc, [key, value]) => {
            const addOnCost = ADD_ON_MATERIAL_COST[key as ADD_ON_MATERIAL_TYPE];
            return acc + (addOnCost
                ? addOnCost * value
                : 0);
        }, 0);

    return addOnTotalCost + laborAndSurfaceCost;
}

/**
 * Computes the margins for the given add-on cost.
 * @param addOnCost
 * @returns
 */
export const computeCostWithMargins = (addOnCost : number) => {
    const margins : Record < keyof typeof MARGIN_PERCENTAGE,
        number > = {
            18: 0,
            20: 0,
            25: 0,
            30: 0,
            35: 0,
            40: 0,
            45: 0,
            50: 0,
            55: 0
        };
    Object
        .entries(MARGIN_PERCENTAGE)
        .forEach(([key, value]) => {
            margins[key as keyof typeof MARGIN_PERCENTAGE] = (addOnCost * value) + addOnCost;
        });

    return margins;
}

/**
 * TODO: This function is a placeholder and should be replaced with the actual logic to compute the rate of labor based on total SQI.
 * @param totalSQI
 * @returns
 */
export const getRateOfLaborBasedOnTotalSQI = (totalSQI : number) => {
    const baseRatio = totalSQI / BASE_WINEBOX_LABOR_CONST_BY_TOTAL_SQI

    if (baseRatio <= 0.3) 
        return 0.7; // Small items: 70% of base
    if (baseRatio <= 0.6) 
        return 0.8; // Medium-small: 80% of base
    if (baseRatio <= 1.0) 
        return 1.0; // Standard size: 100% of base
    return baseRatio * 1.1; // Large items: linear scaling
}