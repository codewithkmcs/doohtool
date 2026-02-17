export interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  billboardIds: number[];
  budget: number;
  revenue: number;
}

export const campaignsData: Campaign[] = [
  // Active Campaigns
  {
    id: 1,
    name: "MTN Nigeria 5G Launch",
    startDate: "2025-11-20",
    endDate: "2025-12-20",
    status: "Active",
    billboardIds: [100, 101, 102, 106, 117, 118, 122], // Lagos + Abuja MOTOMEDIA & NEW CRYSTAL
    budget: 45000,
    revenue: 42000
  },
  {
    id: 2,
    name: "Coca-Cola Holiday Campaign",
    startDate: "2025-11-15",
    endDate: "2025-12-31",
    status: "Active",
    billboardIds: [1, 2, 11, 12, 103, 104, 126, 127], // Ghana + Lagos + Ibadan
    budget: 52000,
    revenue: 48000
  },
  {
    id: 3,
    name: "Dangote Cement Brand Awareness",
    startDate: "2025-11-01",
    endDate: "2026-01-31",
    status: "Active",
    billboardIds: [108, 109, 110, 114, 115, 116], // Lagos Spectacular Wall Drapes
    budget: 38000,
    revenue: 36000
  },
  {
    id: 4,
    name: "Access Bank Digital Banking",
    startDate: "2025-11-25",
    endDate: "2025-12-25",
    status: "Active",
    billboardIds: [3, 4, 5, 119, 120, 121, 134, 148, 149], // Ghana + Abuja + Kaduna + Enugu
    budget: 55000,
    revenue: 50000
  },
  {
    id: 5,
    name: "Guinness Nigeria Promo",
    startDate: "2025-11-10",
    endDate: "2025-12-10",
    status: "Active",
    billboardIds: [105, 107, 143, 144, 150, 151, 152], // Lagos + Onitsha + Port Harcourt
    budget: 42000,
    revenue: 39000
  },

  // Planned Campaigns
  {
    id: 6,
    name: "Shoprite New Year Sale",
    startDate: "2025-12-26",
    endDate: "2026-01-15",
    status: "Planned",
    billboardIds: [6, 7, 8, 13, 14, 15, 123, 124, 125], // Ghana Digital + Abuja
    budget: 48000,
    revenue: 0
  },
  {
    id: 7,
    name: "GTBank Valentine Campaign",
    startDate: "2026-01-20",
    endDate: "2026-02-20",
    status: "Planned",
    billboardIds: [100, 101, 117, 118, 132, 133], // Lagos + Abuja + Kano
    budget: 35000,
    revenue: 0
  },
  {
    id: 8,
    name: "Indomie Noodles Nationwide",
    startDate: "2026-02-01",
    endDate: "2026-03-31",
    status: "Planned",
    billboardIds: [126, 127, 128, 129, 130, 131, 154, 155, 156], // Ibadan + Benin + Aba
    budget: 58000,
    revenue: 0
  },

  // Completed Campaigns
  {
    id: 9,
    name: "Glo Mobile Independence Day",
    startDate: "2025-09-15",
    endDate: "2025-10-15",
    status: "Completed",
    billboardIds: [100, 102, 103, 117, 119, 120], // Lagos + Abuja
    budget: 32000,
    revenue: 32000
  },
  {
    id: 10,
    name: "Peak Milk Back to School",
    startDate: "2025-08-01",
    endDate: "2025-09-30",
    status: "Completed",
    billboardIds: [1, 2, 3, 126, 127, 128, 143, 150], // Ghana + Ibadan + Onitsha + PH
    budget: 44000,
    revenue: 44000
  },
  {
    id: 11,
    name: "Tecno Mobile Launch",
    startDate: "2025-07-01",
    endDate: "2025-08-31",
    status: "Completed",
    billboardIds: [11, 12, 13, 14, 15, 105, 106, 107], // Ghana Digital + Lagos
    budget: 40000,
    revenue: 40000
  },
  {
    id: 12,
    name: "Nigerian Breweries Promo",
    startDate: "2025-06-01",
    endDate: "2025-07-31",
    status: "Completed",
    billboardIds: [108, 109, 110, 111, 112, 113, 114], // Lagos Wall Drapes
    budget: 38000,
    revenue: 38000
  },
  {
    id: 13,
    name: "Airtel Data Campaign",
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    status: "Completed",
    billboardIds: [117, 118, 119, 132, 134, 135, 136, 137], // Abuja + Northern cities
    budget: 46000,
    revenue: 46000
  },
  {
    id: 14,
    name: "Nestlé Milo Sports",
    startDate: "2025-04-01",
    endDate: "2025-05-31",
    status: "Completed",
    billboardIds: [4, 5, 6, 7, 8, 9, 10], // Ghana Static
    budget: 36000,
    revenue: 36000
  },
];
