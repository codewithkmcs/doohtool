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
  { id: 'income_t20', name: 'T20 Income', category: 'Demographics', color: '#10b981' },
  { id: 'income_m40', name: 'M40 Income', category: 'Demographics', color: '#3b82f6' },
  { id: 'income_b40', name: 'B40 Income', category: 'Demographics', color: '#6366f1' },

  // Transport & Mobility
  { id: 'transport_lrt', name: 'LRT Commuters', category: 'Behavior', color: '#8b5cf6' },
  { id: 'transport_mrt', name: 'MRT Users', category: 'Behavior', color: '#a855f7' },
  { id: 'transport_grab', name: 'Grab/Foodpanda Users', category: 'Behavior', color: '#d946ef' },
  { id: 'transport_tng', name: 'Touch n Go Users', category: 'Behavior', color: '#ec4899' },

  // Shopping & Malls
  { id: 'mall_pavilion', name: 'Pavilion Shoppers', category: 'Behavior', color: '#f43f5e' },
  { id: 'mall_klcc', name: 'KLCC Visitors', category: 'Behavior', color: '#ef4444' },
  { id: 'mall_midvalley', name: 'Mid Valley Regulars', category: 'Behavior', color: '#f97316' },
  { id: 'mall_1utama', name: '1 Utama Shoppers', category: 'Behavior', color: '#f59e0b' },

  // Lifestyle & Interests
  { id: 'lifestyle_tech', name: 'Tech Enthusiasts', category: 'Interests', color: '#eab308' },
  { id: 'lifestyle_foodies', name: 'Foodies', category: 'Interests', color: '#84cc16' },
  { id: 'lifestyle_fitness', name: 'Fitness Buffs', category: 'Interests', color: '#22c55e' },
  { id: 'lifestyle_gamers', name: 'Gamers', category: 'Interests', color: '#10b981' },
  { id: 'lifestyle_students', name: 'Students', category: 'Demographics', color: '#14b8a6' },

  // Demographics
  { id: 'demo_young_prof', name: 'Young Professionals', category: 'Demographics', color: '#06b6d4' },
  { id: 'demo_parents', name: 'Parents', category: 'Demographics', color: '#0ea5e9' },
  { id: 'demo_retirees', name: 'Retirees', category: 'Demographics', color: '#3b82f6' },
  { id: 'demo_expats', name: 'Expats', category: 'Demographics', color: '#6366f1' },

  // Shopping Behavior
  { id: 'shopping_luxury', name: 'Luxury Shoppers', category: 'Interests', color: '#8b5cf6' },
  { id: 'shopping_budget', name: 'Budget Conscious', category: 'Interests', color: '#a855f7' },
  { id: 'shopping_health', name: 'Health Conscious', category: 'Interests', color: '#d946ef' },
  { id: 'shopping_eco', name: 'Eco-Friendly', category: 'Interests', color: '#ec4899' },

  // Location-Based
  { id: 'location_kl', name: 'KL City Center', category: 'Demographics', color: '#f43f5e' },
  { id: 'location_pj', name: 'Petaling Jaya', category: 'Demographics', color: '#ef4444' },
  { id: 'location_penang', name: 'Penang', category: 'Demographics', color: '#f97316' },
  { id: 'location_jb', name: 'Johor Bahru', category: 'Demographics', color: '#f59e0b' },
];

// Malaysia Points of Interest (POIs)
export const MALAYSIA_POIS = [
  // Malls
  { id: 'poi_pavilion', name: 'Pavilion KL', type: 'mall', lat: 3.149337, lng: 101.713997, icon: '🏬' },
  { id: 'poi_klcc', name: 'Suria KLCC', type: 'mall', lat: 3.157895, lng: 101.711945, icon: '🏬' },
  { id: 'poi_midvalley', name: 'Mid Valley Megamall', type: 'mall', lat: 3.117474, lng: 101.677849, icon: '🏬' },
  { id: 'poi_1utama', name: '1 Utama', type: 'mall', lat: 3.150009, lng: 101.614952, icon: '🏬' },

  // Banks
  { id: 'poi_maybank', name: 'Maybank Tower', type: 'bank', lat: 3.148611, lng: 101.698056, icon: '🏦' },
  { id: 'poi_cimb', name: 'CIMB Bank HQ', type: 'bank', lat: 3.147222, lng: 101.695833, icon: '🏦' },
  { id: 'poi_publicbank', name: 'Public Bank', type: 'bank', lat: 3.146944, lng: 101.697222, icon: '🏦' },

  // Transit Stations
  { id: 'poi_lrt_klcc', name: 'KLCC LRT Station', type: 'transit', lat: 3.153056, lng: 101.712778, icon: '🚇' },
  { id: 'poi_lrt_pasar', name: 'Pasar Seni LRT', type: 'transit', lat: 3.145833, lng: 101.694444, icon: '🚇' },
  { id: 'poi_mrt_bukit', name: 'Bukit Bintang MRT', type: 'transit', lat: 3.147778, lng: 101.710556, icon: '🚇' },

  // Petrol Stations
  { id: 'poi_petronas1', name: 'Petronas Station', type: 'petrol', lat: 3.145, lng: 101.705, icon: '⛽' },
  { id: 'poi_shell1', name: 'Shell Station', type: 'petrol', lat: 3.152, lng: 101.715, icon: '⛽' },
];

const KL_CENTER = { lat: 3.147271, lng: 101.699535 };

const generateBillboards = (count) => {
  const billboards = [];
  for (let i = 0; i < count; i++) {
    const isKL = Math.random() > 0.3; // 70% in KL
    const latBase = isKL ? KL_CENTER.lat : 5.4164; // KL or Penang
    const lngBase = isKL ? KL_CENTER.lng : 100.3327;

    const lat = latBase + (Math.random() - 0.5) * 0.1;
    const lng = lngBase + (Math.random() - 0.5) * 0.1;

    // Generate random audience indices
    const audienceIndex = {};
    AUDIENCE_SEGMENTS.forEach(seg => {
      // Skew some segments based on random chance
      if (Math.random() > 0.7) {
        audienceIndex[seg.id] = 100 + Math.floor(Math.random() * 100); // 100-200 index
      } else {
        audienceIndex[seg.id] = 50 + Math.floor(Math.random() * 50); // 50-100 index
      }
    });

    billboards.push({
      id: `billboard_${i + 1}`,
      name: `Billboard ${isKL ? 'KL' : 'Penang'} #${i + 1}`,
      lat,
      lng,
      type: Math.random() > 0.5 ? 'LED' : 'Static',
      audienceIndex,
      address: isKL ? 'Jalan Bukit Bintang, Kuala Lumpur' : 'Georgetown, Penang',
      dailyRate: 500 + Math.floor(Math.random() * 2000),
    });
  }
  return billboards;
};

export const MOCK_BILLBOARDS = generateBillboards(50);

// Generate PoP Logs for the last 15 days
export const generatePoPLogs = (inventoryIds, campaignId) => {
  const logs = [];
  const today = new Date();

  inventoryIds.forEach(invId => {
    // Determine if this inventory has "bad" performance (80% chance of being good)
    const isGoodInventory = Math.random() > 0.2;

    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // If good inventory, 95% success rate. If bad, 60% success rate.
      const successRate = isGoodInventory ? 0.95 : 0.6;
      const isSuccess = Math.random() < successRate;

      // Sometimes logs are just missing (no entry)
      if (Math.random() < 0.9) { // 90% chance log exists
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

// PoP Compliance Data Generation
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

// Sample PoP images (placeholder URLs)
export const POP_SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1562619425-c307bb8a09b4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1559814421-2a106f212265?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1622675363311-ac97f3598473?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
];

// Generate daily PoP status for each inventory in a campaign
export const generateDailyPoPStatus = (campaignId, inventoryId) => {
  const statusMap = {};
  const inventorySeed = (parseInt(campaignId.replace('cmp_', '')) * 1000 + inventoryId) % 100;

  // Determine reliability: 70% perfect, 25% good, 5% bad
  let reliabilityType = 'perfect';
  if (inventorySeed > 70) reliabilityType = 'good';
  if (inventorySeed > 95) reliabilityType = 'bad';

  // Adjust for specific campaigns
  if (campaignId === 'cmp_3') {
    if (inventorySeed > 50) reliabilityType = 'good';
    if (inventorySeed > 90) reliabilityType = 'bad';
  }

  POP_DATES.forEach((date, index) => {
    const daySeed = (parseInt(campaignId.replace('cmp_', '')) * 1000 + inventoryId * 100 + index) % 100;

    if (reliabilityType === 'perfect') {
      statusMap[date] = 'verified';
    } else if (reliabilityType === 'good') {
      statusMap[date] = daySeed > 20 ? 'verified' : 'failed';
    } else {
      statusMap[date] = daySeed > 80 ? 'verified' : 'failed';
    }

    // Recent days pending for active campaigns
    if (campaignId !== 'cmp_4' && index > 8) statusMap[date] = 'pending';
  });

  return statusMap;
};

export const CAMPAIGNS = [
  {
    id: 'cmp_1',
    name: 'Lunar New Year Blitz',
    brand: 'Grab Malaysia',
    status: 'Active',
    budget: 50000,
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    duration: '30 Days',
    impressions: 12500000,
    reach: 3800000,
    frequency: 3.2,
    cpm: 14.50,
    complianceScore: 98.5,
    inventoryIds: ['billboard_1', 'billboard_2', 'billboard_3', 'billboard_4', 'billboard_5', 'billboard_6', 'billboard_7', 'billboard_8'],
    audience: {
      gender: { male: 45, female: 55 },
      age: [
        { name: '18-24', value: 15 },
        { name: '25-34', value: 35 },
        { name: '35-44', value: 25 },
        { name: '45-54', value: 15 },
        { name: '55+', value: 10 },
      ],
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: `2026-06-${(i + 1).toString().padStart(2, '0')}`,
        impressions: 400000 + Math.random() * 100000,
        reach: 120000 + Math.random() * 30000,
        frequency: 3 + Math.random() * 0.5
      })),
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${i.toString().padStart(2, '0')}:00`,
        impressions: 20000 + Math.random() * 5000,
        reach: 8000 + Math.random() * 2000,
        frequency: 1.1 + Math.random() * 0.2
      })),
      hotspots: [
        { area: 'KL City Center', type: 'Work', weight: 45 },
        { area: 'Bangsar', type: 'Living', weight: 30 },
        { area: 'Mont Kiara', type: 'Living', weight: 25 },
        { area: 'Cyberjaya', type: 'Work', weight: 20 },
        { area: 'Bukit Bintang', type: 'Work', weight: 35 },
      ],
      segments: {
        actions: [
          { name: 'Commuters', value: 85, description: 'Daily transit users' },
          { name: 'Shoppers', value: 72, description: 'Frequent mall visitors' }
        ],
        interests: [
          { name: 'Tech Enthusiasts', value: 80, description: 'Gadget & software interest' },
          { name: 'Luxury Shoppers', value: 45, description: 'High-end brand affinity' }
        ],
        hobbies: [
          { name: 'Foodies', value: 92, description: 'Dining & cafe exploration' },
          { name: 'Fitness Buffs', value: 64, description: 'Gym & outdoor activity' }
        ],
        professional: [
          { name: 'Young Professionals', value: 95, description: 'Entry to mid-level white collar' },
          { name: 'Entrepreneurs', value: 42, description: 'Self-employed & founders' }
        ]
      }
    },
    delivery: {
      bidRequests: 5000000,
      bidResponses: 3500000,
      bidsWon: 1200000,
      fillRate: 70,
      winRate: 34,
      avgLatency: 120,
      avgBidPrice: 5.50,
      avgWinPrice: 3.20,
      bidFloor: 1.50,
      timeouts: 4500,
      errors: 1200,
      daily: Array.from({ length: 14 }, (_, i) => ({
        date: `2026-06-${(i + 1).toString().padStart(2, '0')}`,
        bidRequests: 300000 + Math.random() * 50000,
        bidResponses: 210000 + Math.random() * 40000,
        bidsWon: 85000 + Math.random() * 10000
      })),
      byExchange: [
        { name: 'Rubicon', winRate: 45, bidRequests: 2000000, wins: 900000, spend: 15000 },
        { name: 'OpenX', winRate: 30, bidRequests: 1500000, wins: 450000, spend: 12000 },
        { name: 'PubMatic', winRate: 25, bidRequests: 1500000, wins: 375000, spend: 8000 },
      ]
    },
    assets: [
      {
        id: 'billboard_1', name: 'KL Tower LED', location: 'Kuala Lumpur', impressions: 450000, reach: 150000, frequency: 3.0, cpm: 14.50, status: 'Active', thumbnail: 'https://images.unsplash.com/photo-1562619425-c307bb8a09b4?auto=format&fit=crop&q=80&w=100',
        daily: Array.from({ length: 30 }, (_, i) => ({ date: `2026-06-${(i + 1).toString().padStart(2, '0')}`, impressions: 15000 + Math.random() * 5000, reach: 5000 + Math.random() * 2000, frequency: 2.8 + Math.random() * 0.4 })),
        hourly: Array.from({ length: 24 }, (_, i) => ({ time: `${i.toString().padStart(2, '0')}:00`, impressions: 500 + Math.random() * 1000, reach: 200 + Math.random() * 400, frequency: 1.05 + Math.random() * 0.1 }))
      },
      {
        id: 'billboard_2', name: 'Pavilion Elite', location: 'Bukit Bintang', impressions: 380000, reach: 120000, frequency: 3.1, cpm: 18.20, status: 'Active', thumbnail: 'https://images.unsplash.com/photo-1559814421-2a106f212265?auto=format&fit=crop&q=80&w=100',
        daily: Array.from({ length: 30 }, (_, i) => ({ date: `2026-06-${(i + 1).toString().padStart(2, '0')}`, impressions: 12000 + Math.random() * 4000, reach: 4000 + Math.random() * 1500, frequency: 3.0 + Math.random() * 0.2 })),
        hourly: Array.from({ length: 24 }, (_, i) => ({ time: `${i.toString().padStart(2, '0')}:00`, impressions: 400 + Math.random() * 800, reach: 150 + Math.random() * 300, frequency: 1.1 + Math.random() * 0.1 }))
      },
      {
        id: 'billboard_3', name: 'Federal Highway', location: 'Petaling Jaya', impressions: 200000, reach: 80000, frequency: 2.5, cpm: 12.00, status: 'Paused', thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=100',
        daily: Array.from({ length: 30 }, (_, i) => ({ date: `2026-06-${(i + 1).toString().padStart(2, '0')}`, impressions: 8000 + Math.random() * 2000, reach: 2000 + Math.random() * 1000, frequency: 2.4 + Math.random() * 0.2 })),
        hourly: Array.from({ length: 24 }, (_, i) => ({ time: `${i.toString().padStart(2, '0')}:00`, impressions: 200 + Math.random() * 500, reach: 80 + Math.random() * 150, frequency: 1.0 + Math.random() * 0.1 }))
      },
    ]
  },
  {
    id: 'cmp_2',
    name: 'New Product Launch',
    status: 'Draft',
    budget: 120000,
    startDate: '2026-08-15',
    endDate: '2026-11-15',
    complianceScore: 0,
    inventoryIds: []
  },
  {
    id: 'cmp_3',
    name: 'Brand Awareness Q1',
    status: 'Completed',
    budget: 30000,
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    complianceScore: 72.4,
    inventoryIds: ['billboard_6', 'billboard_7', 'billboard_8', 'billboard_9', 'billboard_10', 'billboard_1']
  },
  {
    id: 'cmp_4',
    name: 'MTN 5G Launch',
    status: 'Completed',
    budget: 85000,
    startDate: '2024-09-01',
    endDate: '2024-10-31',
    complianceScore: 95.0,
    inventoryIds: ['billboard_1', 'billboard_3', 'billboard_5', 'billboard_8', 'billboard_10', 'billboard_2', 'billboard_4']
  }
];

export const INVENTORY = MOCK_BILLBOARDS.map(b => ({
  ...b,
  location: b.address.split(',')[0],
  city: b.address.includes('Kuala Lumpur') ? 'Kuala Lumpur' : 'George Town',
  dailyImpressions: 50000 + Math.floor(Math.random() * 200000),
  baseCPM: 10 + Math.random() * 20,
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

