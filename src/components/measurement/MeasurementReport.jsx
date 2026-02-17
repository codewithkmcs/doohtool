import React, { useState } from 'react';
import { CAMPAIGNS } from '../../data/mockData';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts';
import {
    Calendar, Users, Target, TrendingUp, Filter, Download,
    Clock, MapPin, Briefcase, ChevronRight, Activity, Percent, ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', textAlign: 'center', background: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '12px', margin: '24px' }}>
                    <AlertCircle size={48} color="#f56565" style={{ marginBottom: '16px' }} />
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#c53030', marginBottom: '8px' }}>Something went wrong</h2>
                    <p style={{ color: '#742a2a', marginBottom: '16px' }}>{this.state.error?.message || 'Unknown error occurred in the report.'}</p>
                    <button className="btn-primary" onClick={() => window.location.reload()}>Reload Page</button>
                </div>
            );
        }
        return this.props.children;
    }
}

const MeasurementReport = () => {
    const campaign = CAMPAIGNS[0]; // Lunar New Year Blitz

    if (!campaign) return <div style={{ padding: '40px', textAlign: 'center' }}>Campaign not found</div>;

    const [dailyMetric, setDailyMetric] = useState('impressions'); // 'impressions', 'reach', 'frequency'
    const [hourlyMetric, setHourlyMetric] = useState('impressions');
    const [expandedAsset, setExpandedAsset] = useState(null);
    const [assetMetric, setAssetMetric] = useState('impressions');
    const [assetTimeView, setAssetTimeView] = useState('daily');
    const [segmentCategory, setSegmentCategory] = useState('actions'); // 'actions', 'interests', 'hobbies', 'professional'

    const GENDER_DATA = (campaign.audience && campaign.audience.gender) ? [
        { name: 'Male', value: campaign.audience.gender.male || 0, color: '#3b82f6' },
        { name: 'Female', value: campaign.audience.gender.female || 0, color: '#ec4899' }
    ] : [];

    const getMetricColor = (metric) => {
        switch (metric) {
            case 'impressions': return '#3b82f6';
            case 'reach': return '#10b981';
            case 'frequency': return '#f59e0b';
            default: return '#3b82f6';
        }
    };

    const formatMetricValue = (value, metric) => {
        if (metric === 'frequency') return `${value.toFixed(2)}x`;
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
        return value.toLocaleString();
    };

    const MetricToggle = ({ activeMetric, onChange }) => (
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
            {['impressions', 'reach', 'frequency'].map(metric => (
                <button
                    key={metric}
                    onClick={() => onChange(metric)}
                    style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        border: 'none',
                        background: activeMetric === metric ? 'white' : 'transparent',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        color: activeMetric === metric ? getMetricColor(metric) : '#64748b',
                        textTransform: 'capitalize'
                    }}
                >
                    {metric}
                </button>
            ))}
        </div>
    );

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span className="badge badge-success">Live Campaign</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {campaign.id}</span>
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: 'bold' }}>{campaign.name} Report</h1>
                    <p style={{ color: 'var(--text-muted)' }}>{campaign.brand} • {campaign.startDate} to {campaign.endDate} ({campaign.duration})</p>
                </div>
                <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={18} /> Export PDF
                </button>
            </div>

            {/* Core Stats Bar */}
            <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
                <div className="card">
                    <span className="stat-label">Total Impressions</span>
                    <div className="stat-val">{((campaign.impressions || 0) / 1000000).toFixed(2)}M</div>
                    <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '4px', fontWeight: 'bold' }}>+12% vs Forecast</div>
                </div>
                <div className="card">
                    <span className="stat-label">Unique Reach</span>
                    <div className="stat-val">{((campaign.reach || 0) / 1000).toFixed(0)}k</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>68% of Target Audience</div>
                </div>
                <div className="card">
                    <span className="stat-label">Avg. Frequency</span>
                    <div className="stat-val">{campaign.frequency || 0}x</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Optimal Saturation</div>
                </div>
                <div className="card">
                    <span className="stat-label">Execution CPM</span>
                    <div className="stat-val">RM {(campaign.cpm || 0).toFixed(2)}</div>
                    <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '4px' }}>-RM 2.20 vs Market</div>
                </div>
            </div>

            {/* Ad Delivery Metrics */}
            {campaign.delivery && (
                <div className="card" style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Ad Delivery & Bid Performance</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Programmatic bidding metrics and exchange performance.</p>
                        </div>
                    </div>

                    {/* Delivery KPIs */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Bid Requests</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{((campaign.delivery?.bidRequests || 0) / 1000000).toFixed(2)}M</div>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Bid Responses</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{((campaign.delivery?.bidResponses || 0) / 1000000).toFixed(2)}M</div>
                        </div>
                        <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Bids Won</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{((campaign.delivery?.bidsWon || 0) / 1000000).toFixed(2)}M</div>
                        </div>
                        <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Fill Rate</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>{campaign.delivery?.fillRate || 0}%</div>
                        </div>
                        <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Win Rate</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>{campaign.delivery?.winRate || 0}%</div>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Avg Latency</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{campaign.delivery?.avgLatency || 0}ms</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '24px' }}>
                        {/* Daily Bid Trends */}
                        <div>
                            <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>Daily Bid Trends</h4>
                            <div style={{ height: '220px', width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={campaign.delivery?.daily || []}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            formatter={(v) => [v?.toLocaleString() || '0', '']}
                                        />
                                        <Legend />
                                        <Bar dataKey="bidRequests" fill="#94a3b8" radius={[2, 2, 0, 0]} name="Requests" />
                                        <Bar dataKey="bidResponses" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Responses" />
                                        <Bar dataKey="bidsWon" fill="#10b981" radius={[2, 2, 0, 0]} name="Wins" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Exchange Performance */}
                        <div>
                            <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>Exchange Performance</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {campaign.delivery.byExchange.map(ex => (
                                    <div key={ex.name} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '600' }}>{ex.name}</span>
                                            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>{ex.winRate}% win</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                                            <span>{(ex.bidRequests / 1000000).toFixed(2)}M requests</span>
                                            <span>{(ex.wins / 1000).toFixed(0)}k wins</span>
                                            <span style={{ color: '#0f172a', fontWeight: '600' }}>RM {ex.spend.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Additional Metrics Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Bid Price</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>RM {(campaign.delivery?.avgBidPrice || 0).toFixed(2)}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Win Price</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>RM {(campaign.delivery?.avgWinPrice || 0).toFixed(2)}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bid Floor</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>RM {(campaign.delivery?.bidFloor || 0).toFixed(2)}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Timeouts / Errors</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444' }}>{((campaign.delivery?.timeouts || 0) / 1000).toFixed(1)}k / {((campaign.delivery?.errors || 0) / 1000).toFixed(1)}k</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Daily Breakdown with Metric Toggle */}
            <div className="card" style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Daily Performance Breakdown</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Campaign-level {dailyMetric} across campaign dates.</p>
                    </div>
                    <MetricToggle activeMetric={dailyMetric} onChange={setDailyMetric} />
                </div>
                <div style={{ height: '320px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={campaign.audience?.daily || []}>
                            <defs>
                                <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={getMetricColor(dailyMetric)} stopOpacity={0.1} />
                                    <stop offset="95%" stopColor={getMetricColor(dailyMetric)} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => formatMetricValue(v, dailyMetric)} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                formatter={(v) => [formatMetricValue(v, dailyMetric), dailyMetric.charAt(0).toUpperCase() + dailyMetric.slice(1)]}
                            />
                            <Area
                                type="monotone"
                                dataKey={dailyMetric}
                                stroke={getMetricColor(dailyMetric)}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorDaily)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Hourly Trends with Metric Toggle */}
            <div className="card" style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Hourly Trends</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Typical {hourlyMetric} distribution across day hours.</p>
                    </div>
                    <MetricToggle activeMetric={hourlyMetric} onChange={setHourlyMetric} />
                </div>
                <div style={{ height: '280px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={campaign.audience?.hourly || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => formatMetricValue(v, hourlyMetric)} />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                formatter={(v) => [formatMetricValue(v, hourlyMetric), hourlyMetric.charAt(0).toUpperCase() + hourlyMetric.slice(1)]}
                            />
                            <Bar dataKey={hourlyMetric} fill={getMetricColor(hourlyMetric)} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '32px', marginBottom: '32px' }}>
                {/* Geolocation Areas */}
                <div className="card">
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={20} className="text-blue-500" /> Mobility Hotspots
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px', borderLeft: '3px solid #3b82f6', paddingLeft: '8px' }}>Primary Living Areas</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {campaign.audience?.hotspots?.filter(h => h.type === 'Living').map(h => (
                                    <div key={h.area} style={{ display: 'flex', justifyContent: 'space-between', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                                        <span style={{ fontSize: '13px' }}>{h.area}</span>
                                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e40af' }}>{h.weight}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px', borderLeft: '3px solid #8b5cf6', paddingLeft: '8px' }}>Top Working Hubs</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {campaign.audience?.hotspots?.filter(h => h.type === 'Work').map(h => (
                                    <div key={h.area} style={{ display: 'flex', justifyContent: 'space-between', background: '#f5f3ff', padding: '10px', borderRadius: '8px' }}>
                                        <span style={{ fontSize: '13px' }}>{h.area}</span>
                                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#5b21b6' }}>{h.weight}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audience Split */}
                <div className="card">
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Audience Split</h3>
                    <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={GENDER_DATA}
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {GENDER_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                        {campaign.audience?.gender && (
                            <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{campaign.audience.gender.male}%</div>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Male</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Audience Segmentation */}
            <div className="card" style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Audience Segmentation</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Affinity index by category (% of audience matching segment).</p>
                    </div>
                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                        {['actions', 'interests', 'hobbies', 'professional'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSegmentCategory(cat)}
                                style={{
                                    padding: '6px 14px',
                                    fontSize: '12px',
                                    border: 'none',
                                    background: segmentCategory === cat ? 'white' : 'transparent',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    color: segmentCategory === cat ? '#0f172a' : '#64748b',
                                    textTransform: 'capitalize'
                                }}
                            >{cat}</button>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {Array.isArray(campaign.audience?.segments) ? (
                        campaign.audience.segments.map(seg => (
                            <div key={seg.name} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{seg.name}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{seg.description || ''}</div>
                                    </div>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: seg.value >= 70 ? '#10b981' : seg.value >= 50 ? '#3b82f6' : '#64748b' }}>{seg.value}%</div>
                                </div>
                                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${seg.value}%`, height: '100%', background: seg.value >= 70 ? '#10b981' : seg.value >= 50 ? '#3b82f6' : '#94a3b8', transition: 'width 0.3s ease' }}></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        campaign.audience?.segments?.[segmentCategory]?.map(seg => (
                            <div key={seg.name} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{seg.name}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{seg.description}</div>
                                    </div>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: seg.value >= 70 ? '#10b981' : seg.value >= 50 ? '#3b82f6' : '#64748b' }}>{seg.value}%</div>
                                </div>
                                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${seg.value}%`, height: '100%', background: seg.value >= 70 ? '#10b981' : seg.value >= 50 ? '#3b82f6' : '#94a3b8', transition: 'width 0.3s ease' }}></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Asset Breakdown with Expandable Rows */}
            <div className="card">
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Asset Performance Breakdown</h3>
                <div className="table-container shadow-none border">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inventory Asset</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Impressions</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reach</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Frequency</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Delivery CPM</th>
                                <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaign.assets.map(asset => (
                                <React.Fragment key={asset.id}>
                                    <tr style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onClick={() => setExpandedAsset(expandedAsset === asset.id ? null : asset.id)}>
                                        <td style={{ padding: '16px 20px', fontWeight: '600', fontSize: '14px' }}>{asset.name}</td>
                                        <td style={{ padding: '16px 20px', textAlign: 'right', fontSize: '14px' }}>{asset.impressions.toLocaleString()}</td>
                                        <td style={{ padding: '16px 20px', textAlign: 'right', fontSize: '14px' }}>{asset.reach.toLocaleString()}</td>
                                        <td style={{ padding: '16px 20px', textAlign: 'right', fontSize: '14px' }}>{asset.frequency?.toFixed(2) || '0.00'}x</td>
                                        <td style={{ padding: '16px 20px', textAlign: 'right', fontSize: '14px', fontWeight: 'bold' }}>RM {asset.cpm?.toFixed(2) || '0.00'}</td>
                                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                            {expandedAsset === asset.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </td>
                                    </tr>
                                    {expandedAsset === asset.id && (
                                        <tr>
                                            <td colSpan="6" style={{ padding: '0', background: '#f8fafc' }}>
                                                <div style={{ padding: '24px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setAssetTimeView('daily'); }}
                                                                style={{ padding: '6px 14px', fontSize: '12px', border: '1px solid var(--border)', background: assetTimeView === 'daily' ? 'white' : 'transparent', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                                                            >Daily</button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setAssetTimeView('hourly'); }}
                                                                style={{ padding: '6px 14px', fontSize: '12px', border: '1px solid var(--border)', background: assetTimeView === 'hourly' ? 'white' : 'transparent', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                                                            >Hourly</button>
                                                        </div>
                                                        <MetricToggle activeMetric={assetMetric} onChange={setAssetMetric} />
                                                    </div>
                                                    <div style={{ height: '200px', width: '100%' }}>
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            {assetTimeView === 'daily' ? (
                                                                <AreaChart data={asset.daily}>
                                                                    <defs>
                                                                        <linearGradient id={`colorAsset-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                                                                            <stop offset="5%" stopColor={getMetricColor(assetMetric)} stopOpacity={0.1} />
                                                                            <stop offset="95%" stopColor={getMetricColor(assetMetric)} stopOpacity={0} />
                                                                        </linearGradient>
                                                                    </defs>
                                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => formatMetricValue(v, assetMetric)} />
                                                                    <Tooltip
                                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                                        formatter={(v) => [formatMetricValue(v, assetMetric), assetMetric.charAt(0).toUpperCase() + assetMetric.slice(1)]}
                                                                    />
                                                                    <Area type="monotone" dataKey={assetMetric} stroke={getMetricColor(assetMetric)} strokeWidth={2} fillOpacity={1} fill={`url(#colorAsset-${asset.id})`} />
                                                                </AreaChart>
                                                            ) : (
                                                                <BarChart data={asset.hourly}>
                                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => formatMetricValue(v, assetMetric)} />
                                                                    <Tooltip
                                                                        cursor={{ fill: '#f1f5f9' }}
                                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                                        formatter={(v) => [formatMetricValue(v, assetMetric), assetMetric.charAt(0).toUpperCase() + assetMetric.slice(1)]}
                                                                    />
                                                                    <Bar dataKey={assetMetric} fill={getMetricColor(assetMetric)} radius={[4, 4, 0, 0]} />
                                                                </BarChart>
                                                            )}
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const MeasurementReportWrapper = () => (
    <ErrorBoundary>
        <MeasurementReport />
    </ErrorBoundary>
);

export default MeasurementReportWrapper;
