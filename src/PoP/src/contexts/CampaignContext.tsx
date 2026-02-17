import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { campaignsData, type Campaign } from "@/data/campaigns";

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaign: Campaign) => void;
  deleteCampaign: (id: number) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const savedCampaigns = localStorage.getItem("campaigns");
    if (savedCampaigns) {
      return JSON.parse(savedCampaigns);
    }
    return campaignsData;
  });

  useEffect(() => {
    localStorage.setItem("campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  const addCampaign = (campaign: Campaign) => {
    setCampaigns([...campaigns, campaign]);
  };

  const updateCampaign = (campaign: Campaign) => {
    setCampaigns(campaigns.map(c => c.id === campaign.id ? campaign : c));
  };

  const deleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, updateCampaign, deleteCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignProvider");
  }
  return context;
};
