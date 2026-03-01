// src/utils/calculations.ts
import type { Plant, Ripeness, ColorVariant, Mutation } from '../types';
import { RIPENESS_MULTIPLIERS, VARIANT_MULTIPLIERS } from '../types';

export function calculateSellValue(
  plant: Plant,
  currentWeight: number,
  ripeness: Ripeness,
  colorVariant: ColorVariant,
  activeMutations: Mutation[]
): number {
  // 1. Calculate the weight ratio, then SQUARE it for the quadratic scaling
  const weightRatio = currentWeight / plant.baseWeight;
  const weightMultiplier = Math.pow(weightRatio, 2); 
  
  // 2. Grab the static multipliers
  const ripenessMult = RIPENESS_MULTIPLIERS[ripeness];
  const colorMult = VARIANT_MULTIPLIERS[colorVariant];
  
  // 3. ADD the mutation multipliers together (defaults to 1 if none are active)
  const mutationMult = activeMutations.length > 0
    ? activeMutations.reduce((total, mut) => total + mut.multiplier, 0)
    : 1;
  
  // 4. Calculate the final value
  const finalValue = plant.basePrice * weightMultiplier * ripenessMult * colorMult * mutationMult;
  
  // 5. Round to the nearest whole number
  return Math.round(finalValue); 
}