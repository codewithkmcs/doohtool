import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { billboardsData, type Billboard } from "@/data/billboards";

interface BillboardContextType {
  billboards: Billboard[];
  addBillboard: (billboard: Billboard) => void;
  updateBillboard: (billboard: Billboard) => void;
  deleteBillboard: (id: number) => void;
  updateBillboardStatuses: (activeCampaigns: any[]) => void;
}

const BillboardContext = createContext<BillboardContextType | undefined>(undefined);

export const BillboardProvider = ({ children }: { children: ReactNode }) => {
  const [billboards, setBillboards] = useState<Billboard[]>(() => {
    const savedBillboards = localStorage.getItem("billboards");
    if (savedBillboards) {
      return JSON.parse(savedBillboards);
    }
    return billboardsData.map(b => ({
      ...b,
      status: b.needsService ? "Needs Service" : "Available",
      needsService: false
    }));
  });

  useEffect(() => {
    localStorage.setItem("billboards", JSON.stringify(billboards));
  }, [billboards]);

  const addBillboard = (billboard: Billboard) => {
    setBillboards([...billboards, billboard]);
  };

  const updateBillboard = (billboard: Billboard) => {
    setBillboards(billboards.map(b => b.id === billboard.id ? billboard : b));
  };

  const deleteBillboard = (id: number) => {
    setBillboards(billboards.filter(b => b.id !== id));
  };

  const updateBillboardStatuses = (activeCampaigns: any[]) => {
    setBillboards(prevBillboards =>
      prevBillboards.map(billboard => {
        // If manually set to "Needs Service", keep that status
        if (billboard.needsService) {
          return { ...billboard, status: "Needs Service" as const };
        }

        // Check if billboard is occupied by any active campaign
        const now = new Date();
        const isOccupied = activeCampaigns.some(campaign => {
          const startDate = new Date(campaign.startDate);
          const endDate = new Date(campaign.endDate);
          return campaign.billboardIds.includes(billboard.id) &&
            startDate <= now &&
            endDate >= now;
        });

        return {
          ...billboard,
          status: isOccupied ? "Occupied" as const : "Available" as const
        };
      })
    );
  };

  return (
    <BillboardContext.Provider value={{ billboards, addBillboard, updateBillboard, deleteBillboard, updateBillboardStatuses }}>
      {children}
    </BillboardContext.Provider>
  );
};

export const useBillboards = () => {
  const context = useContext(BillboardContext);
  if (context === undefined) {
    throw new Error("useBillboards must be used within a BillboardProvider");
  }
  return context;
};
