import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart } from 'recharts';
import { TrendingUp, Clock, Layers, Sparkles, Target, AlertCircle, Briefcase, Wallet } from 'lucide-react';

// --- MOCKED DATA ---

// 2026 Forecast Data
const CAMPAIGN_TRENDS_2026 = [
    { month: 'Jan', booked: 45, planned: 0 },
    { month: 'Feb', booked: 38, planned: 0 }, // Present Month
    { month: 'Mar', booked: 22, planned: 18 },
    { month: 'Apr', booked: 12, planned: 30 },
    { month: 'May', booked: 8, planned: 42 },
    { month: 'Jun', booked: 4, planned: 48 },
    { month: 'Jul', booked: 0, planned: 55 },
    { month: 'Aug', booked: 0, planned: 50 },
    { month: 'Sep', booked: 0, planned: 60 },
    { month: 'Oct', booked: 0, planned: 65 },
    { month: 'Nov', booked: 0, planned: 58 },
    { month: 'Dec', booked: 0, planned: 70 },
];

// NEW: Advertiser Trend Data (YTD Executed Campaigns)
const ADVERTISER_CAMPAIGNS = [
    { advertiser: 'MTN Nigeria', campaigns: 42 },
    { advertiser: 'Guaranty Trust Bank', campaigns: 34 },
    { advertiser: 'Nigerian Breweries', campaigns: 28 },
    { advertiser: 'FrieslandCampina', campaigns: 21 },
    { advertiser: 'Unilever Nigeria', campaigns: 15 },
];

const AgencyDashboard = () => {
    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Agency Strategy Center</h1>
                <p style={{ color: 'var(--text-muted)' }}>Market analytics, client portfolio trends, and campaign forecasting.</p>
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
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>Victoria Island digital screens are seeing a <span style={{ fontWeight: '600', color: 'var(--success)' }}>28% surge</span> in weekday morning engagement. Ideal for FMCG targeting.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '10px', border: '1px solid white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <AlertCircle size={16} className="text-orange-500" />
                            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Share of Voice (SOV) Alert</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>Competitor SOV on Third Mainland Bridge is peaking. Recommend shifting telecom budgets to Lekki Phase 1 to maintain dominance.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '10px', border: '1px solid white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <TrendingUp size={16} className="text-purple-500" />
                            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Format Optimization</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>Programmatic DOOH buys are currently <span style={{ fontWeight: '600' }}>12% more cost-efficient</span> than traditional static buys for short-term retail promos.</p>
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
                    <div className="stat-val">12.4M <span style={{ fontSize: '12px', color: 'var(--success)' }}>+8%</span></div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Unique impressions per month</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Active Client Plans</span>
                        <Clock size={20} className="text-orange-500" />
                    </div>
                    <div className="stat-val">14</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>3 awaiting final brand approval</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Market Avg. CPM</span>
                        <Layers size={20} className="text-purple-500" />
                    </div>
                    <div className="stat-val">₦ 4,850</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Benchmark: ₦ 5,200</p>
                </div>

                {/* NEW ADTECH METRIC: DOOH Allocation replaces Connected Screens */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">DOOH Spend Allocation</span>
                        <Wallet size={20} className="text-green-500" />
                    </div>
                    <div className="stat-val">68%</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Targeting 75% digital by Q3</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>

                {/* NEW: Advertiser Campaign Volume Leaderboard (Replaced Map) */}
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Top Advertisers by Volume</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Executed campaigns across agency portfolio.</p>
                        </div>
                        <Briefcase size={20} className="text-slate-400" />
                    </div>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={ADVERTISER_CAMPAIGNS}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis type="category" dataKey="advertiser" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#0f172a', fontWeight: 500 }} width={120} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="campaigns" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} name="Executed Campaigns" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Monthly Trend replacing Campaign List */}
                <div className="card" style={{ padding: '24px' }}>
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
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                                <Bar dataKey="booked" stackId="a" fill="#2563eb" name="Booked (Approved)" />
                                <Bar dataKey="planned" stackId="a" fill="#cbd5e1" name="Planned / Upcoming" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AgencyDashboard;