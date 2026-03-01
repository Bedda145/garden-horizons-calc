// src/types/index.ts

import type { ElementType } from 'react';

export type HarvestType = 'single' | 'multi';

export interface Plant {
  id: string;
  name: string;
  baseWeight: number; // in kg
  basePrice: number;  // The base sell price in $
  seedCost: number | null;   // How much the seed costs in the shop
  imageFile: string;  // e.g., 'carrot.png' to map to your assets folder
  harvestType: HarvestType;
}

export type Ripeness = 'Unripe' | 'Ripened' | 'Lush';

// Creating a constant object maps the type exactly to its multiplier
export const RIPENESS_MULTIPLIERS: Record<Ripeness, number> = {
  Unripe: 1.0,
  Ripened: 2.0,
  Lush: 3.0,
};

export type ColorVariant = 'None' | 'Silver' | 'Gold';

export const VARIANT_MULTIPLIERS: Record<ColorVariant, number> = {
  None: 1.0,
  Silver: 2.0,
  Gold: 5.0,
};

export interface Mutation {
  id: string;
  name: string;
  multiplier: number;
  icon: ElementType; 
}

export interface CartItem {
  id: string; // A unique ID so we can remove specific items from the cart later
  plant: Plant;
  weight: number;
  ripeness: Ripeness;
  variant: ColorVariant;
  mutations: Mutation[];
  harvests: number;
  estimatedValue: number;
  netProfit: number;
}