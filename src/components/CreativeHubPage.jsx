import React, { useState, useRef } from 'react';
import { Upload, Search, Filter, CheckCircle, XCircle, Clock, Film, Image as ImageIcon, FileText, MoreVertical, Link, Trash2 } from 'lucide-react';
import { useCampaigns } from '../context/CampaignContext'; // Fetch Global State
import { useNavigate } from 'react-router-dom';

const initialMockCreatives = [
    { id: 1, name: "Summer Sale Promo_v1", agency: "Ogilvy MY", type: "video", status: "Approved", url: "https://www.w3schools.com/html/mov_bbb.mp4", dimensions: "1920x1080", duration: "10s", size: "12MB", uploadDate: "2023-10-25" },
    { id: 2, name: "Static Billboard_KL_Sentral", agency: "Dentsu", type: "image", status: "Pending", url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600&h=400", dimensions: "1400x400", duration: "-", size: "1.2MB", uploadDate: "2023-10-26" },
    { id: 3, name: "Holiday Greetings", agency: "McCann", type: "video", status: "Rejected", url: "https://www.w3schools.com/html/movie.mp4", dimensions: "1080x1920", duration: "15s", size: "18MB", uploadDate: "2023-10-27" },
    { id: 4, name: "Nike_AirMax_Launch", agency: "Wieden+Kennedy", type: "video", status: "Approved", url: "https://www.w3schools.com/html/mov_bbb.mp4", dimensions: "1920x1080", duration: "15s", size: "22MB", uploadDate: "2023-10-28" },
];

const CreativeHubPage = () => {
    const { campaigns, assignCreativeToCampaign } = useCampaigns(); // Global Context
    const navigate = useNavigate();

    const [creatives, setCreatives] = useState(initialMockCreatives);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Modal State
    const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
    const [selectedCreativeId, setSelectedCreativeId] = useState(null);

    // --- UPLOAD LOGIC ---
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const isVideo = file.type.startsWith('video/');
        const newCreative = {
            id: Date.now(),
            name: file.name,
            agency: "Direct Upload",
            type: isVideo ? 'video' : 'image',
            status: "Pending", // Default to pending for new uploads
            url: URL.createObjectURL(file), // Generate local preview URL
            dimensions: "Auto",
            duration: isVideo ? "Auto" : "-",
            size: (file.size / (1024 * 1024)).toFixed(1) + "MB",
            uploadDate: new Date().toISOString().split('T')[0]
        };

        setCreatives(prev => [newCreative, ...prev]);
        event.target.value = null; // Reset input so same file can be uploaded again if needed
    };

    // --- DELETE LOGIC ADDED HERE ---
    const handleDeleteCreative = (creativeId) => {
        if (window.confirm("Are you sure you want to delete this asset?")) {
            setCreatives(prev => prev.filter(c => c.id !== creativeId));
        }
    };
    // -------------------------------

    const filteredCreatives = creatives.filter(creative => {
        const matchesSearch = creative.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || creative.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Find campaigns that are waiting for creatives
    const approvedCampaigns = campaigns.filter(c => c.status === 'Approved');

    const handleOpenAssignModal = (creativeId) => {
        setSelectedCreativeId(creativeId);
        setAssignmentModalOpen(true);
    };

    const handleConfirmAssignment = (campaignId) => {
        assignCreativeToCampaign(campaignId, selectedCreativeId);
        setAssignmentModalOpen(false);
        // Optional: Redirect back to campaign manager to show it went Live
        navigate('/campaigns');
    };

    const StatusBadge = ({ status }) => {
        let colorStr = "#64748b"; let bgColorStr = "#f1f5f9"; let Icon = Clock;
        if (status === 'Approved') { colorStr = '#059669'; bgColorStr = '#d1fae5'; Icon = CheckCircle; }
        if (status === 'Rejected') { colorStr = '#dc2626'; bgColorStr = '#fee2e2'; Icon = XCircle; }
        if (status === 'Pending') { colorStr = '#d97706'; bgColorStr = '#fef3c7'; Icon = Clock; }

        return (
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', backgroundColor: bgColorStr, color: colorStr }}>
                <Icon size={12} style={{ marginRight: '4px' }} /> {status}
            </span>
        );
    };

    return (
        <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Content Hub</h1>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>Manage, review, and organize all campaign creative assets.</p>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                />
                <button
                    onClick={() => fileInputRef.current.click()}
                    style={{ display: 'flex', alignItems: 'center', backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                >
                    <Upload size={18} style={{ marginRight: '8px' }} />
                    Upload Assets
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search creatives by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: filterStatus === status ? '1px solid #2563eb' : '1px solid #e2e8f0', backgroundColor: filterStatus === status ? '#eff6ff' : 'white', color: filterStatus === status ? '#2563eb' : '#64748b' }}>
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {filteredCreatives.map((creative) => (
                    <div key={creative.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <div style={{ height: '200px', backgroundColor: '#f8fafc', position: 'relative', borderBottom: '1px solid #e2e8f0' }}>
                            {creative.type === 'video' ? (
                                <video src={creative.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls={false} muted />
                            ) : (
                                <img src={creative.url} alt={creative.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                            <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                                {creative.type === 'video' ? <Film size={12} style={{ marginRight: '4px' }} /> : <ImageIcon size={12} style={{ marginRight: '4px' }} />}
                                {creative.type.toUpperCase()}
                            </div>
                        </div>

                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ overflow: 'hidden' }}>
                                    <h3 style={{ fontWeight: '600', fontSize: '15px', color: '#0f172a', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{creative.name}</h3>
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>By {creative.agency}</span>
                                </div>
                                <StatusBadge status={creative.status} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {creative.status === 'Approved' ? (
                                    <button
                                        onClick={() => handleOpenAssignModal(creative.id)}
                                        style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', color: '#2563eb', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                                        <Link size={14} style={{ marginRight: '6px' }} /> Assign to Campaign
                                    </button>
                                ) : (
                                    <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>Awaiting Approval</span>
                                )}

                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {/* DELETE BUTTON ADDED HERE */}
                                    <button
                                        onClick={() => handleDeleteCreative(creative.id)}
                                        title="Delete Asset"
                                        style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}>
                                        <Trash2 size={18} />
                                    </button>
                                    <button style={{ color: '#94a3b8', border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- ASSIGNMENT MODAL --- */}
            {assignmentModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>Assign Creative to Campaign</h2>
                        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>Select an Approved campaign to link this creative and push it live.</p>

                        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                            {approvedCampaigns.length > 0 ? (
                                approvedCampaigns.map(camp => (
                                    <div key={camp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>{camp.name}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>{camp.brand} | {camp.startDate}</div>
                                        </div>
                                        <button
                                            onClick={() => handleConfirmAssignment(camp.id)}
                                            style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>
                                            Link & Go Live
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                                    No "Approved" campaigns waiting for creatives.
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                            <button onClick={() => setAssignmentModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreativeHubPage;