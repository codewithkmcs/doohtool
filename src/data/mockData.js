export const PERSONAS = {
  AGENCY: 'Agency',
  MEDIA_OWNER: 'Media Owner'
};

export const USERS = [
  { id: 'user-1', name: 'Alia Bakar', persona: PERSONAS.AGENCY, company: 'Starlight Media' },
  { id: 'user-2', name: 'Zulkipli Ghani', persona: PERSONAS.MEDIA_OWNER, company: 'Elite Outdoors' }
];

export const INVENTORY = [
  {
    id: 'inv-1',
    name: 'KL Sentral Mega LED',
    city: 'Kuala Lumpur',
    location: 'KL Sentral Main Concourse',
    type: 'Digital',
    size: '12m x 15m',
    dailyImpressions: 120000,
    baseCPM: 15.00,
    image: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?auto=format&fit=crop&w=800&q=80', // Digital Billboard
    status: 'Active',
    ownerId: 'mo-1',
    utilisation: 88,
    campaignCount: 12,
    revenue: 144000,
    recommended: true,
    tags: ['Premium', 'Commuter Hub']
  },
  {
    id: 'inv-2',
    name: 'Bukit Bintang Pillar Wrap',
    city: 'Kuala Lumpur',
    location: 'Jalan Bukit Bintang Shopping Street',
    type: 'Static',
    size: '3m x 8m',
    dailyImpressions: 85000,
    baseCPM: 10.00,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80', // Billboard
    status: 'Active',
    ownerId: 'mo-1',
    utilisation: 65,
    campaignCount: 8,
    revenue: 92000,
    recommended: false,
    tags: ['Shopping', 'Young Audience']
  },
  {
    id: 'inv-3',
    name: 'Federal Highway Unipole',
    city: 'Petaling Jaya',
    location: 'Federal Highway KM 12.5 (Outbound)',
    type: 'Static',
    size: '18m x 6m',
    dailyImpressions: 250000,
    baseCPM: 12.50,
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80', // Highway Billboard
    status: 'Maintenance',
    ownerId: 'mo-1',
    utilisation: 42,
    campaignCount: 4,
    revenue: 55000,
    recommended: false,
    tags: ['High Traffic', 'Automotive']
  },
  {
    id: 'inv-4',
    name: 'The Exchange TRX - Grand Digital',
    city: 'Kuala Lumpur',
    location: 'TRX Main Entrance',
    type: 'Digital',
    size: '10m x 20m',
    dailyImpressions: 150000,
    baseCPM: 25.00,
    image: 'https://images.unsplash.com/photo-1519781542704-957ff19eff00?auto=format&fit=crop&w=800&q=80', // Times Square style digital
    status: 'Active',
    ownerId: 'mo-1',
    utilisation: 92,
    campaignCount: 15,
    revenue: 185000,
    recommended: true,
    tags: ['Luxury', 'Financial District']
  },
  {
    id: 'inv-5',
    name: 'Subang Parade Totem',
    city: 'Subang Jaya',
    location: 'Main Entry Walkway',
    type: 'Digital',
    size: '2m x 4m',
    dailyImpressions: 45000,
    baseCPM: 18.00,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', // Digital screen in mall
    status: 'Active',
    ownerId: 'mo-1',
    utilisation: 55,
    campaignCount: 6,
    revenue: 38000,
    recommended: false,
    tags: ['Neighborhood', 'Retail']
  },
  {
    id: 'inv-6',
    name: 'Penang Bridge Spectacular',
    city: 'Penang',
    location: 'Mainland Inbound Approach',
    type: 'Static',
    size: '20m x 8m',
    dailyImpressions: 180000,
    baseCPM: 14.00,
    image: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2abb?auto=format&fit=crop&w=800&q=80', // Scale outdoor billboard
    status: 'Active',
    ownerId: 'mo-2',
    utilisation: 78,
    campaignCount: 10,
    revenue: 110000,
    recommended: true,
    tags: ['Iconic', 'Inter-state']
  },
  {
    id: 'inv-7',
    name: 'Gurney Drive Digi-Wall',
    city: 'Penang',
    location: 'Plaza Gurney Frontage',
    type: 'Digital',
    size: '30m x 10m',
    dailyImpressions: 95000,
    baseCPM: 22.00,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', // Digital signage
    status: 'Active',
    ownerId: 'mo-2',
    utilisation: 70,
    campaignCount: 9,
    revenue: 88000,
    recommended: false,
    tags: ['Entertainment', 'Tourism']
  },
  {
    id: 'inv-8',
    name: 'Johor Causeway Billboard',
    city: 'Johor Bahru',
    location: 'CIQ Outbound Approach',
    type: 'Static',
    size: '15m x 5m',
    dailyImpressions: 300000,
    baseCPM: 11.00,
    image: 'https://images.unsplash.com/photo-1542319630-55fb7f7c944a?auto=format&fit=crop&w=800&q=80', // Large format billboard
    status: 'Active',
    ownerId: 'mo-3',
    utilisation: 85,
    campaignCount: 14,
    revenue: 125000,
    recommended: true,
    tags: ['Massive Volume', 'Logistic']
  },
  {
    id: 'inv-9',
    name: 'SkyAvenue Genting Digital',
    city: 'Genting Highlands',
    location: 'SkyAvenue Main Atrium',
    type: 'Digital',
    size: '8m x 15m',
    dailyImpressions: 75000,
    baseCPM: 35.00,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bbff8?auto=format&fit=crop&w=800&q=80', // Vibrant digital screen
    status: 'Active',
    ownerId: 'mo-1',
    utilisation: 100,
    campaignCount: 20,
    revenue: 210000,
    recommended: true,
    tags: ['Premium', 'Tourism']
  },
  {
    id: 'inv-10',
    name: 'Damansara Uptown LED',
    city: 'Petaling Jaya',
    location: 'Uptown 1 Frontage',
    type: 'Digital',
    size: '6m x 10m',
    dailyImpressions: 110000,
    baseCPM: 20.00,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80', // Billboard on building
    status: 'Active',
    ownerId: 'mo-1',
    utilisation: 82,
    campaignCount: 11,
    revenue: 132000,
    recommended: false,
    tags: ['PMEB', 'Suburban Hub']
  },
  {
    id: 'inv-11',
    name: 'Mid Valley Southkey Wall',
    city: 'Johor Bahru',
    location: 'North Entrance Facade',
    type: 'Static',
    size: '25m x 15m',
    dailyImpressions: 140000,
    baseCPM: 16.00,
    image: 'https://images.unsplash.com/photo-1582030024463-548caff2f183?auto=format&fit=crop&w=800&q=80', // Building wall billboard
    status: 'Active',
    ownerId: 'mo-3',
    utilisation: 60,
    campaignCount: 7,
    revenue: 75000,
    recommended: false,
    tags: ['Retail', 'Gateway']
  },
  {
    id: 'inv-12',
    name: 'Ipoh Town Hall Spectacular',
    city: 'Ipoh',
    location: 'Jalan Ibrahim Frontage',
    type: 'Static',
    size: '12m x 10m',
    dailyImpressions: 65000,
    baseCPM: 9.00,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', // Classic billboard on pole
    status: 'Active',
    ownerId: 'mo-4',
    utilisation: 45,
    campaignCount: 5,
    revenue: 32000,
    recommended: false,
    tags: ['Heritage', 'Mass Audience']
  }
];

export const CAMPAIGNS = [
  {
    id: 'camp-1',
    name: 'Lunar New Year Blitz',
    brand: 'Grab Malaysia',
    agency: 'Starlight Media',
    status: 'Live',
    startDate: '2026-01-15',
    endDate: '2026-02-15',
    type: 'Digital',
    budget: 45000,
    impressions: 1250000,
    reach: 850000,
    frequency: 1.47,
    duration: '31 Days',
    cpm: 12.80,
    delivery: {
      bidRequests: 4850000,
      bidResponses: 3880000,
      bidsWon: 1250000,
      fillRate: 80.0, // bidResponses / bidRequests
      winRate: 32.2,  // bidsWon / bidResponses
      avgBidPrice: 11.50,
      avgWinPrice: 12.80,
      bidFloor: 8.00,
      avgLatency: 42, // ms
      timeouts: 12500,
      errors: 3200,
      daily: [
        { date: 'Feb 01', bidRequests: 680000, bidResponses: 544000, bidsWon: 175000, winRate: 32.2 },
        { date: 'Feb 02', bidRequests: 620000, bidResponses: 496000, bidsWon: 160000, winRate: 32.3 },
        { date: 'Feb 03', bidRequests: 710000, bidResponses: 568000, bidsWon: 183000, winRate: 32.2 },
        { date: 'Feb 04', bidRequests: 740000, bidResponses: 592000, bidsWon: 191000, winRate: 32.3 },
        { date: 'Feb 05', bidRequests: 780000, bidResponses: 624000, bidsWon: 201000, winRate: 32.2 },
        { date: 'Feb 06', bidRequests: 820000, bidResponses: 656000, bidsWon: 212000, winRate: 32.3 },
        { date: 'Feb 07', bidRequests: 500000, bidResponses: 400000, bidsWon: 128000, winRate: 32.0 }
      ],
      byExchange: [
        { name: 'Vistar Media', bidRequests: 1850000, wins: 520000, winRate: 28.1, spend: 6760 },
        { name: 'Place Exchange', bidRequests: 1200000, wins: 380000, winRate: 31.7, spend: 4940 },
        { name: 'Broadsign Reach', bidRequests: 950000, wins: 210000, winRate: 22.1, spend: 2730 },
        { name: 'Hivestack', bidRequests: 850000, wins: 140000, winRate: 16.5, spend: 1820 }
      ]
    },
    assets: [
      {
        id: 'inv-1', name: 'KL Sentral Mega LED', impressions: 450000, reach: 310000, frequency: 1.45, cpm: 15.00,
        daily: [
          { date: 'Feb 01', impressions: 15000, reach: 10500, frequency: 1.43 },
          { date: 'Feb 02', impressions: 14200, reach: 9800, frequency: 1.45 },
          { date: 'Feb 03', impressions: 16100, reach: 11200, frequency: 1.44 },
          { date: 'Feb 04', impressions: 15800, reach: 10900, frequency: 1.45 },
          { date: 'Feb 05', impressions: 17200, reach: 11800, frequency: 1.46 },
          { date: 'Feb 06', impressions: 18100, reach: 12500, frequency: 1.45 },
          { date: 'Feb 07', impressions: 14500, reach: 10000, frequency: 1.45 }
        ],
        hourly: [
          { time: '06:00', impressions: 5200, reach: 3600, frequency: 1.44 },
          { time: '08:00', impressions: 32000, reach: 22000, frequency: 1.45 },
          { time: '10:00', impressions: 21000, reach: 14500, frequency: 1.45 },
          { time: '12:00', impressions: 24000, reach: 16500, frequency: 1.45 },
          { time: '14:00', impressions: 22500, reach: 15500, frequency: 1.45 },
          { time: '16:00', impressions: 18500, reach: 12700, frequency: 1.46 },
          { time: '18:00', impressions: 35000, reach: 24000, frequency: 1.46 },
          { time: '20:00', impressions: 28000, reach: 19300, frequency: 1.45 }
        ]
      },
      {
        id: 'inv-4', name: 'The Exchange TRX - Grand Digital', impressions: 520000, reach: 380000, frequency: 1.37, cpm: 25.00,
        daily: [
          { date: 'Feb 01', impressions: 17500, reach: 12800, frequency: 1.37 },
          { date: 'Feb 02', impressions: 16800, reach: 12300, frequency: 1.37 },
          { date: 'Feb 03', impressions: 18200, reach: 13300, frequency: 1.37 },
          { date: 'Feb 04', impressions: 19100, reach: 13900, frequency: 1.37 },
          { date: 'Feb 05', impressions: 20200, reach: 14700, frequency: 1.37 },
          { date: 'Feb 06', impressions: 21500, reach: 15700, frequency: 1.37 },
          { date: 'Feb 07', impressions: 17200, reach: 12500, frequency: 1.38 }
        ],
        hourly: [
          { time: '06:00', impressions: 4800, reach: 3500, frequency: 1.37 },
          { time: '08:00', impressions: 38000, reach: 27700, frequency: 1.37 },
          { time: '10:00', impressions: 26000, reach: 19000, frequency: 1.37 },
          { time: '12:00', impressions: 29000, reach: 21200, frequency: 1.37 },
          { time: '14:00', impressions: 27500, reach: 20100, frequency: 1.37 },
          { time: '16:00', impressions: 22000, reach: 16100, frequency: 1.37 },
          { time: '18:00', impressions: 42000, reach: 30700, frequency: 1.37 },
          { time: '20:00', impressions: 35000, reach: 25500, frequency: 1.37 }
        ]
      },
      {
        id: 'inv-9', name: 'SkyAvenue Genting Digital', impressions: 280000, reach: 160000, frequency: 1.75, cpm: 35.00,
        daily: [
          { date: 'Feb 01', impressions: 9300, reach: 5300, frequency: 1.75 },
          { date: 'Feb 02', impressions: 8800, reach: 5000, frequency: 1.76 },
          { date: 'Feb 03', impressions: 10200, reach: 5800, frequency: 1.76 },
          { date: 'Feb 04', impressions: 11500, reach: 6600, frequency: 1.74 },
          { date: 'Feb 05', impressions: 12800, reach: 7300, frequency: 1.75 },
          { date: 'Feb 06', impressions: 14200, reach: 8100, frequency: 1.75 },
          { date: 'Feb 07', impressions: 9800, reach: 5600, frequency: 1.75 }
        ],
        hourly: [
          { time: '10:00', impressions: 12000, reach: 6900, frequency: 1.74 },
          { time: '12:00', impressions: 18000, reach: 10300, frequency: 1.75 },
          { time: '14:00', impressions: 22000, reach: 12600, frequency: 1.75 },
          { time: '16:00', impressions: 25000, reach: 14300, frequency: 1.75 },
          { time: '18:00', impressions: 28000, reach: 16000, frequency: 1.75 },
          { time: '20:00', impressions: 32000, reach: 18300, frequency: 1.75 },
          { time: '22:00', impressions: 24000, reach: 13700, frequency: 1.75 }
        ]
      }
    ],
    audience: {
      gender: { male: 54, female: 46 },
      segments: {
        actions: [
          { name: 'Active Shoppers', value: 85, description: 'Frequent mall visitors' },
          { name: 'Daily Commuters', value: 72, description: 'Public transit users' },
          { name: 'Weekend Travelers', value: 58, description: 'Domestic travel enthusiasts' },
          { name: 'Online Browsers', value: 65, description: 'E-commerce explorers' }
        ],
        interests: [
          { name: 'Tech & Gadgets', value: 68, description: 'Early adopters' },
          { name: 'Fashion & Beauty', value: 55, description: 'Style-conscious consumers' },
          { name: 'Food & Dining', value: 78, description: 'Culinary explorers' },
          { name: 'Entertainment', value: 62, description: 'Movies, music & events' }
        ],
        hobbies: [
          { name: 'Fitness & Sports', value: 48, description: 'Active lifestyle' },
          { name: 'Gaming', value: 42, description: 'Casual & hardcore gamers' },
          { name: 'Travel & Adventure', value: 56, description: 'Experience seekers' },
          { name: 'Photography', value: 35, description: 'Visual storytellers' }
        ],
        professional: [
          { name: 'Corporate Executives', value: 38, description: 'C-suite & senior management' },
          { name: 'SME Owners', value: 45, description: 'Business decision-makers' },
          { name: 'Young Professionals', value: 72, description: 'Career-driven millennials' },
          { name: 'Freelancers & Creatives', value: 52, description: 'Independent workers' }
        ]
      },
      hotspots: [
        { area: 'KLCC / Bukit Bintang', type: 'Work', weight: 85 },
        { area: 'Bangsar / Mid Valley', type: 'Work', weight: 65 },
        { area: 'Petaling Jaya', type: 'Living', weight: 78 },
        { area: 'Cheras', type: 'Living', weight: 62 },
        { area: 'Subang Jaya', type: 'Living', weight: 55 }
      ],
      hourly: [
        { time: '00:00', impressions: 5000, reach: 3400, frequency: 1.47 },
        { time: '02:00', impressions: 1200, reach: 820, frequency: 1.46 },
        { time: '04:00', impressions: 800, reach: 550, frequency: 1.45 },
        { time: '06:00', impressions: 15000, reach: 10200, frequency: 1.47 },
        { time: '08:00', impressions: 95000, reach: 64600, frequency: 1.47 },
        { time: '10:00', impressions: 65000, reach: 44200, frequency: 1.47 },
        { time: '12:00', impressions: 72000, reach: 49000, frequency: 1.47 },
        { time: '14:00', impressions: 68000, reach: 46300, frequency: 1.47 },
        { time: '16:00', impressions: 55000, reach: 37400, frequency: 1.47 },
        { time: '18:00', impressions: 105000, reach: 71400, frequency: 1.47 },
        { time: '20:00', impressions: 88000, reach: 59900, frequency: 1.47 },
        { time: '22:00', impressions: 52000, reach: 35400, frequency: 1.47 }
      ],
      daily: [
        { date: 'Feb 01', impressions: 42000, reach: 28600, frequency: 1.47 },
        { date: 'Feb 02', impressions: 38500, reach: 26200, frequency: 1.47 },
        { date: 'Feb 03', impressions: 45000, reach: 30600, frequency: 1.47 },
        { date: 'Feb 04', impressions: 48000, reach: 32700, frequency: 1.47 },
        { date: 'Feb 05', impressions: 52000, reach: 35400, frequency: 1.47 },
        { date: 'Feb 06', impressions: 55000, reach: 37400, frequency: 1.47 },
        { date: 'Feb 07', impressions: 41000, reach: 27900, frequency: 1.47 }
      ]
    }
  },
  {
    id: 'camp-2',
    name: 'Sustainable Living Drive',
    brand: 'IKEA Malaysia',
    agency: 'Creative Hub',
    status: 'Booked',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    type: 'Static',
    duration: '31 Days',
    budget: 32000
  },
  {
    id: 'camp-3',
    name: 'Eco-Travel Awareness',
    brand: 'Tourism Malaysia',
    agency: 'Starlight Media',
    status: 'Completed',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    type: 'Static',
    duration: '31 Days',
    budget: 28000
  },
  {
    id: 'camp-4',
    name: 'Ramadan 2026 Launch',
    brand: 'Nestle Malaysia',
    agency: 'OmniAds',
    status: 'Approved',
    startDate: '2026-02-28',
    endDate: '2026-04-05',
    type: 'Digital',
    duration: '36 Days',
    budget: 120000
  }
];

export const BOOKED_CAMPAIGN_TRENDS = [
  { month: 'Sep', traditional: 45, programmatic: 12 },
  { month: 'Oct', traditional: 52, programmatic: 18 },
  { month: 'Nov', traditional: 48, programmatic: 25 },
  { month: 'Dec', traditional: 65, programmatic: 35 },
  { month: 'Jan', traditional: 58, programmatic: 42 },
  { month: 'Feb', traditional: 42, programmatic: 38 }
];

export const AVAILABILITY_DATA = {
  'inv-1': {
    blocked: ['2026-02-07', '2026-02-08', '2026-02-09', '2026-02-15', '2026-02-16', '2026-02-28'],
    hourly: [
      { hour: '08:00', slots: 6, blocked: 6 },
      { hour: '09:00', slots: 6, blocked: 6 },
      { hour: '10:00', slots: 6, blocked: 4 },
      { hour: '11:00', slots: 6, blocked: 3 },
      { hour: '12:00', slots: 6, blocked: 5 },
      { hour: '13:00', slots: 6, blocked: 2 },
      { hour: '18:00', slots: 6, blocked: 6 },
      { hour: '19:00', slots: 6, blocked: 6 }
    ]
  },
  'inv-4': {
    blocked: ['2026-02-10', '2026-02-11', '2026-02-12', '2026-02-13', '2026-02-14'],
    hourly: [
      { hour: '08:00', slots: 10, blocked: 10 },
      { hour: '12:00', slots: 10, blocked: 8 },
      { hour: '18:00', slots: 10, blocked: 10 }
    ]
  }
};
