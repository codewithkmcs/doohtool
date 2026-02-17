import React, { useState } from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { usePersona, PERSONAS } from '../../context/PersonaContext';
import { Search, Filter, CheckCircle, XCircle, Upload, Eye, BarChart2, Calendar, Tag, Briefcase } from 'lucide-react';

const CampaignManager = () => {
    const { persona } = usePersona();
    const { campaigns, updateCampaignStatus } = useCampaigns();
    const [activeTab, setActiveTab] = useState('Booked');

    const tabs = ['Booked', 'Approved', 'Live', 'Completed'];

    const filteredCampaigns = campaigns.filter(camp => {
        // In this prototype, we show all campaigns that match the status
        return camp.status === activeTab;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Booked': return 'text-orange-600 bg-orange-50';
            case 'Approved': return 'text-blue-600 bg-blue-50';
            case 'Live': return 'text-green-600 bg-green-50';
            case 'Completed': return 'text-slate-600 bg-slate-100';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    const handleApprove = (id) => {
        updateCampaignStatus(id, 'Approved');
        setActiveTab('Approved');
    };

    const getActions = (camp) => {
        switch (camp.status) {
            case 'Booked':
                return (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                            className="btn-primary"
                            onClick={() => handleApprove(camp.id)}
                            style={{ padding: '6px 12px', fontSize: '12px', background: '#16a34a', borderColor: '#16a34a' }}
                        >
                            Approve
                        </button>
                        <button className="btn-outline" style={{ padding: '6px 12px', fontSize: '12px', color: '#dc2626', borderColor: '#dc2626' }}>
                            Reject
                        </button>
                    </div>
                );
            case 'Approved':
                return (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            <Upload size={14} style={{ marginRight: '4px' }} /> Creatives
                        </button>
                        <button className="btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            Review
                        </button>
                    </div>
                );
            case 'Live':
                return (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            <Eye size={14} style={{ marginRight: '4px' }} /> View Delivery
                        </button>
                    </div>
                );
            case 'Completed':
                return (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            <BarChart2 size={14} style={{ marginRight: '4px' }} /> Full Report
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Operational Hub</h1>
                <p style={{ color: 'var(--text-muted)' }}>Management oversight of all campaign bookings and delivery statuses.</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '24px', gap: '32px' }}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '12px 4px',
                            fontSize: '14px',
                            fontWeight: activeTab === tab ? '600' : '500',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            borderBottom: `2px solid ${activeTab === tab ? 'var(--primary)' : 'transparent'}`,
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            background: 'none',
                            marginBottom: '-1px',
                            display: 'flex',
                            alignItems: 'center',
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none'
                        }}
                    >
                        {tab}
                        <span style={{
                            marginLeft: '8px',
                            fontSize: '11px',
                            background: activeTab === tab ? 'var(--primary)' : '#e2e8f0',
                            color: activeTab === tab ? 'white' : '#64748b',
                            padding: '2px 6px',
                            borderRadius: '10px'
                        }}>
                            {campaigns.filter(c => c.status === tab).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Campaign List */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Filter campaigns..."
                            style={{ width: '100%', padding: '8px 10px 8px 36px', border: '1px solid var(--border)', borderRadius: '6px', outline: 'none', fontSize: '13px' }}
                        />
                    </div>
                    <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <Calendar size={16} /> Date Range
                    </button>
                </div>

                <div className="table-container">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Campaign & Brand</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Agency</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Type</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Period</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCampaigns.length > 0 ? (
                                filteredCampaigns.map(camp => (
                                    <tr key={camp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{camp.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{camp.brand}</div>
                                        </td>
                                        <td style={{ padding: '16px 20px', fontSize: '13px' }}>{camp.agency}</td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: camp.type === 'Digital' ? '#f0f9ff' : '#f0fdf4', color: camp.type === 'Digital' ? '#0369a1' : '#166534', fontWeight: '600' }}>
                                                {camp.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 20px', fontSize: '13px' }}>
                                            {camp.startDate} – {camp.endDate}
                                        </td>
                                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                            {getActions(camp)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                            <Briefcase size={32} strokeWidth={1.5} />
                                            <p>No campaigns found in this status.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CampaignManager;
