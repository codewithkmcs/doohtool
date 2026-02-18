import React, { createContext, useContext, useState, useEffect } from 'react';
import { CAMPAIGNS as INITIAL_CAMPAIGNS } from '../data/mockData';

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState(() => {
        const saved = localStorage.getItem('appCampaigns');
        return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    });

    useEffect(() => {
        localStorage.setItem('appCampaigns', JSON.stringify(campaigns));
    }, [campaigns]);

    const addCampaign = (campaign) => {
        setCampaigns(prev => [campaign, ...prev]);
    };

    const updateCampaignStatus = (id, status) => {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    };

    const deleteCampaign = (id) => {
        setCampaigns(prev => prev.filter(c => c.id !== id));
    };

    // --- NEW: Assign Creative and set to Live ---
    const assignCreativeToCampaign = (campaignId, creativeId) => {
        setCampaigns(prev => prev.map(c =>
            c.id === campaignId
                ? { ...c, assignedCreativeId: creativeId, status: 'Live' }
                : c
        ));
    };

    return (
        <CampaignContext.Provider value={{
            campaigns,
            addCampaign,
            updateCampaignStatus,
            deleteCampaign,
            assignCreativeToCampaign // Exposed to the app
        }}>
            {children}
        </CampaignContext.Provider>
    );
};

export const useCampaigns = () => {
    const context = useContext(CampaignContext);
    if (!context) {
        throw new Error('useCampaigns must be used within a CampaignProvider');
    }
    return context;
};