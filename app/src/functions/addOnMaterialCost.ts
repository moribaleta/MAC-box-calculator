export type ADD_ON_MATERIAL_TYPE = "Abaca rope" | "Engraving" | 
"Large Hinges" | "Small Hinges" | "GF Latch" | "Latch-w-hook" | "Latch-w-lock" | "Large-latch-w-hook" | "Quadrant-lock" | "watch-pillows" | "watch-knobs" | "GF-Metal-handle" | "Metal-handle-tray" | "Caster-wheels" | "Foam-padding" | "Wine-accessories" | "Small-boxes" |  "Leather straps" |  "Velvet lining" | "Glass" | "Padlock-w-key" | "Glass";

export const ADD_ON_MATERIAL_COST : Record<ADD_ON_MATERIAL_TYPE, number> = {
    "Abaca rope": 8,
    "Engraving": 30,
    "Large Hinges": 40,
    "Small Hinges": 15,
    "GF Latch": 25,
    "Latch-w-hook": 35,
    "Latch-w-lock": 40,
    "Large-latch-w-hook": 50,
    "Quadrant-lock": 25,
    "watch-pillows": 18,
    "watch-knobs": 100,
    "GF-Metal-handle": 135,
    "Metal-handle-tray": 75,
    "Caster-wheels": 50,
    "Foam-padding": 50,
    "Wine-accessories": 160,
    "Small-boxes": 250,
    "Leather straps": 100,
    "Velvet lining": 20,
    "Glass": 20,
    "Padlock-w-key": 40,
}

export const ADD_ON_MATERIAL_DETAILS : Record<ADD_ON_MATERIAL_TYPE, string> = {
    "Abaca rope": "12 inches of rope",
    "Engraving": "max size of 3x3 inches",
    "Large Hinges": "",
    "Small Hinges": "",
    "GF Latch": "",
    "Latch-w-hook": "",
    "Latch-w-lock": "",
    "Large-latch-w-hook": "",
    "Quadrant-lock": "",
    "watch-pillows": "",
    "watch-knobs": "",
    "GF-Metal-handle": "",
    "Metal-handle-tray": "",
    "Caster-wheels": "",
    "Foam-padding": "",
    "Wine-accessories": "",
    "Small-boxes": "",
    "Leather straps": "12 inches of leather strap",
    "Velvet lining": "computed per SQI",
    "Glass": "computed per SQI",
    "Padlock-w-key": "",
}

export const MARGIN_PERCENTAGE = {
    '18': 0.18, // 18% margin on the total cost
    '20': 0.2, // 20% margin on the total cost
    '25': 0.25, // 25% margin on the total cost
    '30': 0.3, // 30% margin on the total cost
    '35': 0.35, // 35% margin on the total cost
    '40': 0.4, // 40% margin on the total cost
    '45': 0.45, // 45% margin on the total cost
    '50': 0.5, // 50% margin on the total cost
    '55': 0.55, // 55% margin on the total cost
};