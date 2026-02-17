import React, { useState, useMemo } from 'react';
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    Info,
    Search,
    ShieldCheck,
    Calendar,
    MapPin,
    Filter,
    X
} from 'lucide-react';
import { CAMPAIGNS, INVENTORY, POP_DATES, POP_SAMPLE_IMAGES, generateDailyPoPStatus } from '../data/mockData';
import ComplianceScorecard from '../components/compliance/ComplianceScorecard';

const CompliancePage = () => {
    const [selectedCampaignId, setSelectedCampaignId] = useState(CAMPAIGNS[0]?.id);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Active');
    const [showPoPModal, setShowPoPModal] = useState(false);
    const [selectedPoP, setSelectedPoP] = useState(null);

    const selectedCampaign = useMemo(() =>
        CAMPAIGNS.find(c => c.id === selectedCampaignId),
        [selectedCampaignId]
    );

    const campaignInventories = useMemo(() => {
        if (!selectedCampaign || !selectedCampaign.inventoryIds) return [];
        return INVENTORY.filter(inv => selectedCampaign.inventoryIds.includes(inv.id));
    }, [selectedCampaign]);

    const dailyData = useMemo(() => {
        if (!selectedCampaign) return {};
        const data = {};
        campaignInventories.forEach(inv => {
            data[inv.id] = generateDailyPoPStatus(selectedCampaign.id, inv.id);
        });
        return data;
    }, [selectedCampaign, campaignInventories]);

    const filteredCampaigns = CAMPAIGNS.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handlePoPClick = (date, inventory) => {
        const imageIndex = (inventory.id.charCodeAt(inventory.id.length - 1) + date.length) % POP_SAMPLE_IMAGES.length;
        setSelectedPoP({
            date,
            inventory: inventory.name,
            image: POP_SAMPLE_IMAGES[imageIndex]
        });
        setShowPoPModal(true);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>
            {/* Left Sidebar - Campaign List */}
            <div style={{ width: '320px', borderRight: '1px solid #1e293b', background: '#1e293b', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <ShieldCheck size={20} style={{ color: '#3b82f6' }} />
                        <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>Compliance</h2>
                    </div>

                    {/* Status Filter */}
                    <div style={{ position: 'relative', marginBottom: '12px' }}>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                width: '100%',
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                padding: '8px 32px 8px 12px',
                                fontSize: '14px',
                                color: 'white',
                                cursor: 'pointer',
                                appearance: 'none'
                            }}
                        >
                            <option value="All">All Campaigns</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Draft">Draft</option>
                        </select>
                        <Filter size={16} style={{ position: 'absolute', right: '12px', top: '10px', color: '#94a3b8', pointerEvents: 'none' }} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                        <input
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                paddingLeft: '36px',
                                paddingRight: '12px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                fontSize: '14px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                    {filteredCampaigns.map(campaign => (
                        <button
                            key={campaign.id}
                            onClick={() => setSelectedCampaignId(campaign.id)}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                border: selectedCampaignId === campaign.id ? '1px solid #3b82f6' : '1px solid transparent',
                                background: selectedCampaignId === campaign.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedCampaignId !== campaign.id) {
                                    e.currentTarget.style.background = '#0f172a';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedCampaignId !== campaign.id) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '500', color: 'white', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{campaign.name}</span>
                                <span style={{
                                    fontSize: '10px',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    background: campaign.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : campaign.status === 'Completed' ? '#334155' : 'rgba(245, 158, 11, 0.2)',
                                    color: campaign.status === 'Active' ? '#10b981' : campaign.status === 'Completed' ? '#94a3b8' : '#f59e0b',
                                    marginLeft: '8px'
                                }}>
                                    {campaign.status}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8' }}>
                                <span>{campaign.inventoryIds?.length || 0} Inventories</span>
                                <span style={{
                                    fontWeight: '500',
                                    color: (campaign.complianceScore || 0) >= 90 ? '#10b981' : (campaign.complianceScore || 0) >= 70 ? '#f59e0b' : '#ef4444'
                                }}>
                                    {campaign.complianceScore || 0}%
                                </span>
                            </div>
                        </button>
                    ))}
                    {filteredCampaigns.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '32px', color: '#64748b', fontSize: '14px' }}>
                            No campaigns found
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, overflowY: 'auto', background: '#0f172a' }}>
                {selectedCampaign && selectedCampaign.inventoryIds?.length > 0 ? (
                    <div style={{ padding: '24px' }}>
                        {/* Header */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'white', margin: 0 }}>{selectedCampaign.name}</h1>
                                <span style={{ fontSize: '14px', padding: '4px 12px', borderRadius: '4px', border: '1px solid #334155', color: '#cbd5e1' }}>
                                    {selectedCampaign.complianceScore || 0}% Compliance
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#94a3b8' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={16} />
                                    {selectedCampaign.startDate} — {selectedCampaign.endDate}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MapPin size={16} />
                                    Malaysia Region
                                </span>
                            </div>
                        </div>

                        {/* Scorecard */}
                        <ComplianceScorecard
                            campaign={selectedCampaign}
                            inventories={campaignInventories}
                            dailyData={dailyData}
                        />

                        {/* Inventory Grid */}
                        <div className="card" style={{ marginTop: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>Daily Proof of Play Status</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: '500', color: '#64748b', width: '300px' }}>Inventory Details</th>
                                            {POP_DATES.map(date => (
                                                <th key={date} style={{ textAlign: 'center', padding: '12px 8px', fontWeight: '500', color: '#64748b', minWidth: '60px' }}>
                                                    {date.split('-').slice(1).join('/')}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {campaignInventories.map(inventory => (
                                            <tr key={inventory.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <td style={{ padding: '12px 16px' }}>
                                                    <div style={{ fontWeight: '500', color: '#1e293b' }}>{inventory.name}</div>
                                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{inventory.location}</div>
                                                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{inventory.type}</div>
                                                </td>
                                                {POP_DATES.map(date => {
                                                    const status = dailyData[inventory.id]?.[date];
                                                    return (
                                                        <td key={date} style={{ textAlign: 'center', padding: '12px 8px' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                {status === 'verified' && (
                                                                    <button
                                                                        onClick={() => handlePoPClick(date, inventory)}
                                                                        style={{
                                                                            width: '32px',
                                                                            height: '32px',
                                                                            borderRadius: '50%',
                                                                            background: 'rgba(16, 185, 129, 0.1)',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            border: 'none',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.2s'
                                                                        }}
                                                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'}
                                                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                                                                    >
                                                                        <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                                                                    </button>
                                                                )}
                                                                {status === 'failed' && (
                                                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <XCircle size={20} style={{ color: '#ef4444' }} />
                                                                    </div>
                                                                )}
                                                                {status === 'pending' && (
                                                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1' }} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        {selectedCampaign ? 'No inventories assigned to this campaign' : 'Select a campaign to view compliance details'}
                    </div>
                )}
            </div>

            {/* PoP Preview Modal */}
            {showPoPModal && selectedPoP && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowPoPModal(false)}>
                    <div style={{ background: '#1e293b', borderRadius: '12px', maxWidth: '672px', width: '100%', margin: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #334155' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>Proof of Play Verification</h3>
                            <button
                                onClick={() => setShowPoPModal(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', display: 'flex' }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div style={{ padding: '16px' }}>
                            <div style={{ aspectRatio: '16/9', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px', overflow: 'hidden', position: 'relative', marginBottom: '16px' }}>
                                <img
                                    src={selectedPoP.image}
                                    alt="PoP Evidence"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0, 0, 0, 0.5)', color: 'white', fontSize: '12px', padding: '4px 8px', borderRadius: '4px' }}>
                                    Verified by Camera 02
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                                <div>
                                    <p style={{ color: '#94a3b8', margin: '0 0 4px 0' }}>Inventory</p>
                                    <p style={{ fontWeight: '500', color: 'white', margin: 0 }}>{selectedPoP.inventory}</p>
                                </div>
                                <div>
                                    <p style={{ color: '#94a3b8', margin: '0 0 4px 0' }}>Date Verified</p>
                                    <p style={{ fontWeight: '500', color: 'white', margin: 0 }}>{selectedPoP.date}</p>
                                </div>
                                <div>
                                    <p style={{ color: '#94a3b8', margin: '0 0 4px 0' }}>Time</p>
                                    <p style={{ fontWeight: '500', color: 'white', margin: 0 }}>14:32:45 UTC+8</p>
                                </div>
                                <div>
                                    <p style={{ color: '#94a3b8', margin: '0 0 4px 0' }}>Status</p>
                                    <span style={{ display: 'inline-block', padding: '4px 8px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '12px', borderRadius: '4px' }}>Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompliancePage;
