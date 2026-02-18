/**
 * @typedef {Object} AudienceSegment
 * @property {string} id
 * @property {string} name
 * @property {'Demographics' | 'Interests' | 'Behavior'} category
 * @property {string} color - Hex color for UI
 */

/**
 * @typedef {Object} Billboard
 * @property {string} id
 * @property {string} name
 * @property {number} lat
 * @property {number} lng
 * @property {'LED' | 'Static'} type
 * @property {Record<string, number>} audienceIndex - Map of segment ID to index score (base 100)
 * @property {string} address
 * @property {number} dailyRate
 */

/**
 * @typedef {Object} PoPLog
 * @property {string} id
 * @property {string} inventoryId
 * @property {string} campaignId
 * @property {string} timestamp
 * @property {'Success' | 'Fail'} status
 * @property {string} [imageUrl]
 */

export const AUDIENCE_SEGMENTS = [
  // Income Tiers
  { id: 'income_high', name: 'High Income', category: 'Demographics', color: '#10b981' },
  { id: 'income_mid', name: 'Middle Income', category: 'Demographics', color: '#3b82f6' },
  { id: 'income_mass', name: 'Mass Market', category: 'Demographics', color: '#6366f1' },

  // Transport & Mobility
  { id: 'transport_brt', name: 'BRT Commuters', category: 'Behavior', color: '#8b5cf6' },
  { id: 'transport_danfo', name: 'Danfo Users', category: 'Behavior', color: '#a855f7' },
  { id: 'transport_ridehail', name: 'Uber/Bolt Users', category: 'Behavior', color: '#d946ef' },

  // Shopping & Malls
  { id: 'mall_palms', name: 'The Palms Shoppers', category: 'Behavior', color: '#f43f5e' },
  { id: 'mall_ikejacity', name: 'Ikeja City Mall', category: 'Behavior', color: '#ef4444' },
  { id: 'mall_landmark', name: 'Landmark Centre', category: 'Behavior', color: '#f97316' },

  // Lifestyle & Interests
  { id: 'lifestyle_tech', name: 'Tech Enthusiasts', category: 'Interests', color: '#eab308' },
  { id: 'lifestyle_foodies', name: 'Foodies', category: 'Interests', color: '#84cc16' },
  { id: 'lifestyle_fitness', name: 'Fitness Buffs', category: 'Interests', color: '#22c55e' },

  // Demographics
  { id: 'demo_young_prof', name: 'Young Professionals', category: 'Demographics', color: '#06b6d4' },
  { id: 'demo_students', name: 'University Students', category: 'Demographics', color: '#0ea5e9' },
  { id: 'demo_expats', name: 'Expats', category: 'Demographics', color: '#3b82f6' },

  // Location-Based
  { id: 'location_vi', name: 'Victoria Island', category: 'Demographics', color: '#f43f5e' },
  { id: 'location_lekki', name: 'Lekki Phase 1', category: 'Demographics', color: '#ef4444' },
  { id: 'location_ikeja', name: 'Ikeja Mainland', category: 'Demographics', color: '#f97316' },
  { id: 'location_abuja', name: 'Abuja CBD', category: 'Demographics', color: '#f59e0b' },
];

// Nigeria Points of Interest (POIs) - Primarily Lagos
// Variable name kept as MALAYSIA_POIS so we don't break your InventoryMap component
export const MALAYSIA_POIS = [
  // Malls
  { id: 'poi_palms', name: 'The Palms Mall VI', type: 'mall', lat: 6.435, lng: 3.441, icon: '🏬' },
  { id: 'poi_icm', name: 'Ikeja City Mall', type: 'mall', lat: 6.613, lng: 3.358, icon: '🏬' },
  { id: 'poi_landmark', name: 'Landmark Centre', type: 'mall', lat: 6.425, lng: 3.446, icon: '🏬' },

  // Hubs
  { id: 'poi_gtexchange', name: 'GTBank HQ', type: 'bank', lat: 6.430, lng: 3.433, icon: '🏦' },
  { id: 'poi_zenith', name: 'Zenith Bank HQ', type: 'bank', lat: 6.431, lng: 3.431, icon: '🏦' },

  // Transit
  { id: 'poi_oshodi', name: 'Oshodi Transport Interchange', type: 'transit', lat: 6.556, lng: 3.344, icon: '🚌' },
  { id: 'poi_lekki_toll', name: 'Lekki Toll Gate', type: 'transit', lat: 6.438, lng: 3.456, icon: '🚗' },
];

// Focus map on Lagos
const LAGOS_CENTER = { lat: 6.465422, lng: 3.406448 };

const generateBillboards = (count) => {
  const billboards = [];
  for (let i = 0; i < count; i++) {
    const isLagos = Math.random() > 0.2; // 80% in Lagos
    const latBase = isLagos ? LAGOS_CENTER.lat : 9.0765; // Lagos or Abuja
    const lngBase = isLagos ? LAGOS_CENTER.lng : 7.3986;

    const lat = latBase + (Math.random() - 0.5) * 0.15;
    const lng = lngBase + (Math.random() - 0.5) * 0.15;

    const audienceIndex = {};
    AUDIENCE_SEGMENTS.forEach(seg => {
      audienceIndex[seg.id] = 50 + Math.floor(Math.random() * 100);
    });

    billboards.push({
      id: `billboard_${i + 1}`,
      name: `LED ${isLagos ? 'Lagos' : 'Abuja'} #${i + 1}`,
      lat,
      lng,
      type: Math.random() > 0.4 ? 'LED' : 'Static',
      audienceIndex,
      address: isLagos ? 'Victoria Island, Lagos' : 'Maitama, Abuja',
      dailyRate: 150000 + Math.floor(Math.random() * 500000), // Naira
      ownerId: i % 2 === 0 ? 'mo-1' : 'mo-2', // Assign ownership
      campaignCount: Math.floor(Math.random() * 4),
      revenue: 2500000 + Math.floor(Math.random() * 5000000)
    });
  }
  return billboards;
};

export const MOCK_BILLBOARDS = generateBillboards(50);

// Generate PoP Logs
export const generatePoPLogs = (inventoryIds, campaignId) => {
  const logs = [];
  const today = new Date();

  inventoryIds.forEach(invId => {
    const isGoodInventory = Math.random() > 0.2;
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const successRate = isGoodInventory ? 0.95 : 0.6;
      const isSuccess = Math.random() < successRate;

      if (Math.random() < 0.9) {
        logs.push({
          id: `log_${invId}_${dateStr}`,
          inventoryId: invId,
          campaignId,
          timestamp: date.toISOString(),
          status: isSuccess ? 'Success' : 'Fail',
          imageUrl: isSuccess ? 'https://placehold.co/600x400?text=PoP+Evidence' : undefined,
        });
      }
    }
  });
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const MOCK_CAMPAIGN_ID = 'cmp_12345';
export const MOCK_POP_LOGS = generatePoPLogs(MOCK_BILLBOARDS.slice(0, 10).map(b => b.id), MOCK_CAMPAIGN_ID);

const getDates = (days = 14) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates.reverse();
};

export const POP_DATES = getDates(10);

export const generateDailyPoPStatus = (campaignId, inventoryId) => {
  const statusMap = {};
  const inventorySeed = (parseInt(campaignId.replace('cmp_', '')) * 1000 + inventoryId) % 100;
  let reliabilityType = 'perfect';
  if (inventorySeed > 70) reliabilityType = 'good';
  if (inventorySeed > 95) reliabilityType = 'bad';

  POP_DATES.forEach((date, index) => {
    const daySeed = (parseInt(campaignId.replace('cmp_', '')) * 1000 + inventoryId * 100 + index) % 100;
    if (reliabilityType === 'perfect') {
      statusMap[date] = 'verified';
    } else if (reliabilityType === 'good') {
      statusMap[date] = daySeed > 20 ? 'verified' : 'failed';
    } else {
      statusMap[date] = daySeed > 80 ? 'verified' : 'failed';
    }
    if (campaignId !== 'cmp_4' && index > 8) statusMap[date] = 'pending';
  });
  return statusMap;
};

// --- NIGERIAN CAMPAIGNS ---
export const CAMPAIGNS = [
  {
    id: 'cmp_1',
    name: 'MTN 5G Nationwide Rollout',
    brand: 'MTN Nigeria',
    status: 'Active',
    budget: 15000000,
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    duration: '30 Days',
    impressions: 12500000,
    reach: 3800000,
    frequency: 3.2,
    cpm: 4850,
    complianceScore: 98.5,
    inventoryIds: ['billboard_1', 'billboard_2', 'billboard_3', 'billboard_4', 'billboard_5'],
    audience: {
      gender: { male: 55, female: 45 },
      age: [{ name: '18-24', value: 25 }, { name: '25-34', value: 45 }, { name: '35-44', value: 20 }, { name: '45+', value: 10 }],
      daily: Array.from({ length: 30 }, (_, i) => ({ date: `2026-06-${(i + 1).toString().padStart(2, '0')}`, impressions: 400000 + Math.random() * 100000, reach: 120000 + Math.random() * 30000, frequency: 3 + Math.random() * 0.5 })),
      hourly: Array.from({ length: 24 }, (_, i) => ({ time: `${i.toString().padStart(2, '0')}:00`, impressions: 20000 + Math.random() * 5000, reach: 8000 + Math.random() * 2000, frequency: 1.1 + Math.random() * 0.2 })),
      hotspots: [{ area: 'Victoria Island', type: 'Work', weight: 45 }, { area: 'Lekki', type: 'Living', weight: 30 }, { area: 'Ikeja', type: 'Work', weight: 25 }],
      segments: {
        actions: [{ name: 'Commuters', value: 85, description: 'Daily transit users' }],
        interests: [{ name: 'Tech Enthusiasts', value: 80, description: 'Gadget & software interest' }],
        hobbies: [{ name: 'Foodies', value: 92, description: 'Dining exploration' }],
        professional: [{ name: 'Young Professionals', value: 95, description: 'Mid-level white collar' }]
      }
    },
    delivery: {
      bidRequests: 5000000, bidResponses: 3500000, bidsWon: 1200000, fillRate: 70, winRate: 34, avgLatency: 120, avgBidPrice: 5500, avgWinPrice: 4850, bidFloor: 3000, timeouts: 4500, errors: 1200,
      daily: Array.from({ length: 14 }, (_, i) => ({ date: `2026-06-${(i + 1).toString().padStart(2, '0')}`, bidRequests: 300000 + Math.random() * 50000, bidResponses: 210000 + Math.random() * 40000, bidsWon: 85000 + Math.random() * 10000 })),
      byExchange: [{ name: 'Hivestack', winRate: 45, bidRequests: 2000000, wins: 900000, spend: 4500000 }, { name: 'Broadsign', winRate: 30, bidRequests: 1500000, wins: 450000, spend: 3200000 }]
    },
    assets: [
      { id: 'billboard_1', name: 'Ozumba Mbadiwe LED', location: 'Victoria Island', impressions: 450000, reach: 150000, frequency: 3.0, cpm: 5500, status: 'Active', thumbnail: 'https://images.unsplash.com/photo-1562619425-c307bb8a09b4?auto=format&fit=crop&q=80&w=100' },
      { id: 'billboard_2', name: 'Admiralty Way Digital', location: 'Lekki Phase 1', impressions: 380000, reach: 120000, frequency: 3.1, cpm: 5200, status: 'Active', thumbnail: 'https://images.unsplash.com/photo-1559814421-2a106f212265?auto=format&fit=crop&q=80&w=100' },
    ]
  },
  {
    id: 'cmp_2',
    name: 'Guinness Detty December',
    brand: 'Guinness',
    status: 'Draft',
    budget: 8500000,
    startDate: '2026-12-01',
    endDate: '2026-12-31',
    complianceScore: 0,
    inventoryIds: []
  },
  {
    id: 'cmp_3',
    name: 'Opay Market Domination',
    brand: 'Opay',
    status: 'Booked',
    budget: 12000000,
    startDate: '2026-03-01',
    endDate: '2026-04-30',
    complianceScore: 0,
    inventoryIds: ['billboard_6', 'billboard_7', 'billboard_8', 'billboard_9']
  },
  {
    id: 'cmp_4',
    name: 'Access Bank Retail Push',
    brand: 'Access Bank',
    status: 'Completed',
    budget: 9000000,
    startDate: '2025-10-01',
    endDate: '2025-11-30',
    complianceScore: 99.0,
    inventoryIds: ['billboard_1', 'billboard_3', 'billboard_5', 'billboard_8']
  }
];

export const INVENTORY = MOCK_BILLBOARDS.map(b => ({
  ...b,
  location: b.address.split(',')[0],
  city: b.address.includes('Lagos') ? 'Lagos' : 'Abuja',
  dailyImpressions: 50000 + Math.floor(Math.random() * 200000),
  baseCPM: 3000 + Math.random() * 2000,
  utilisation: 60 + Math.floor(Math.random() * 35),
  status: 'Active',
  image: b.id === 'billboard_1' ? 'https://images.unsplash.com/photo-1562619425-c307bb8a09b4?auto=format&fit=crop&q=80&w=600' :
    b.id === 'billboard_2' ? 'https://images.unsplash.com/photo-1559814421-2a106f212265?auto=format&fit=crop&q=80&w=600' :
      b.id === 'billboard_3' ? 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=600' :
        b.id === 'billboard_4' ? 'https://images.unsplash.com/photo-1622675363311-ac97f3598473?auto=format&fit=crop&q=80&w=600' :
          'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600'
}));

export const BOOKED_CAMPAIGN_TRENDS = [
  { month: 'Jan', traditional: 4000, programmatic: 2400 },
  { month: 'Feb', traditional: 3000, programmatic: 1398 },
  { month: 'Mar', traditional: 2000, programmatic: 9800 },
  { month: 'Apr', traditional: 2780, programmatic: 3908 },
  { month: 'May', traditional: 1890, programmatic: 4800 },
  { month: 'Jun', traditional: 2390, programmatic: 3800 },
];

export const POP_SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1562619425-c307bb8a09b4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1559814421-2a106f212265?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1622675363311-ac97f3598473?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
];

export const AVAILABILITY_DATA = {};
INVENTORY.forEach(inv => {
  AVAILABILITY_DATA[inv.id] = {
    blocked: ['2026-02-14', '2026-02-15', '2026-02-28'],
    hourly: [
      { hour: '08:00', slots: 6, blocked: Math.floor(Math.random() * 6) },
      { hour: '12:00', slots: 6, blocked: Math.floor(Math.random() * 6) },
      { hour: '18:00', slots: 6, blocked: Math.floor(Math.random() * 6) }
    ]
  };
});