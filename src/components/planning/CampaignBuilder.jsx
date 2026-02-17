import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { INVENTORY } from '../../data/mockData';
import { useCampaigns } from '../../context/CampaignContext';
import { usePersona } from '../../context/PersonaContext';
import BillboardImage from '../ui/BillboardImage';
import InventoryMap from '../map/InventoryMap';
import {
    Calendar, Tag, Target as TargetIcon, BarChart as BarChartIcon,
    ChevronRight, CheckCircle2, Info, Plus, Layers, DollarSign,
    MousePointer2, Monitor, Download, FileText, Search, Sparkles, Filter,
    Clock, MapPin, ChevronDown, Trash2, Edit2, Maximize2, Minimize2, Map as MapIcon,
    AlertCircle, ShieldCheck, Shield
} from 'lucide-react';
import { AUDIENCE_SEGMENTS as MALAYSIA_SEGMENTS, POP_DATES, generateDailyPoPStatus } from '../../data/mockData';

const CampaignBuilder = () => {
    const navigate = useNavigate();
    const { addCampaign } = useCampaigns();
    const { user } = usePersona();
    const [step, setStep] = useState(1);
    const [basics, setBasics] = useState({
        name: 'Grab Raya Blitz 2026',
        brand: 'Grab Malaysia',
        goal: 'Brand Awareness',
        type: 'Digital',
        startDate: '2026-03-01',
        endDate: '2026-03-31',
        budget: '50000',
        buyingModel: 'Traditional'
    });

    const [selectedSegments, setSelectedSegments] = useState(["income_t20"]);
    const [isMapExpanded, setIsMapExpanded] = useState(false);

    // Concentration Logic: Calculate scores for all inventory based on selected segments
    const inventoryWithScores = useMemo(() => {
        return INVENTORY.map(item => {
            let score = 0;
            if (selectedSegments.length === 0) return { ...item, concentrationScore: 0 };

            // Mock scoring based on audience segments
            selectedSegments.forEach(segId => {
                if (item.audienceIndex && item.audienceIndex[segId]) {
                    // Convert index (50-200) to a normalized 0-1 contribution
                    score += (item.audienceIndex[segId] / 200);
                }
            });

            const normalizedScore = Math.min(score / selectedSegments.length, 1.0);

            return {
                ...item,
                concentrationScore: normalizedScore,
                concentrationTier: normalizedScore >= 0.8 ? 'High' : normalizedScore >= 0.5 ? 'Medium' : 'Low'
            };
        }).sort((a, b) => b.concentrationScore - a.concentrationScore);
    }, [selectedSegments]);

    const [selectedIds, setSelectedIds] = useState(['billboard_1', 'billboard_2', 'billboard_3']);

    const [schedules, setSchedules] = useState({
        'billboard_1': [{ id: 1, startDate: '2026-06-01', endDate: '2026-06-30', days: [1, 2, 3, 4, 5], type: 'Loop', spotsPerHour: 60 }],
        'billboard_2': [{ id: 1, startDate: '2026-06-01', endDate: '2026-06-30', days: [1, 2, 3, 4, 5], type: 'Loop', spotsPerHour: 60 }],
        'billboard_3': [{ id: 1, startDate: '2026-06-01', endDate: '2026-06-30', days: [1, 2, 3, 4, 5], type: 'Loop', spotsPerHour: 60 }]
    });

    // Sync schedules with selectedIds: ensure every selected ID has a default schedule
    useEffect(() => {
        setSchedules(prev => {
            const next = { ...prev };
            let changed = false;
            selectedIds.forEach(id => {
                if (!next[id]) {
                    next[id] = [{
                        id: Date.now() + Math.random(),
                        startDate: basics.startDate,
                        endDate: basics.endDate,
                        days: [1, 2, 3, 4, 5],
                        type: 'Loop',
                        spotsPerHour: 60
                    }];
                    changed = true;
                }
            });
            return changed ? next : prev;
        });
    }, [selectedIds, basics.startDate, basics.endDate]);

    const [inventorySearch, setInventorySearch] = useState('');
    const [filterRecommended, setFilterRecommended] = useState(false);

    const selectedItems = INVENTORY.filter(inv => selectedIds.includes(inv.id));

    const filteredInventory = inventoryWithScores.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
            item.city.toLowerCase().includes(inventorySearch.toLowerCase());
        if (filterRecommended) return matchesSearch && item.recommended;
        return matchesSearch;
    });

    const reachData = useMemo(() => {
        const data = [];
        const totalPotentialImp = selectedItems.length > 0 ? selectedItems.reduce((acc, curr) => acc + curr.dailyImpressions, 0) : 100000;

        for (let day = 1; day <= 30; day++) {
            const reach = totalPotentialImp * (1 - Math.exp(-0.15 * day)) * 0.8;
            const impressions = totalPotentialImp * day;

            data.push({
                day,
                reach: Math.floor(reach),
                impressions: Math.floor(impressions)
            });
        }
        return data;
    }, [selectedItems]);

    const totalSteps = 5;

    const handleConfirm = () => {
        const newCampaign = {
            id: `camp-${Date.now()}`,
            name: basics.name,
            brand: basics.brand,
            agency: user?.company || 'Internal Agency',
            status: 'Booked',
            startDate: basics.startDate,
            endDate: basics.endDate,
            type: basics.type,
            budget: parseInt(basics.budget),
            impressions: reachData[29].impressions,
            reach: reachData[29].reach,
            duration: '31 Days',
            assets: selectedItems.map(item => ({
                id: item.id,
                name: item.name,
                impressions: item.impressions,
                schedule: schedules[item.id]
            }))
        };

        addCampaign(newCampaign);
        navigate('/campaigns');
    };

    const toggleDay = (siteId, scheduleId, dayIndex) => {
        const siteSchedules = [...schedules[siteId]];
        const scheduleIndex = siteSchedules.findIndex(s => s.id === scheduleId);
        const currentDays = siteSchedules[scheduleIndex].days;

        const newDays = currentDays.includes(dayIndex)
            ? currentDays.filter(d => d !== dayIndex)
            : [...currentDays, dayIndex].sort();

        siteSchedules[scheduleIndex] = { ...siteSchedules[scheduleIndex], days: newDays };
        setSchedules({ ...schedules, [siteId]: siteSchedules });
    };

    const updateScheduleType = (siteId, scheduleId, type) => {
        const siteSchedules = [...schedules[siteId]];
        const scheduleIndex = siteSchedules.findIndex(s => s.id === scheduleId);
        siteSchedules[scheduleIndex] = { ...siteSchedules[scheduleIndex], type };
        setSchedules({ ...schedules, [siteId]: siteSchedules });
    };

    const renderSchedulingStep = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Schedule Strategy</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Scheduling for <b>{selectedIds.length}</b> Sites
                </div>
            </div>

            {selectedItems.map((item) => (
                <div key={item.id} className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <BillboardImage src={item.image} alt="" style={{ width: '40px', height: '30px', borderRadius: '4px' }} />
                            <div>
                                <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</h4>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.city} • {item.type}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Impressions</p>
                                <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.dailyImpressions.toLocaleString()}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Price</p>
                                <p style={{ fontSize: '13px', fontWeight: 'bold' }}>RM {((item.baseCPM || 0) * (item.dailyImpressions || 0) / 1000).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '20px' }}>
                        {(schedules[item.id] || []).map((sched) => (
                            <div key={sched.id} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Select Dates of schedule</label>
                                        <div style={{ position: 'relative' }}>
                                            <Calendar size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                            <input
                                                type="text"
                                                value={`${sched.startDate} - ${sched.endDate}`}
                                                readOnly
                                                className="btn-outline"
                                                style={{ width: '100%', padding: '10px 10px 10px 32px', fontSize: '13px', background: 'white' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Select days of schedule</label>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => toggleDay(item.id, sched.id, idx)}
                                                    style={{
                                                        flex: 1,
                                                        height: '36px',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: '6px',
                                                        background: sched.days.includes(idx) ? 'var(--primary)' : 'white',
                                                        color: sched.days.includes(idx) ? 'white' : 'var(--text-muted)',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Select Schedule Type</label>
                                        <select
                                            className="btn-outline"
                                            value={sched.type}
                                            onChange={(e) => updateScheduleType(item.id, sched.id, e.target.value)}
                                            style={{ width: '100%', padding: '10px', fontSize: '13px', background: 'white' }}
                                        >
                                            <option>Loop</option>
                                            <option>Dayparts</option>
                                            <option>Daypart Groups</option>
                                        </select>
                                    </div>
                                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                        <button className="btn-outline" style={{ fontSize: '12px', padding: '10px 16px', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                                            Add Schedule
                                        </button>
                                        <button className="btn-primary" style={{ fontSize: '13px', padding: '10px 16px' }}>
                                            Update Site
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderProposalPreview = () => (
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '40px', maxWidth: '900px', margin: '0 auto', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #f1f5f9', paddingBottom: '24px', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Campaign Media Plan</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Proposal ID: PROP_2026_{basics.name.toUpperCase().replace(/\s+/g, '_')}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '20px', color: 'var(--primary)' }}>DOOH Hub</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Generated: Feb 07, 2026</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strategic Summary</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13px' }}>Advertiser</span>
                            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{basics.brand}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13px' }}>Objective</span>
                            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{basics.goal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13px' }}>Timeline</span>
                            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{basics.startDate} - {basics.endDate}</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Investment Snapshot</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13px' }}>Total Net Budget</span>
                            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>RM {parseInt(basics.budget).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13px' }}>Buying Model</span>
                            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{basics.buyingModel}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13px' }}>Total Impact (Forecast)</span>
                            <span style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--success)' }}>{(reachData[29].impressions / 1000000).toFixed(2)}M Imps</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>Detailed Media Schedule</h4>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr>
                                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Site & Location</th>
                                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Play Dates</th>
                                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Play Days</th>
                                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Type</th>
                                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Impression Forecast</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.map(item => {
                                const sched = (schedules[item.id] || [])[0] || {};
                                const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                                return (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.city}</div>
                                        </td>
                                        <td style={{ padding: '16px 20px', fontSize: '13px' }}>{sched.startDate} - {sched.endDate}</td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ display: 'flex', gap: '2px' }}>
                                                {dayLabels.map((l, i) => (
                                                    <span key={i} style={{ fontSize: '10px', width: '18px', textAlign: 'center', color: sched.days?.includes(i) ? 'var(--primary)' : '#cbd5e1', fontWeight: sched.days?.includes(i) ? 'bold' : 'normal' }}>{l}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>{sched.type}</span>
                                        </td>
                                        <td style={{ padding: '16px 20px', fontSize: '13px', textAlign: 'right', fontWeight: 'bold' }}>{item.dailyImpressions.toLocaleString()} / day</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ padding: '24px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Sparkles size={18} className="text-blue-600" />
                    <h5 style={{ fontSize: '14px', fontWeight: 'bold' }}>AI Optimization Recommendation</h5>
                </div>
                <p style={{ fontSize: '13px', color: '#1d4ed8', lineHeight: '1.6' }}>
                    We recommend shifting 15% of the budget from "Bukit Bintang Pillar Wrap" to "KL Sentral Mega LED" during peak morning hours (08:00 - 10:00) to maximize reach among office commuters. This adjustment is forecasted to increase total unique reach by **8.4%**.
                </p>
            </div>
        </div>
    );

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Campaign Planner & Scheduler</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Define goals, select prime inventory, and configure granular playback schedules.</p>
                </div>
                {step === 5 && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={18} /> Edit Plan
                        </button>
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => alert('Proposal Media Plan Shared!')}>
                            <Download size={18} /> Share Media Plan (PDF)
                        </button>
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: step === 5 ? '1fr' : 'minmax(0, 1fr) 350px', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Step Indicators */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    height: '4px',
                                    borderRadius: '2px',
                                    background: step > i ? 'var(--primary)' : 'var(--border)',
                                    transition: 'background 0.3s'
                                }}
                            />
                        ))}
                    </div>

                    <div className="card" style={{ minHeight: '500px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
                            {step === 1 ? '1. Campaign Configuration' :
                                step === 2 ? '2. Site Selection' :
                                    step === 3 ? '3. Playback Scheduling' :
                                        step === 4 ? '4. Forecast & Strategy' :
                                            '5. Media Plan Generation'}
                        </h3>

                        {step === 1 && (
                            <>
                                <div className="form-group" style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Target Audience Segments</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '200px', overflowY: 'auto', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        {MALAYSIA_SEGMENTS.map(segment => (
                                            <button
                                                key={segment.id}
                                                type="button"
                                                onClick={() => setSelectedSegments(prev => prev.includes(segment.id) ? prev.filter(s => s !== segment.id) : [...prev, segment.id])}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    border: `1px solid ${selectedSegments.includes(segment.id) ? 'var(--primary)' : '#e2e8f0'}`,
                                                    background: selectedSegments.includes(segment.id) ? 'var(--primary)' : 'white',
                                                    color: selectedSegments.includes(segment.id) ? 'white' : '#64748b',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}
                                            >
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: segment.color }} />
                                                {segment.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Campaign Name</label>
                                        <input
                                            type="text"
                                            value={basics.name}
                                            onChange={(e) => setBasics({ ...basics, name: e.target.value })}
                                            className="btn-outline"
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Brand / Advertiser</label>
                                        <input
                                            type="text"
                                            value={basics.brand}
                                            onChange={(e) => setBasics({ ...basics, brand: e.target.value })}
                                            className="btn-outline"
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Budget (RM)</label>
                                        <input
                                            type="number"
                                            value={basics.budget}
                                            onChange={(e) => setBasics({ ...basics, budget: e.target.value })}
                                            className="btn-outline"
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Start Date</label>
                                        <input type="date" value={basics.startDate} onChange={(e) => setBasics({ ...basics, startDate: e.target.value })} className="btn-outline" style={{ width: '100%', padding: '12px', borderRadius: '8px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>End Date</label>
                                        <input type="date" value={basics.endDate} onChange={(e) => setBasics({ ...basics, endDate: e.target.value })} className="btn-outline" style={{ width: '100%', padding: '12px', borderRadius: '8px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Buying Model</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => setBasics({ ...basics, buyingModel: 'Traditional' })}
                                                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: basics.buyingModel === 'Traditional' ? '#eff6ff' : 'white', color: basics.buyingModel === 'Traditional' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', cursor: 'pointer' }}
                                            >Traditional</button>
                                            <button
                                                onClick={() => setBasics({ ...basics, buyingModel: 'Programmatic' })}
                                                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: basics.buyingModel === 'Programmatic' ? '#eff6ff' : 'white', color: basics.buyingModel === 'Programmatic' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', cursor: 'pointer' }}
                                            >Programmatic</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Objective</label>
                                        <select className="btn-outline" value={basics.goal} onChange={(e) => setBasics({ ...basics, goal: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px' }}>
                                            <option>Brand Awareness</option>
                                            <option>Product Consideration</option>
                                            <option>Retail Footfall</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 1fr', gap: '24px', height: '700px' }}>
                                    {/* Audience Sidebar */}
                                    <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '16px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
                                        <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audience Segments</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {MALAYSIA_SEGMENTS.map(segment => (
                                                <button
                                                    key={segment.id}
                                                    onClick={() => setSelectedSegments(prev => prev.includes(segment.id) ? prev.filter(s => s !== segment.id) : [...prev, segment.id])}
                                                    style={{
                                                        padding: '10px 12px',
                                                        borderRadius: '8px',
                                                        fontSize: '13px',
                                                        textAlign: 'left',
                                                        border: `1px solid ${selectedSegments.includes(segment.id) ? 'var(--primary)' : 'transparent'}`,
                                                        background: selectedSegments.includes(segment.id) ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                                                        color: selectedSegments.includes(segment.id) ? 'var(--primary)' : 'var(--text-main)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: segment.color, flexShrink: 0 }} />
                                                    <span style={{ fontWeight: selectedSegments.includes(segment.id) ? '600' : '400' }}>{segment.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Inventory List */}
                                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                            <div style={{ flex: 1, position: 'relative' }}>
                                                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                                <input
                                                    type="text"
                                                    placeholder="Search inventory..."
                                                    value={inventorySearch}
                                                    onChange={(e) => setInventorySearch(e.target.value)}
                                                    style={{ width: '100%', padding: '8px 8px 8px 36px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13px' }}
                                                />
                                            </div>
                                            <button
                                                onClick={() => setFilterRecommended(!filterRecommended)}
                                                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: filterRecommended ? '#eff6ff' : 'white', color: filterRecommended ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer' }}
                                            >
                                                <Sparkles size={16} />
                                            </button>
                                        </div>

                                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
                                            {filteredInventory.map(item => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => setSelectedIds(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])}
                                                    style={{
                                                        padding: '12px',
                                                        borderRadius: '10px',
                                                        border: `1px solid ${selectedIds.includes(item.id) ? 'var(--primary)' : '#e2e8f0'}`,
                                                        background: selectedIds.includes(item.id) ? 'rgba(37, 99, 235, 0.05)' : 'white',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '8px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                        <BillboardImage src={item.image} alt="" style={{ width: '50px', height: '35px', borderRadius: '4px', flexShrink: 0 }} />
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <p style={{ fontWeight: '600', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                                                            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.city} • RM {item.baseCPM} CPM</p>
                                                        </div>
                                                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selectedIds.includes(item.id) ? 'var(--primary)' : 'transparent', borderColor: selectedIds.includes(item.id) ? 'var(--primary)' : '#e2e8f0' }}>
                                                            {selectedIds.includes(item.id) && <CheckCircle2 size={10} color="white" />}
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '4px',
                                                            fontSize: '10px',
                                                            fontWeight: 'bold',
                                                            color: item.concentrationTier === 'High' ? '#10b981' : item.concentrationTier === 'Medium' ? '#f59e0b' : '#94a3b8',
                                                            background: item.concentrationTier === 'High' ? 'rgba(16, 185, 129, 0.1)' : item.concentrationTier === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                                            padding: '2px 8px',
                                                            borderRadius: '4px'
                                                        }}>
                                                            <Sparkles size={10} />
                                                            {item.concentrationTier} Match ({(item.concentrationScore * 100).toFixed(0)}%)
                                                        </div>
                                                        {item.recommended && <span style={{ fontSize: '9px', background: '#dcfce7', color: '#166534', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold' }}>AI CHOICE</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Map Column */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                                        <div
                                            style={{
                                                position: 'relative',
                                                height: isMapExpanded ? '600px' : '450px',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                border: '1px solid #e2e8f0',
                                                transition: 'height 0.3s ease'
                                            }}
                                        >
                                            <InventoryMap
                                                selectedIds={selectedIds}
                                                onSelect={(id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id])}
                                            />
                                            <button
                                                onClick={() => setIsMapExpanded(!isMapExpanded)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    right: '12px',
                                                    background: 'white',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '6px',
                                                    padding: '6px',
                                                    cursor: 'pointer',
                                                    zIndex: 10,
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}
                                            >
                                                {isMapExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && renderSchedulingStep()}

                        {step === 4 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <BarChartIcon size={20} className="text-blue-600" />
                                            <span style={{ fontWeight: 'bold' }}>Reach Growth Forecast</span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Efficiency: <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>+12%</span></div>
                                    </div>
                                    <div style={{ height: '260px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={reachData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                                <Tooltip formatter={(val) => val.toLocaleString()} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                                                <Area type="monotone" dataKey="reach" stroke="var(--primary)" strokeWidth={2} fill="var(--primary)" fillOpacity={0.1} name="Unique Reach" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="card shadow-none border bg-slate-50">
                                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>Forecasting Insights</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                        With your current schedule of <b>5 days per week</b>, you are projected to reach **1.8 Million** unique individuals. Peak saturation is expected by Day 22. Your CPM is optimized at **RM 12.40**, which is 15% below the market average for luxury retail areas.
                                    </p>
                                </div>
                            </div>
                        )}

                        {step === 5 && renderProposalPreview()}

                        <div
                            style={{
                                position: 'fixed',
                                bottom: '24px',
                                right: '24px',
                                left: '300px', // Offset for sidebar
                                background: 'white',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                padding: '16px 24px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
                                zIndex: 100
                            }}
                        >
                            <button
                                className="btn-outline"
                                onClick={() => setStep(step - 1)}
                                disabled={step === 1}
                                style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                            >Back</button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                {step < 4 && (
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assets</p>
                                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{selectedIds.length} Selected</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Est. Budget</p>
                                            <p style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary)' }}>RM {parseInt(basics.budget).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                                <button
                                    className="btn-primary"
                                    onClick={() => step < totalSteps ? setStep(step + 1) : handleConfirm()}
                                    style={{ padding: '10px 24px', borderRadius: '8px' }}
                                >
                                    {step === 4 ? 'Generate Media Plan' : step === 5 ? 'Confirm Media Plan' : 'Continue'} <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {step < 5 && (
                    <div style={{ position: 'sticky', top: '24px', height: 'fit-content' }}>
                        <div className="card" style={{ background: '#0f172a', color: 'white', border: 'none' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '24px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plan Estimation</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>Impact (Imps)</p>
                                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{(reachData[29].impressions / 1000000).toFixed(1)}M</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>Unique Reach</p>
                                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{(reachData[29].reach / 1000000).toFixed(1)}M</p>
                                    </div>
                                </div>

                                <div>
                                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>Asset Coverage</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Monitor size={15} className="text-blue-400" />
                                        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{selectedIds.length} Premium Sites</p>
                                    </div>
                                </div>

                                <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>Planned Budget</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 'bold' }}>RM</span>
                                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>{parseInt(basics.budget).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', fontSize: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ opacity: 0.5 }}>Model:</span>
                                            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{basics.buyingModel}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ opacity: 0.5 }}>Strategy:</span>
                                            <span style={{ fontWeight: 'bold' }}>{basics.goal}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignBuilder;
