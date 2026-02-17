import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from 'recharts';
import { INVENTORY, BOOKED_CAMPAIGN_TRENDS } from '../../data/mockData';
import { DollarSign, Monitor, TrendingUp, Users, Plus, ArrowUpRight, BarChart3, Target, ArrowDownRight, Layers, Sparkles, Activity } from 'lucide-react';

const MediaOwnerDashboard = () => {
    const myInventory = INVENTORY.filter(inv => inv.ownerId === 'mo-1');
    const sortedInventory = [...myInventory].sort((a, b) => b.utilisation - a.utilisation);

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Media Owner Control Center</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Real-time yield and network performance for <span style={{ fontWeight: '600' }}>Elite Outdoors</span>.</p>
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
                            <p style={{ fontSize: '12px', color: '#64748b' }}>Bukit Bintang digital slots for Mar-Apr are <span style={{ color: 'var(--success)', fontWeight: '600' }}>85% underpriced</span> compared to market surge. Recommend +12% adjustment.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ padding: '8px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <Activity size={16} className="text-blue-600" />
                        </div>
                        <div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Maintenance Alert</span>
                            <p style={{ fontSize: '12px', color: '#64748b' }}>Federal Highway static boards showing <span style={{ color: 'var(--warning)', fontWeight: '600' }}>45% lower</span> visual clarity in recent scans. Schedule cleaning for next week.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ padding: '8px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <Users size={16} className="text-purple-600" />
                        </div>
                        <div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Buyer Sentiment</span>
                            <p style={{ fontSize: '12px', color: '#64748b' }}>Creative Agencies are searching for <span style={{ fontWeight: '600' }}>"Sustainability"</span> themed static boards. Tag your eco-friendly sites for visibility.</p>
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
                    <div className="stat-val">RM 142,500 <span style={{ fontSize: '12px', color: 'var(--success)' }}>+8.4%</span></div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Projected: RM 165k</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Network Occupancy</span>
                        <Target size={20} className="text-blue-500" />
                    </div>
                    <div className="stat-val">74.2%</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>8 Slots available in Mar</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Programmatic Yield</span>
                        <BarChart3 size={20} className="text-purple-500" />
                    </div>
                    <div className="stat-val">RM 12.80</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Avg Floor: RM 11.50</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">System Uptime</span>
                        <Monitor size={20} className="text-blue-500" />
                    </div>
                    <div className="stat-val">99.9%</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Active heartbeat on 7 screens</p>
                </div>
            </div>

            {/* Campaign Trend Centerpiece */}
            <div className="card" style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Monthly Booked Campaign Trend</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Historical demand across sales channels.</p>
                    </div>
                    <div className="badge badge-info" style={{ fontSize: '11px' }}>Q1 2026 Forecast Included</div>
                </div>
                <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={BOOKED_CAMPAIGN_TRENDS}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend iconType="circle" />
                            <Bar dataKey="traditional" stackId="a" fill="#64748b" name="Traditional" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="programmatic" stackId="a" fill="#2563eb" name="Programmatic" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Billboard-Level Utilisation */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Asset Performance & Utilisation</h3>
                    <button className="btn-outline" style={{ fontSize: '12px' }}>View Full Registry</button>
                </div>
                <div className="table-container shadow-none border">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Billboard</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Type</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Camps</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Utilisation</th>
                                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rev (Mtd)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedInventory.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600' }}>{item.name}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span className={`badge ${item.type === 'Digital' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '10px' }}>{item.type}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center' }}>{item.campaignCount}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ flex: 1, minWidth: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px' }}>
                                                <div style={{ width: `${item.utilisation}%`, height: '100%', background: item.utilisation > 80 ? 'var(--success)' : item.utilisation > 50 ? 'var(--primary)' : 'var(--error)', borderRadius: '3px' }}></div>
                                            </div>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.utilisation}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '14px', fontWeight: 'bold' }}>RM {item.revenue.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MediaOwnerDashboard;
