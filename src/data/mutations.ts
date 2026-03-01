// src/data/mutations.ts
import { 
  CloudFog, Droplet, Snowflake, Waves, 
  Wind, Zap, Star, Sparkles, CloudRain, 
  Tornado, Flame, MountainSnow 
} from 'lucide-react';
import type { Mutation } from '../types'; // You'll need to remove 'imageFile' from this type and add 'icon: any'

export const mutationsData: Mutation[] = [
  { id: 'foggy', name: 'Foggy', multiplier: 1.25, icon: CloudFog },
  { id: 'soaked', name: 'Soaked', multiplier: 1.25, icon: Droplet },
  { id: 'chilled', name: 'Chilled', multiplier: 1.5, icon: Snowflake },
  { id: 'flooded', name: 'Flooded', multiplier: 1.75, icon: Waves },
  { id: 'snowy', name: 'Snowy', multiplier: 2.0, icon: MountainSnow },
  { id: 'sandy', name: 'Sandy', multiplier: 2.5, icon: Tornado },
  { id: 'frostbit', name: 'Frostbit', multiplier: 3.5, icon: Wind },
  { id: 'mossy', name: 'Mossy', multiplier: 3.5, icon: CloudRain }, // Adjust these as you see fit!
  { id: 'shocked', name: 'Shocked', multiplier: 4.5, icon: Zap },
  { id: 'muddy', name: 'Muddy', multiplier: 5.0, icon: Flame }, // Example
  { id: 'starstruck', name: 'Starstruck', multiplier: 6.5, icon: Star },
  { id: 'meteoric', name: 'Meteoric', multiplier: 10.0, icon: Sparkles },
];