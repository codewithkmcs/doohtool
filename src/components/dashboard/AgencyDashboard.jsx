import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import { CAMPAIGNS, BOOKED_CAMPAIGN_TRENDS } from '../../data/mockData';
import { TrendingUp, Users, MapPin, Layers, ArrowUpRight, AlertCircle, Clock, Monitor, Sparkles, Target } from 'lucide-react';
import InventoryMap from '../map/InventoryMap';

const AgencyDashboard = () => {
    const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c'];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Agency Strategy Center</h1>
                <p style={{ color: 'var(--text-muted)' }}>Market analytics and campaign forecasting.</p>
            </div>

            {/* AI Planning Insights at the top */}
            <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #fef2f2 100%)', border: '1px solid #dbeafe', padding: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Sparkles size={20} className="text-blue-600" />
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>AI-Generated Planning Insights</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '10px', border: '1px solid white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Target size={16} className="text-blue-500" />
                            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Engagement Forecast</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>KL Sentral digital screens are seeing a <span style={{ fontWeight: '600', color: 'var(--success)' }}>22% surge</span> in weekday morning engagement. Ideal for F&B targeting.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '10px', border: '1px solid white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <AlertCircle size={16} className="text-orange-500" />
                            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Market Saturation</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>Reach in Bukit Bintang peaks at <span style={{ fontWeight: '600' }}>Day 10</span>. Recommend shifting budget to secondary nodes for better ROI.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '10px', border: '1px solid white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <TrendingUp size={16} className="text-purple-500" />
                            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Growth Indicator</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>Johor Bahru border traffic is up <span style={{ fontWeight: '600' }}>15%</span>. Prime opportunity for cross-border fintech/travel campaigns.</p>
                    </div>
                </div>
            </div>

            {/* Snapshot Cards */}
            <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Market Reach Potential</span>
                        <TrendingUp size={20} className="text-blue-500" />
                    </div>
                    <div className="stat-val">8.2M <span style={{ fontSize: '12px', color: 'var(--success)' }}>+5%</span></div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Unique impressions per month</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Active Plans</span>
                        <Clock size={20} className="text-orange-500" />
                    </div>
                    <div className="stat-val">14</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>3 awaiting final approval</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Market Avg. CPM</span>
                        <Layers size={20} className="text-purple-500" />
                    </div>
                    <div className="stat-val">RM 14.80</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Benchmark: RM 15.50</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Connected Screens</span>
                        <Monitor size={20} className="text-green-500" />
                    </div>
                    <div className="stat-val">1,240</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>+12 new additions this week</p>
                </div>
            </div>

            {/* Live Network Activity Map */}
            <div className="card" style={{ marginBottom: '32px', padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Live Network Activity</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Real-time inventory status and active campaigns.</p>
                    </div>
                </div>
                <div style={{ height: '400px', width: '100%', position: 'relative' }}>
                    <InventoryMap />
                </div>
            </div>

            {/* Monthly Trend replacing Campaign List */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Market Demand Trends</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Historical booking volume by channel.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2563eb' }}></div>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Programmatic</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8' }}></div>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Traditional</span>
                        </div>
                    </div>
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
                            <Bar dataKey="traditional" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="programmatic" stackId="a" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AgencyDashboard;
