import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { INVENTORY } from '../../data/mockData';
import { DollarSign, Monitor, TrendingUp, Users, Plus, BarChart3, Target, Activity, Sparkles, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

// Added specifically for the 2026 Jan-Dec requirement
const CAMPAIGN_TRENDS_2026 = [
    { month: 'Jan', booked: 32, planned: 0 },
    { month: 'Feb', booked: 28, planned: 0 }, // Present Month
    { month: 'Mar', booked: 18, planned: 12 },
    { month: 'Apr', booked: 10, planned: 24 },
    { month: 'May', booked: 5, planned: 30 },
    { month: 'Jun', booked: 2, planned: 35 },
    { month: 'Jul', booked: 0, planned: 40 },
    { month: 'Aug', booked: 0, planned: 38 },
    { month: 'Sep', booked: 0, planned: 45 },
    { month: 'Oct', booked: 0, planned: 50 },
    { month: 'Nov', booked: 0, planned: 48 },
    { month: 'Dec', booked: 0, planned: 60 },
];

const MediaOwnerDashboard = () => {
    // --- PAGINATION & SORTING STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' or 'asc'
    const ITEMS_PER_PAGE = 15;

    // Filter to Media Owner
    const myInventory = useMemo(() => INVENTORY.filter(inv => inv.ownerId === 'mo-1'), []);

    // Sort Logic (Dynamic based on utilisation)
    const sortedInventory = useMemo(() => {
        return [...myInventory].sort((a, b) => {
            return sortOrder === 'desc' ? b.utilisation - a.utilisation : a.utilisation - b.utilisation;
        });
    }, [myInventory, sortOrder]);

    // Pagination Logic
    const totalPages = Math.ceil(sortedInventory.length / ITEMS_PER_PAGE);
    const paginatedInventory = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedInventory.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedInventory, currentPage]);

    const toggleSort = () => {
        setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
        setCurrentPage(1); // Reset to first page on sort change
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Media Owner Control Center</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Real-time yield and network performance for <span style={{ fontWeight: '600' }}>Prime Outdoors NG</span>.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> New Asset
                </button>
            </div>

            {/* AI Generated Intelligence at the Top */}
            <div className="card" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Sparkles size={20} className="text-blue-600" />
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>Intelligence & Optimization Hints</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ padding: '8px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <TrendingUp size={16} className="text-green-600" />
                        </div>
                        <div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Yield Opportunity</span>
                            <p style={{ fontSize: '12px', color: '#64748b' }}>Lekki Toll Gate digital slots for Q3 are <span style={{ color: 'var(--success)', fontWeight: '600' }}>65% underpriced</span> compared to market surge. Recommend +15% rate adjustment.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ padding: '8px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <Activity size={16} className="text-blue-600" />
                        </div>
                        <div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Maintenance Alert</span>
                            <p style={{ fontSize: '12px', color: '#64748b' }}>Oshodi-Apapa Expressway boards showing <span style={{ color: 'var(--warning)', fontWeight: '600' }}>22% lower</span> visual clarity in recent API scans. Schedule LED module check.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ padding: '8px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <Users size={16} className="text-purple-600" />
                        </div>
                        <div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Buyer Sentiment</span>
                            <p style={{ fontSize: '12px', color: '#64748b' }}>Media Agencies are actively searching for <span style={{ fontWeight: '600' }}>"High-Dwell Time"</span> traffic bottlenecks. Tag your prime bottleneck sites for visibility.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Snapshot Stats */}
            <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Total Revenue (Mtd)</span>
                        <DollarSign size={20} className="text-green-500" />
                    </div>
                    <div className="stat-val">₦ 84.5M <span style={{ fontSize: '12px', color: 'var(--success)' }}>+12.4%</span></div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Projected: ₦ 95M</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Network Occupancy</span>
                        <Target size={20} className="text-blue-500" />
                    </div>
                    <div className="stat-val">78.5%</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>12 Slots available in Mar</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Programmatic Yield</span>
                        <BarChart3 size={20} className="text-purple-500" />
                    </div>
                    <div className="stat-val">₦ 5,100</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Avg Floor: ₦ 4,500</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">System Uptime</span>
                        <Monitor size={20} className="text-blue-500" />
                    </div>
                    <div className="stat-val">99.8%</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Active heartbeat on 45 screens</p>
                </div>
            </div>

            {/* Campaign Trend Centerpiece */}
            <div className="card" style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>2026 Campaign Booking Trends</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Approved vs Planned campaigns from Jan to Dec.</p>
                    </div>
                    <div className="badge badge-info" style={{ fontSize: '11px' }}>2026 Forecast Included</div>
                </div>
                <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={CAMPAIGN_TRENDS_2026}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Legend iconType="circle" />
                            <Bar dataKey="booked" stackId="a" fill="#2563eb" name="Booked (Approved)" />
                            <Bar dataKey="planned" stackId="a" fill="#cbd5e1" name="Planned / Upcoming" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Billboard-Level Utilisation (NOW PAGINATED & SORTABLE) */}
            <div className="card" style={{ marginBottom: '32px', padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Asset Performance & Utilisation</h3>
                    <button className="btn-outline" style={{ fontSize: '12px' }}>Export CSV</button>
                </div>
                <div className="table-container shadow-none border-0">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Billboard</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Type</th>
                                <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Camps</th>

                                {/* SORTABLE HEADER */}
                                <th
                                    onClick={toggleSort}
                                    style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase', cursor: 'pointer', background: '#eff6ff', transition: '0.2s' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        Utilisation
                                        {sortOrder === 'desc' ? <ChevronDown size={14} color="#2563eb" /> : <ChevronUp size={14} color="#2563eb" />}
                                    </div>
                                </th>

                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rev (Mtd)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedInventory.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 20px', fontSize: '14px', fontWeight: '600' }}>{item.name}</td>
                                    <td style={{ padding: '12px 20px' }}>
                                        <span className={`badge ${item.type === 'Digital' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '10px' }}>{item.type}</span>
                                    </td>
                                    <td style={{ padding: '12px 20px', fontSize: '14px', textAlign: 'center' }}>{item.campaignCount}</td>
                                    <td style={{ padding: '12px 20px', background: '#fafafa' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ flex: 1, minWidth: '80px', height: '6px', background: '#e2e8f0', borderRadius: '3px' }}>
                                                <div style={{ width: `${item.utilisation}%`, height: '100%', background: item.utilisation > 80 ? 'var(--success)' : item.utilisation > 50 ? 'var(--primary)' : 'var(--error)', borderRadius: '3px' }}></div>
                                            </div>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.utilisation}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 20px', textAlign: 'right', fontSize: '14px', fontWeight: 'bold' }}>₦ {item.revenue.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION CONTROLS */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedInventory.length)} of {sortedInventory.length} assets
                    </span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="btn-outline"
                            style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                        >
                            <ChevronLeft size={14} /> Prev
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '0 8px' }}>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="btn-outline"
                            style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
                        >
                            Next <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaOwnerDashboard;