// src/data/plants.ts
import type { Plant } from '../types';

export const plants: Plant[] = [
  { id: 'carrot', name: 'Carrot', baseWeight: 0.07, basePrice: 30, seedCost: 20, imageFile: 'carrot.png', harvestType: 'single' },
  { id: 'corn', name: 'Corn', baseWeight: 0.18, basePrice: 15, seedCost: 100, imageFile: 'corn.png', harvestType: 'multi' },
  { id: 'dandelion', name: 'Dandelion', baseWeight: 0.03, basePrice: 45, seedCost: null, imageFile: 'dandelion.png', harvestType: 'single' },
  { id: 'sunpetal', name: 'Sunpetal', baseWeight: 0.04, basePrice: 60, seedCost: null, imageFile: 'sunpetal.png', harvestType: 'single' },
  { id: 'onion', name: 'Onion', baseWeight: 0.13, basePrice: 220, seedCost: 200, imageFile: 'onion.png', harvestType: 'single' },
  { id: 'strawberry', name: 'Strawberry', baseWeight: 0.02, basePrice: 32, seedCost: 800, imageFile: 'strawberry.png', harvestType: 'multi' },
  { id: 'mushroom', name: 'Mushroom', baseWeight: 0.03, basePrice: 40, seedCost: 1500, imageFile: 'mushroom.png', harvestType: 'single' },
  { id: 'bellpepper', name: 'Bellpepper', baseWeight: 0.14, basePrice: 50, seedCost: null, imageFile: 'bellpepper.png', harvestType: 'multi' },
  { id: 'goldenberry', name: 'Goldenberry', baseWeight: 0.02, basePrice: 55, seedCost: null, imageFile: 'goldenberry.png', harvestType: 'multi' },
  { id: 'beetroot', name: 'Beetroot', baseWeight: 0.09, basePrice: 2000, seedCost: 2500, imageFile: 'beetroot.png', harvestType: 'single' },
  { id: 'tomato', name: 'Tomato', baseWeight: 0.15, basePrice: 60, seedCost: 4000, imageFile: 'tomato.png', harvestType: 'multi' },
  { id: 'apple', name: 'Apple', baseWeight: 0.19, basePrice: 270, seedCost: 7000, imageFile: 'apple.png', harvestType: 'multi' },
  { id: 'rose', name: 'Rose', baseWeight: 0.04, basePrice: 320, seedCost: 10000, imageFile: 'rose.png', harvestType: 'multi' },
  { id: 'amberpine', name: 'Amberpine', baseWeight: 0.08, basePrice: 400, seedCost: null, imageFile: 'amberpine.png', harvestType: 'single' },
  { id: 'birch', name: 'Birch', baseWeight: 0.06, basePrice: 500, seedCost: null, imageFile: 'birch.png', harvestType: 'multi' },
  { id: 'wheat', name: 'Wheat', baseWeight: 0.03, basePrice: 7200, seedCost: 12000, imageFile: 'wheat.png', harvestType: 'single' },
  { id: 'bamboo', name: 'Bamboo', baseWeight: 4.00, basePrice: 4000, seedCost: 4000, imageFile: 'bamboo.png', harvestType: 'single' },
  { id: 'banana', name: 'Banana', baseWeight: 0.12, basePrice: 750, seedCost: 30000, imageFile: 'banana.png', harvestType: 'multi' },
  { id: 'plum', name: 'Plum', baseWeight: 0.07, basePrice: 1000, seedCost: 60000, imageFile: 'plum.png', harvestType: 'multi' },
  { id: 'potato', name: 'Potato', baseWeight: 0.17, basePrice: 1500, seedCost: 100000, imageFile: 'potato.png', harvestType: 'multi' },
  { id: 'orange', name: 'Orange', baseWeight: 0.21, basePrice: 1800, seedCost: null, imageFile: 'orange.png', harvestType: 'multi' },
  { id: 'emberwood', name: 'Emberwood', baseWeight: 0.15, basePrice: 2200, seedCost: null, imageFile: 'emberwood.png', harvestType: 'multi' },
  { id: 'cabbage', name: 'Cabbage', baseWeight: 1.10, basePrice: 60000, seedCost: 150000, imageFile: 'cabbage.png', harvestType: 'single' },
  { id: 'cherry', name: 'Cherry', baseWeight: 0.01, basePrice: 8000, seedCost: 1000000, imageFile: 'cherry.png', harvestType: 'multi' },
  { id: 'mango', name: 'Mango', baseWeight: 0.25, basePrice: 10000, seedCost: 10000000, imageFile: 'mango.png', harvestType: 'multi' },
  { id: 'olive', name: 'Olive', baseWeight: 0.06, basePrice: 10000, seedCost: null, imageFile: 'olive.png', harvestType: 'multi' },
  { id: 'dawnfruit', name: 'Dawnfruit', baseWeight: 0.06, basePrice: 600, seedCost: null, imageFile: 'dawnfruit.png', harvestType: 'multi' },
  { id: 'dawnblossom', name: 'Dawnblossom', baseWeight: 0.12, basePrice: 12000, seedCost: null, imageFile: 'dawnblossom.png', harvestType: 'single' },
  { id: 'biohazardmelon', name: 'Biohazard Melon', baseWeight: 0.20, basePrice: 28, seedCost: null, imageFile: 'biohazardmelon.png', harvestType: 'multi' },
  { id: 'lablushberry', name: 'Lablush Berry', baseWeight: 0.02, basePrice: 55, seedCost: null, imageFile: 'lablushberry.png', harvestType: 'multi' },
  { id: 'starvine', name: 'Starvine', baseWeight: 0.05, basePrice: 360, seedCost: null, imageFile: 'starvine.png', harvestType: 'multi' },
  { id: 'radiantpetal', name: 'Radiant Petal', baseWeight: 0.01, basePrice: 5000, seedCost: null, imageFile: 'radiantpetal.png', harvestType: 'multi' },
  { id: 'octobranch', name: 'Octobranch', baseWeight: 0.20, basePrice: 6000, seedCost: null, imageFile: 'octobranch.png', harvestType: 'multi' },
  
  // --- ROYAL SEED PACK ---
  { id: 'twistedsunflower', name: 'Twisted Sunflower', baseWeight: 0.10, basePrice: 50, seedCost: null, imageFile: 'twistedsunflower.png', harvestType: 'single' }, // [cite: 35]
  { id: 'glowcorn', name: 'Glowcorn', baseWeight: 0.10, basePrice: 35, seedCost: null, imageFile: 'glowcorn.png', harvestType: 'single' }, // [cite: 35]
  { id: 'firefern', name: 'Firefern', baseWeight: 0.10, basePrice: 300, seedCost: null, imageFile: 'firefern.png', harvestType: 'single' }, // [cite: 35]
  { id: 'titanbloom', name: 'Titan Bloom', baseWeight: 0.10, basePrice: 1600, seedCost: null, imageFile: 'titanbloom.png', harvestType: 'single' }, // [cite: 35]
  { id: 'glowvein', name: 'Glowvein', baseWeight: 0.10, basePrice: 11000, seedCost: null, imageFile: 'glowvein.png', harvestType: 'single' }, // [cite: 35]

  // --- STREAK SEED PACK ---
  { id: 'lostlight', name: 'Lostlight', baseWeight: 0.10, basePrice: 40, seedCost: null, imageFile: 'lostlight.png', harvestType: 'single' }, // [cite: 41]
  { id: 'roundmelon', name: 'Roundmelon', baseWeight: 0.10, basePrice: 38, seedCost: null, imageFile: 'roundmelon.png', harvestType: 'single' }, // [cite: 41]
  { id: 'infernoppeper', name: 'Inferno Pepper', baseWeight: 0.10, basePrice: 280, seedCost: null, imageFile: 'infernoppeper.png', harvestType: 'single' }, // [cite: 41]
  { id: 'glowflower', name: 'Glowflower', baseWeight: 0.10, basePrice: 1400, seedCost: null, imageFile: 'glowflower.png', harvestType: 'single' }, // [cite: 41]
  { id: 'bluerose', name: 'Bluerose', baseWeight: 0.10, basePrice: 11500, seedCost: null, imageFile: 'bluerose.png', harvestType: 'single' } // [cite: 41]
];