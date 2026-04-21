// Color themes for the 3D neural activation map.
// Each theme defines RGB color stops for the diverging colormap:
//   negative → neutral → mid-positive → peak-positive
// Plus a CSS gradient string used by the on-canvas legend.

export interface BrainColorTheme {
  name: string;
  // Near-zero neutral color
  neutral: [number, number, number];
  // Negative arm (grey → deepNegative)
  deepNegative: [number, number, number];
  // Positive arm (grey → midPositive → peakPositive)
  midPositive: [number, number, number];
  peakPositive: [number, number, number];
  // Fraction [0..1] of the positive arm where color transitions from mid to peak
  midSplit: number;
  // CSS gradient for the on-canvas legend bar
  legendGradient: string;
  // Short label shown next to the legend
  legendLabel: string;
}

// Default: blue → grey → red → yellow (original Post-Content palette)
export const defaultTheme: BrainColorTheme = {
  name: "default",
  neutral: [0.22, 0.22, 0.23],
  deepNegative: [0.05, 0.55, 0.95],
  midPositive: [0.85, 0.05, 0.05],
  peakPositive: [1.0, 0.85, 0.1],
  midSplit: 0.55,
  legendGradient:
    "linear-gradient(to right, #0c8cf2, #3a3a3a, #d20000, #ffdd00)",
  legendLabel: "Activation",
};

// Amber-Gold: teal → grey → amber → champagne (Gala-Ready)
export const amberGoldTheme: BrainColorTheme = {
  name: "amberGold",
  neutral: [0.22, 0.22, 0.23],
  deepNegative: [0.05, 0.42, 0.5],
  midPositive: [0.85, 0.35, 0.05],
  peakPositive: [1.0, 0.82, 0.35],
  midSplit: 0.5,
  legendGradient:
    "linear-gradient(to right, #0ea5a4, #3a3a3a, #d97706, #fcd34d)",
  legendLabel: "Elegance Response",
};

// Cyan-Electric: magenta → grey → electric blue → aqua (Neuro-Focus)
export const cyanElectricTheme: BrainColorTheme = {
  name: "cyanElectric",
  neutral: [0.22, 0.22, 0.23],
  deepNegative: [0.78, 0.12, 0.55],
  midPositive: [0.1, 0.5, 0.95],
  peakPositive: [0.2, 0.95, 0.95],
  midSplit: 0.55,
  legendGradient:
    "linear-gradient(to right, #d946ef, #3a3a3a, #2563eb, #22d3ee)",
  legendLabel: "Cognitive Load",
};

// Emerald-Focus: violet → grey → emerald → lime (Workspace Productivity)
export const emeraldFocusTheme: BrainColorTheme = {
  name: "emeraldFocus",
  neutral: [0.22, 0.22, 0.23],
  deepNegative: [0.45, 0.2, 0.85],
  midPositive: [0.05, 0.6, 0.35],
  peakPositive: [0.65, 0.95, 0.25],
  midSplit: 0.55,
  legendGradient:
    "linear-gradient(to right, #7c3aed, #3a3a3a, #059669, #a3e635)",
  legendLabel: "Focus Response",
};

export const brainThemes = {
  default: defaultTheme,
  amberGold: amberGoldTheme,
  cyanElectric: cyanElectricTheme,
  emeraldFocus: emeraldFocusTheme,
} as const;

export type BrainThemeKey = keyof typeof brainThemes;
