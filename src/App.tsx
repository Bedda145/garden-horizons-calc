// src/App.tsx
import { useState } from 'react';
import { plants } from './data/plants';
import { calculateSellValue } from './utils/calculations';
import { mutationsData } from './data/mutations';
import type { Ripeness, ColorVariant, Mutation, CartItem } from './types';

function App() {
  // State: This acts as the memory for our calculator's current settings
  const [selectedPlant, setSelectedPlant] = useState(plants[0]); // Defaults to the Carrot we made
  const [weight, setWeight] = useState(selectedPlant.baseWeight);
  const [ripeningValue, setRipeningValue] = useState<number>(1.0);
  const [variant, setVariant] = useState<ColorVariant>('None');
  const [mutations, setMutations] = useState<Mutation[]>([]); // Empty for now until we build the mutation grid
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [harvests, setHarvests] = useState(1);
  const [plotSize, setPlotSize] = useState(1);

  // This creates a new array on the fly containing only the plants that match the search
  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMutation = (clickedMutation: Mutation) => {
    // Check if it's already active
    const isActive = mutations.some((m) => m.id === clickedMutation.id);
    
    if (isActive) {
      // Remove it from the active list
      setMutations(mutations.filter((m) => m.id !== clickedMutation.id));
    } else {
      // Add it to the active list
      setMutations([...mutations, clickedMutation]);
    }
  };

// --- NEW PRECISION MATH ENGINE ---
  // 1. Determine the label automatically based on the exact slider value
  const ripeness: Ripeness = ripeningValue < 2 ? 'Unripe' : ripeningValue < 3 ? 'Ripened' : 'Lush';

  // 2. We pass 'Unripe' to bypass your old math, and multiply by our exact precision decimal instead
  const baseEstimatedValue = calculateSellValue(selectedPlant, weight, 'Unripe', variant, mutations);
  const exactEstimatedValue = Math.round(baseEstimatedValue * ripeningValue);
  
  // 3. Scale it by harvests and plots
  const totalEstimatedValue = exactEstimatedValue * harvests * plotSize; 
  const totalSeedCost = (selectedPlant.seedCost || 0) * plotSize;
  const netProfit = totalEstimatedValue - totalSeedCost;

  // Calculate ROI %. If seed cost is 0, it returns null (which we will style as "Pure Profit")
  const roiPercentage = totalSeedCost > 0 ? ((netProfit / totalSeedCost) * 100) : null;

  // --- PROFITABILITY TIER LOGIC ---
  let tier = 'C';
  let tierStyles = '';
  
  if (roiPercentage === null || roiPercentage >= 300) {
    tier = 'S'; // God-tier (or pure profit forageable)
    tierStyles = 'text-amber-400 border-amber-400/50 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.4)]';
  } else if (roiPercentage >= 100) {
    tier = 'A'; // Excellent return
    tierStyles = 'text-teal-400 border-teal-400/40 bg-teal-400/10 shadow-[0_0_10px_rgba(45,212,191,0.2)]';
  } else if (roiPercentage >= 20) {
    tier = 'B'; // Good return
    tierStyles = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  } else if (roiPercentage >= 0) {
    tier = 'C'; // Breaking even or slight profit
    tierStyles = 'text-gray-400 border-gray-600/30 bg-gray-600/10';
  } else {
    tier = 'F'; // Taking a loss
    tierStyles = 'text-red-400 border-red-500/40 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
  }

  // --- NEW CART LOGIC ---
  const addToCart = () => {
    const newItem: CartItem = {
      id: crypto.randomUUID(), 
      plant: selectedPlant,
      weight,
      ripeness,
      ripeningValue,
      variant,
      mutations: [...mutations],
      harvests, 
      plotSize, // <-- Save it to the receipt
      estimatedValue: totalEstimatedValue, 
      netProfit
    };
    setCart([newItem, ...cart]); 
  };

  const removeFromCart = (idToRemove: string) => {
    setCart(cart.filter(item => item.id !== idToRemove));
  };

  const totalCartValue = cart.reduce((sum, item) => sum + item.estimatedValue, 0);
  const totalCartProfit = cart.reduce((sum, item) => sum + item.netProfit, 0);
  // ----------------------

 return (
    <div className="min-h-screen bg-[#0f1411] text-gray-200 p-8 font-sans selection:bg-emerald-500/30 relative">
      
      {/* --- PERFORMANCE FIX: Hardware-Accelerated Background Layer --- */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/better_bg_version.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      {/* Ambient Atmospheric Glows (Also set to 'fixed' to stop scroll repainting) */}
      <div className="fixed inset-0 bg-black/60 z-0 pointer-events-none"></div>
      <div className="fixed top-[10%] left-[10%] w-[50%] h-[50%] bg-emerald-950/40 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[15%] right-[10%] w-[40%] h-[40%] bg-teal-950/30 rounded-full blur-[140px] pointer-events-none z-0"></div>
      {/* -------------------------------------------------------------- */}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Upgraded Header */}
        <header className="mb-8 border-b border-[#232d27] pb-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
          <div className="flex items-center gap-4">
            <img src="/sunpetal.png" alt="Logo" className="w-12 h-12 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200 tracking-tight">
                Garden Horizons Pro
              </h1>
              <p className="text-gray-400 text-sm mt-1 font-medium">Advanced value estimation & ROI tracker.</p>
            </div>
          </div>

          {/* Ko-fi Support Button */}
          <a 
            href="https://ko-fi.com/bedda145" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 bg-[#161d19]/80 hover:bg-emerald-500/10 border border-[#232d27] hover:border-emerald-500/50 text-gray-400 hover:text-emerald-300 px-4 py-2.5 rounded-xl transition-all font-bold text-sm backdrop-blur-sm shadow-lg shadow-black/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <span className="text-lg group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">☕</span>
            Support the Dev
          </a>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Settings Panel */}
          <div className="lg:col-span-2 space-y-8 bg-[#161d19]/90 p-6 rounded-2xl border border-[#232d27]/70 shadow-2xl backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white">Settings</h2>

            {/* Plant Selection Grid */}
            <div className="bg-[#161d19] p-4 rounded-xl border border-[#232d27]">
              <div className="flex justify-between items-end mb-3">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider block">
                  Select Plant
                </label>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                  {filteredPlants.length} Available
                </span>
              </div>

              {/* Real-time Search Input */}
              <input
                type="text"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1410] border border-[#232d27] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors mb-3"
              />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {/* Notice we map over filteredPlants here instead of plants! */}
                {filteredPlants.map((plant) => (
                  <button
                    key={plant.id}
                    onClick={() => {
                      setSelectedPlant(plant);
                      setWeight(plant.baseWeight); // Pro UX: Reset weight when changing plants
                      setHarvests(1);
                    }}
                    // Removed all scaling. Added overflow-hidden and internal gradient glows.
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-colors duration-200 overflow-hidden ${
                      selectedPlant.id === plant.id
                        ? 'bg-linear-to-br from-emerald-500/20 to-transparent border-emerald-500 text-emerald-300 shadow-[inset_0_0_20px_rgba(16,185,129,0.15)]'
                        : 'bg-gray-900 border-gray-800/50 text-gray-500 hover:bg-gray-800/80 hover:text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    {/* Visual Indicator: Tiny colored dot for multi-harvest plants */}
                    {plant.harvestType === 'multi' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" title="Multi-Harvest Crop"></span>
                    )}
                    
                    <img 
                      src={`/${plant.imageFile}`} 
                      alt={plant.name} 
                      className="w-10 h-10 mb-2 object-contain drop-shadow-md"
                      onError={(e) => {
                        // Fallback just in case you misspell an image name or forget to download it
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="text-sm font-bold z-10">{plant.name}</span>
                    <span className="text-xs opacity-70 font-medium z-10">{plant.baseWeight} kg</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Weight Slider Section */}
            <div className="bg-[#161d19] p-4 rounded-xl border border-[#232d27]">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Crop Weight (kg)
                </label>
                
                {/* Pro UX: Number input field instead of just static text */}
                <div className="flex items-center bg-[#0d1410] border border-[#232d27] rounded-lg px-2 py-1">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                    className="w-16 bg-transparent text-right text-sm font-bold text-emerald-400 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-emerald-600/50 ml-1">kg</span>
                </div>
              </div>
              
              {/* Dynamic max value: scales to 5x the plant's base weight */}
              <input 
                type="range" 
                min="0.01" 
                max={selectedPlant.baseWeight * 5} 
                step="0.01"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
            
            {/* Farm Plot Size Toggle */}
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between items-end mb-3">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider block">
                  Farm Plot Size
                </label>
                {plotSize > 1 && <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">Mass Harvest</span>}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 10, 50, 100].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPlotSize(size)}
                    className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                      plotSize === size
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'bg-[#161d19] border-[#232d27] text-gray-500 hover:bg-[#1a241f] hover:text-gray-300'
                    }`}
                  >
                    {size}x
                  </button>
                ))}
              </div>
            </div>
            
            {/* Ripening Precision Slider */}
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Ripening Multiplier
                </label>
                
                {/* Precision Input */}
                <div className="flex items-center bg-[#0d1410] border border-[#232d27] rounded-lg px-2 py-1">
                  <input
                    type="number"
                    min="1.00"
                    max="3.00"
                    step="0.01"
                    value={ripeningValue}
                    onChange={(e) => {
                      let val = parseFloat(e.target.value) || 1;
                      if (val > 3) val = 3; // Hard cap at Lush
                      setRipeningValue(val);
                    }}
                    className="w-16 bg-transparent text-right text-sm font-bold text-emerald-400 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-emerald-600/50 ml-1">x</span>
                </div>
              </div>
              
              <input 
                type="range" 
                min="1.00" 
                max="3.00" 
                step="0.01"
                value={ripeningValue}
                onChange={(e) => setRipeningValue(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer mb-3"
              />

              {/* Dynamic Label Indicator */}
              <div className="flex justify-between items-center">
                <span className={`text-xs font-bold px-3 py-1 rounded-md border tracking-wide uppercase ${
                  ripeness === 'Unripe' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' :
                  ripeness === 'Ripened' ? 'bg-lime-500/10 text-lime-400 border-lime-500/20 shadow-[0_0_10px_rgba(132,204,22,0.1)]' :
                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                }`}>
                  {ripeness} Stage
                </span>
                
                {/* Quick-Set Presets for speed */}
                <div className="flex gap-2">
                  <button onClick={() => setRipeningValue(1.0)} className="text-[10px] font-bold text-gray-500 hover:text-amber-500 transition-colors">1.0x</button>
                  <button onClick={() => setRipeningValue(2.0)} className="text-[10px] font-bold text-gray-500 hover:text-lime-400 transition-colors">2.0x</button>
                  <button onClick={() => setRipeningValue(3.0)} className="text-[10px] font-bold text-gray-500 hover:text-emerald-400 transition-colors">3.0x (Max)</button>
                </div>
              </div>
            </div>

            {/* Color Variant */}
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 block">
                Color Variant
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['None', 'Silver', 'Gold'] as const).map((v) => {
                  const isActive = variant === v;
                  
                  // Dynamic colors based on the variant type
                  let activeColors = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
                  if (v === 'Silver') activeColors = 'bg-slate-300/20 border-slate-300 text-slate-200 shadow-[0_0_15px_rgba(203,213,225,0.15)]';
                  if (v === 'Gold') activeColors = 'bg-amber-400/20 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]';

                  return (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`py-3 rounded-lg text-sm font-bold border transition-all ${
                        isActive 
                          ? activeColors
                          : 'bg-[#161d19] border-[#232d27] text-gray-500 hover:bg-[#1a241f] hover:text-gray-300'
                      }`}
                    >
                      {v} {v === 'Silver' ? '×2' : v === 'Gold' ? '×5' : ''}
                    </button>
                  );
                })}
              </div>
            </div>

          {/* Active Mutations */}
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between items-end mb-3">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider block">
                  Active Mutations
                </label>
                <button 
                  onClick={() => setMutations([])}
                  className="text-xs text-gray-500 hover:text-emerald-400 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mutationsData.map((mut) => {
                  const isActive = mutations.some((m) => m.id === mut.id);
                  
                  // Define bespoke elemental colors for each mutation type
                  let activeStyles = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]';
                  if (mut.id === 'foggy') activeStyles = 'bg-slate-500/20 border-slate-400 text-slate-300 shadow-[0_0_10px_rgba(148,163,184,0.15)]';
                  if (mut.id === 'soaked') activeStyles = 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_10px_rgba(96,165,250,0.15)]';
                  if (mut.id === 'chilled') activeStyles = 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.15)]';
                  if (mut.id === 'flooded') activeStyles = 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.15)]';
                  if (mut.id === 'snowy') activeStyles = 'bg-slate-200/20 border-slate-300 text-slate-100 shadow-[0_0_10px_rgba(226,232,240,0.15)]';
                  if (mut.id === 'sandy') activeStyles = 'bg-amber-600/20 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)]';
                  if (mut.id === 'frostbit') activeStyles = 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.15)]';
                  if (mut.id === 'mossy') activeStyles = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]';
                  if (mut.id === 'shocked') activeStyles = 'bg-yellow-400/20 border-yellow-400 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.15)]';
                  if (mut.id === 'muddy') activeStyles = 'bg-orange-800/30 border-orange-600 text-orange-400 shadow-[0_0_10px_rgba(234,88,12,0.15)]';
                  if (mut.id === 'starstruck') activeStyles = 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(192,132,252,0.15)]';
                  if (mut.id === 'meteoric') activeStyles = 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.15)]';

                  return (
                    <button
                      key={mut.id}
                      onClick={() => toggleMutation(mut)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 ${
                        isActive
                          ? activeStyles
                          : 'bg-[#161d19] border-[#232d27] text-gray-500 hover:bg-[#1a241f] hover:text-gray-300'
                      }`}
                    >
                      {/* Notice we removed the hardcoded emerald text so the icon inherits the parent's color! */}
                      <mut.icon 
                        className={`w-6 h-6 mb-1 transition-all ${
                          isActive ? 'drop-shadow-md' : 'text-gray-600'
                        }`} 
                        strokeWidth={isActive ? 2.5 : 1.5}
                      />
                      <span>{mut.name}</span>
                      <span className={`text-[10px] ${isActive ? 'opacity-80' : 'text-gray-600'}`}>
                        {mut.multiplier}x
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Result & Cart */}
          <div className="space-y-6 lg:sticky lg:top-8 h-fit">
            
            {/* The Single Plant Calculator Box */}
            <div className="relative bg-[#0d1410] p-6 rounded-2xl border border-[#1a2b20] shadow-[0_0_30px_rgba(16,185,129,0.05)] flex flex-col items-center justify-center text-center overflow-hidden">
              
              {/* Profitability Tier Badge */}
              <div 
                className={`absolute top-4 right-4 w-10 h-10 flex flex-col items-center justify-center rounded-xl border-2 font-black transition-all duration-300 ${tierStyles}`}
                title="Profitability Tier based on ROI"
              >
                <span className="text-xl leading-none">{tier}</span>
              </div>

              <h2 className="text-sm font-semibold text-emerald-500/80 uppercase tracking-widest mb-4 mt-2">
                Estimated Sell Value
              </h2>
            <div className="text-7xl font-black text-emerald-400 mb-6 tabular-nums">
              {totalEstimatedValue} <span className="text-4xl text-emerald-600/50">$</span>
            </div>
            
            {/* Breakdown */}
            <div className="w-full bg-[#161d19]/80 rounded-xl p-4 border border-[#232d27]/70 text-sm text-gray-400 backdrop-blur-sm">
              <div className="flex justify-between py-1">
                <span>Plant</span>
                <span className="font-medium text-gray-200">{selectedPlant.name}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Ripeness</span>
                <span className="font-medium text-gray-200">
                  {ripeness} <span className="text-gray-500 text-xs font-bold">({ripeningValue.toFixed(2)}x)</span>
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Variant</span>
                <span className="font-medium text-gray-200">{variant}</span>
              </div>

              {/* ROI Tracker: Only shows for Multi-Harvest crops! */}
              {selectedPlant.harvestType === 'multi' && (
                <div className="mt-3 pt-3 border-t border-[#1a2b20]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-emerald-500/80 uppercase tracking-widest">Expected Harvests</span>
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{harvests}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="1"
                    value={harvests}
                    onChange={(e) => setHarvests(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1 px-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
              )}
              
              {/* Show the Farm Plot Size if they are doing a mass harvest */}
              {plotSize > 1 && (
                <div className="flex justify-between py-1 mt-3 border-t border-[#1a2b20] pt-3">
                  <span className="text-sm font-medium text-emerald-500/80 uppercase tracking-widest">Farm Plots</span>
                  <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{plotSize}x</span>
                </div>
              )}

              {/* Seed Cost & Profit Section */}
              <div className="mt-3 pt-3 border-t border-emerald-900/30">
                {/* Only show the seed cost line if it actually has a cost */}
                {selectedPlant.seedCost !== null && (
                  <div className="flex justify-between py-1 text-gray-400">
                    <span>Seed Cost {plotSize > 1 ? `(x${plotSize})` : ''}</span>
                    <span className="font-medium text-red-400/80">-{totalSeedCost} $</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-200">Net Profit</span>
                    
                    {/* Glowing ROI Badge */}
                    {roiPercentage !== null ? (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border tracking-wide transition-all ${
                        roiPercentage < 0 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : roiPercentage < 100 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : roiPercentage < 300
                              ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-[0_0_10px_rgba(45,212,191,0.2)]'
                              : 'bg-amber-400/20 text-amber-400 border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.4)] animate-pulse'
                      }`}>
                        {roiPercentage > 0 ? '+' : ''}{roiPercentage.toFixed(0)}% ROI
                      </span>
                    ) : (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full border bg-amber-400/20 text-amber-400 border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.4)] animate-pulse tracking-wide">
                        PURE PROFIT
                      </span>
                    )}
                  </div>
                  
                  <span className={`text-lg font-black ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {netProfit > 0 ? '+' : ''}{netProfit} $
                  </span>
                </div>
              </div>
            </div>

            {/* ADD TO HARVEST BUTTON */}
            <button
              onClick={addToCart}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-[0.98]"
            >
              + Add to Harvest
            </button>
          </div>

          {/* HARVEST HAUL CART (Only shows up if they have added items) */}
          {cart.length > 0 && (
            <div className="bg-[#161d19] p-6 rounded-2xl border border-[#232d27] shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-md font-bold text-white uppercase tracking-wider">Harvest Haul</h2>
                <button onClick={() => setCart([])} className="text-xs font-bold text-gray-500 hover:text-red-400 transition-colors">
                  Clear All
                </button>
              </div>

              {/* The scrollable list of items */}
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-[#0d1410] p-3 rounded-lg border border-[#1a2b20]">
                    <div className="flex items-center gap-3">
                      <img src={`/${item.plant.imageFile}`} alt={item.plant.name} className="w-8 h-8 object-contain drop-shadow-md" />
                      <div className="text-left">
                        <div className="text-sm font-bold text-gray-200 flex items-center gap-1">
                          {item.plant.name} 
                          <span className="text-xs text-gray-500 font-normal">({item.weight}kg)</span>
                          {item.harvests > 1 && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 rounded">x{item.harvests}</span>}
                        </div>
                        <div className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-wider mt-0.5">
                          {item.ripeness} • {item.variant} {item.mutations.length > 0 ? `• ${item.mutations.length} Mut` : ''}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-emerald-400">{item.estimatedValue} $</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-bold text-gray-600 hover:text-red-400 mt-1 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* The Grand Totals */}
              <div className="border-t border-[#232d27] pt-4 mt-2">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Value</span>
                  <span className="text-2xl font-black text-emerald-400">{totalCartValue} $</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Net Profit</span>
                  <span className={`text-md font-bold ${totalCartProfit >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
                    {totalCartProfit > 0 ? '+' : ''}{totalCartProfit} $
                  </span>
                </div>
              </div>
            </div>
          )}

          </div> {/* <-- This closes the new Right Column wrapper */}

        </main>
      </div>
    </div>
  );
}

export default App;