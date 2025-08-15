import type { THICKNESS } from "./consts";

export type Panels = {
    length: number;
    width: number;
    thickness: typeof THICKNESS[keyof typeof THICKNESS]; // Thickness can be level1, level2, or level3
}

export type Box = {
    panel1: Panels;
    panel2: Panels;
    bottom: Panels;
    cover: Panels;
}


export type ComputedResult = {
    totalSQI: number;
    totalPcs: number;
    totalCost: number;
}

export type RawCost = {
    totalSQI: number;
    totalCost: number;
}

export type LaborAndSurfaceCost = {
    totalLaborCost: number;
    totalStainCost: number;
    totalPaintCost: number;
    totalSuppliesCost: number;
    totalLaborAndSurfaceCost: number;
}