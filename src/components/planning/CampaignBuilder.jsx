import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '../../context/CampaignContext';
import { usePersona } from '../../context/PersonaContext';
import { INVENTORY } from '../../data/mockData';
import BillboardImage from '../ui/BillboardImage';
import InventoryMap from '../map/InventoryMap';
import {
    Users, MapPin, ChevronDown, X, Target, Info, Download, FileText,
    ChevronRight, Check, Monitor, Activity, Calendar, Tag, Search, Sparkles, ShoppingCart, ArrowLeft, Plus, Clock, ListFilter
} from 'lucide-react';

const IAB_SEGMENTS = [
    { id: 'iab-1', name: 'Automotive' }, { id: 'iab-2', name: 'Business and Finance' },
    { id: 'iab-3', name: 'Food & Drink' }, { id: 'iab-4', name: 'Technology & Computing' },
    { id: 'iab-5', name: 'Travel' }, { id: 'iab-6', name: 'Health & Fitness' }
];

const CampaignBuilder = () => {
    const navigate = useNavigate();
    const { addCampaign } = useCampaigns();
    const { user } = usePersona();
    const [step, setStep] = useState(1);

    // --- STEP 1 STATE: BASICS & AUDIENCE (RESTORED TO LOCKED PERFECTION) ---
    const [basics, setBasics] = useState({
        name: 'MTN 5G Nationwide Rollout', brand: 'MTN Nigeria', goal: 'Brand Awareness',
        budget: '50000', buyingModel: 'Traditional', startDate: '2026-03-01', endDate: '2026-03-31'
    });
    const [selectedSegments, setSelectedSegments] = useState(['Automotive']);
    const [selectedGenders, setSelectedGenders] = useState(['Male', 'Female']);
    const [selectedAges, setSelectedAges] = useState(['Adults']);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // --- STEP 2 STATE: INVENTORY ---
    const [selectedIds, setSelectedIds] = useState([]);
    const [inventorySearch, setInventorySearch] = useState('');
    const [filterType, setFilterType] = useState('All');

    // --- STEP 3 STATE: SCHEDULING ---
    const [schedules, setSchedules] = useState({});

    const selectedItems = useMemo(() =>
        INVENTORY.filter(inv => selectedIds.includes(inv.id)),
        [selectedIds]);

    useEffect(() => {
        setSchedules(prev => {
            const next = { ...prev };
            selectedIds.forEach(id => {
                if (!next[id]) {
                    next[id] = { type: 'Loop', spots: 60, days: [1, 2, 3, 4, 5], timeSlots: 'Full Day' };
                }
            });
            return next;
        });
    }, [selectedIds]);

    // --- LOGIC: HIGH-DENSITY TABULATION ---
    const scoredInventory = useMemo(() => {
        if (!INVENTORY) return [];
        return INVENTORY.map(item => {
            const seed = (item.id.length * 9 + selectedSegments.length * 17) % 100;
            return { ...item, matchScore: seed, estImpressions: Math.floor(item.dailyImpressions * 30) };
        }).sort((a, b) => b.matchScore - a.matchScore);
    }, [selectedSegments]);

    const filteredInventory = scoredInventory.filter(item =>
        item.name.toLowerCase().includes(inventorySearch.toLowerCase()) &&
        (filterType === 'All' || item.type === filterType)
    );

    const toggleArrayItem = (setter, currentArray, item) => {
        setter(currentArray.includes(item) ? currentArray.filter(i => i !== item) : [...currentArray, item]);
    };

    const toggleId = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

    const updateSchedule = (id, key, val) => {
        setSchedules(prev => ({ ...prev, [id]: { ...prev[id], [key]: val } }));
    };

    const toggleDay = (id, dayIndex) => {
        const currentDays = schedules[id]?.days || [];
        const nextDays = currentDays.includes(dayIndex)
            ? currentDays.filter(d => d !== dayIndex)
            : [...currentDays, dayIndex].sort();
        updateSchedule(id, 'days', nextDays);
    };

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleFinalConfirm = () => {
        const finalCampaign = {
            ...basics,
            id: `cmp-${Date.now()}`,
            assets: selectedItems,
            status: 'Booked',
            createdAt: new Date().toISOString()
        };
        addCampaign(finalCampaign);
        navigate('/campaigns');
    };

    return (
        <div style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto', paddingBottom: '120px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Campaign Planner</h1>
                    <p style={{ color: '#64748b' }}>Step {step}: {step === 1 ? 'Targeting & Basics' : step === 2 ? 'Inventory Selection' : step === 3 ? 'Scheduling' : 'Proposal Review'}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ width: '40px', height: '6px', borderRadius: '3px', background: step >= i ? '#2563eb' : '#e2e8f0', transition: '0.3s' }} />
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
                <div className="card" style={{ padding: '0', minHeight: '650px', background: 'white', overflow: step === 1 ? 'visible' : 'hidden', zIndex: step === 1 ? 10 : 1 }}>

                    {/* STEP 1: RESTORED 1:1 TO ORIGINAL LOCKED LAYOUT */}
                    {step === 1 && (
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <section>
                                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '20px', textTransform: 'uppercase' }}>1. Campaign Basics</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>CAMPAIGN NAME</label>
                                        <input type="text" value={basics.name} onChange={e => setBasics({ ...basics, name: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>BRAND</label>
                                        <input type="text" value={basics.brand} onChange={e => setBasics({ ...basics, brand: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>CAMPAIGN GOAL</label>
                                        <select value={basics.goal} onChange={e => setBasics({ ...basics, goal: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                                            <option>Brand Awareness</option><option>Product Consideration</option><option>Retail Footfall</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>BUDGET (₦)</label>
                                        <input type="number" value={basics.budget} onChange={e => setBasics({ ...basics, budget: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>BUYING MODEL</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {['Traditional', 'Programmatic'].map(m => (
                                                <button key={m} onClick={() => setBasics({ ...basics, buyingModel: m })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '600', background: basics.buyingModel === m ? '#eff6ff' : 'white', color: basics.buyingModel === m ? '#2563eb' : '#64748b' }}>{m}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>START DATE</label>
                                        <input type="date" value={basics.startDate} onChange={e => setBasics({ ...basics, startDate: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>END DATE</label>
                                        <input type="date" value={basics.endDate} onChange={e => setBasics({ ...basics, endDate: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                </div>
                            </section>
                            <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '32px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '20px', textTransform: 'uppercase' }}>2. Audience Targeting</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <button onClick={() => setActiveDropdown(activeDropdown === 'iab' ? null : 'iab')} style={{ width: '100%', padding: '12px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={16} color="#6366f1" /> IAB Segments</span>
                                            <ChevronDown size={14} color="#94a3b8" />
                                        </button>
                                        {activeDropdown === 'iab' && (
                                            <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '8px', zIndex: 1000, maxHeight: '250px', overflowY: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                                {IAB_SEGMENTS.map(s => (
                                                    <div key={s.id} onClick={() => toggleArrayItem(setSelectedSegments, selectedSegments, s.name)} style={{ padding: '10px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', background: selectedSegments.includes(s.name) ? '#f5f3ff' : 'white' }}>
                                                        <div style={{ width: '18px', height: '18px', border: '1px solid #cbd5e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selectedSegments.includes(s.name) ? '#6366f1' : 'white' }}>
                                                            {selectedSegments.includes(s.name) && <Check size={14} color="white" />}
                                                        </div>
                                                        {s.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <button onClick={() => setActiveDropdown(activeDropdown === 'demo' ? null : 'demo')} style={{ width: '100%', padding: '12px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="#ec4899" /> Demographics</span>
                                            <ChevronDown size={14} color="#94a3b8" />
                                        </button>
                                        {activeDropdown === 'demo' && (
                                            <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '8px', zIndex: 1000, padding: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                                                <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase' }}>Gender</p>
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                                                    {['Male', 'Female'].map(g => (
                                                        <button key={g} onClick={() => toggleArrayItem(setSelectedGenders, selectedGenders, g)} style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: selectedGenders.includes(g) ? '#eff6ff' : 'white', color: selectedGenders.includes(g) ? '#2563eb' : '#64748b', fontWeight: '600' }}>{g}</button>
                                                    ))}
                                                </div>
                                                <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase' }}>Age Group</p>
                                                {['Young Adults', 'Adults', 'Seniors'].map(age => (
                                                    <div key={age} onClick={() => toggleArrayItem(setSelectedAges, selectedAges, age)} style={{ padding: '6px 0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                                        <div style={{ width: '18px', height: '18px', border: '1px solid #cbd5e1', borderRadius: '4px', background: selectedAges.includes(age) ? '#2563eb' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            {selectedAges.includes(age) && <Check size={14} color="white" />}
                                                        </div>{age}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', textAlign: 'left', fontSize: '13px', color: '#94a3b8', cursor: 'default' }}>
                                        <MapPin size={16} inline style={{ marginRight: '8px' }} /> Nigeria (All Regions)
                                    </button>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* STEP 2: HIGH-DENSITY TABULATION */}
                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '16px', background: '#f8fafc', alignItems: 'center' }}>
                                <button onClick={handleBack} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#64748b' }}>
                                    <ArrowLeft size={18} />
                                </button>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                                    <input type="text" placeholder="Search 500+ Lagos inventory items..." value={inventorySearch} onChange={e => setInventorySearch(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                                </div>
                            </div>
                            <div style={{ overflowY: 'auto', flex: 1 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 5 }}>
                                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                            <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', color: '#64748b' }}>ASSET</th>
                                            <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', color: '#64748b' }}>TYPE</th>
                                            <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', color: '#64748b' }}>MATCH</th>
                                            <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', color: '#64748b' }}>COST</th>
                                            <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>ADD</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInventory.map(item => (
                                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', background: selectedIds.includes(item.id) ? '#eff6ff' : 'white' }}>
                                                <td style={{ padding: '12px 24px' }}>
                                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                        <BillboardImage src={item.image} style={{ width: '40px', height: '30px', borderRadius: '4px' }} />
                                                        <div><p style={{ fontWeight: 'bold', fontSize: '13px', margin: 0 }}>{item.name}</p><p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{item.city}</p></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '12px 24px', fontSize: '12px' }}>{item.type}</td>
                                                <td style={{ padding: '12px 24px' }}>
                                                    <div style={{ width: '60px', background: '#f1f5f9', height: '4px', borderRadius: '2px', marginBottom: '4px' }}>
                                                        <div style={{ width: `${item.matchScore}%`, background: '#10b981', height: '100%' }} />
                                                    </div>
                                                    <span style={{ fontSize: '10px' }}>{item.matchScore}% Match</span>
                                                </td>
                                                <td style={{ padding: '12px 24px', fontSize: '13px', fontWeight: 'bold' }}>₦ {item.baseCPM.toLocaleString()}</td>
                                                <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                                                    <button onClick={() => toggleId(item.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                                        {selectedIds.includes(item.id) ? <Check size={20} color="#2563eb" /> : <Plus size={20} color="#cbd5e1" />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: SCHEDULING STRATEGY */}
                    {step === 3 && (
                        <div style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <button onClick={handleBack} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>
                                    <ArrowLeft size={20} />
                                </button>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Scheduling Configuration ({selectedItems.length} Assets)</h3>
                            </div>
                            <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                                {selectedItems.map(item => (
                                    <div key={item.id} style={{ border: '1px solid #f1f5f9', borderRadius: '12px', padding: '20px', marginBottom: '16px', background: 'white' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                                            <BillboardImage src={item.image} style={{ width: '60px', height: '40px', borderRadius: '4px' }} />
                                            <div><p style={{ fontWeight: 'bold', margin: 0 }}>{item.name}</p><p style={{ fontSize: '11px', color: '#94a3b8' }}>{item.city}</p></div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '8px' }}>SCHEDULE MODE</label>
                                                <select
                                                    value={schedules[item.id]?.type}
                                                    onChange={(e) => updateSchedule(item.id, 'type', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}
                                                >
                                                    <option value="Loop">Loop</option>
                                                    <option value="Dayparting">Dayparting</option>
                                                    <option value="Fixed Spots">Fixed Spots</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '8px' }}>ACTIVE DAYS</label>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => toggleDay(item.id, i)}
                                                            style={{
                                                                flex: 1, textAlign: 'center', padding: '10px 0',
                                                                border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px',
                                                                background: schedules[item.id]?.days.includes(i) ? '#2563eb' : 'white',
                                                                color: schedules[item.id]?.days.includes(i) ? 'white' : '#64748b',
                                                                fontWeight: schedules[item.id]?.days.includes(i) ? 'bold' : '500',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            {d}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 4: PROPOSAL ONE-PAGER REVIEW */}
                    {step === 4 && (
                        <div style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <button onClick={handleBack} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>
                                    <ArrowLeft size={20} />
                                </button>
                                <h2 style={{ fontSize: '24px', fontWeight: '900', margin: 0 }}>Campaign One-Pager Review</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
                                        <div><p style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>GOAL</p><p style={{ fontWeight: '900' }}>{basics.goal}</p></div>
                                        <div><p style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>BUDGET</p><p style={{ fontWeight: '900' }}>₦ {parseInt(basics.budget).toLocaleString()}</p></div>
                                        <div><p style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>TARGET AUDIENCE</p><p style={{ fontWeight: '900' }}>{selectedSegments[0]}</p></div>
                                        <div><p style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>ASSET COUNT</p><p style={{ fontWeight: '900' }}>{selectedItems.length} Sites</p></div>
                                    </div>

                                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '16px' }}>Media Schedule</h3>
                                    <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
                                        {selectedItems.map(item => (
                                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                                                <div><p style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</p><p style={{ fontSize: '12px', color: '#94a3b8' }}>{item.city}</p></div>
                                                <div style={{ textAlign: 'right' }}><p style={{ fontWeight: 'bold', fontSize: '12px' }}>{schedules[item.id]?.type}</p><p style={{ fontSize: '11px', color: '#2563eb' }}>{schedules[item.id]?.days.length} Active Days</p></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {/* MALAYSIA MAP SECTION REMOVED HERE PER INSTRUCTION */}
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button className="btn-outline" style={{ flex: 1, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Download size={18} /> PPTX</button>
                                        <button className="btn-outline" style={{ flex: 1, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Download size={18} /> PDF</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- CONSOLIDATED PREVIEW SIDEBAR --- */}
                <div style={{ position: 'sticky', top: '32px', height: 'fit-content' }}>
                    <div className="card" style={{ background: '#0f172a', color: 'white', padding: '28px', borderRadius: '24px' }}>
                        <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '24px' }}>Plan Estimation</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <div><p style={{ fontSize: '10px', opacity: 0.4 }}>EST. IMPACT</p><p style={{ fontSize: '24px', fontWeight: 'bold' }}>7.7M</p></div>
                            <div style={{ textAlign: 'right' }}><p style={{ fontSize: '10px', opacity: 0.4 }}>REACH</p><p style={{ fontSize: '24px', fontWeight: 'bold' }}>1.2M</p></div>
                        </div>

                        {/* FIXED: REAL-TIME FEEDBACK LOOP FOR TARGET PROFILE RESTORED */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '20px' }}>
                            <p style={{ fontSize: '10px', opacity: 0.4, marginBottom: '12px', textTransform: 'uppercase' }}>Target Profile</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {selectedSegments.map(s => <span key={s} style={{ fontSize: '10px', background: '#3b82f6', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>{s}</span>)}
                                <span style={{ fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '12px' }}>{selectedGenders.join(' & ')}</span>
                            </div>
                        </div>

                        {selectedItems.length > 0 && (
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '24px' }}>
                                <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>CHOSEN FLIGHT ({selectedItems.length})</p>
                                <div style={{ maxHeight: '150px', overflowY: 'auto', paddingRight: '4px' }}>
                                    {selectedItems.map(item => (
                                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', background: 'rgba(255,255,255,0.05)', padding: '8px 10px', borderRadius: '6px', marginBottom: '6px' }}>
                                            <span style={{ opacity: 0.8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{item.name}</span>
                                            <X size={12} onClick={() => toggleId(item.id)} style={{ cursor: 'pointer', color: '#ef4444' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '32px' }}>
                            <p style={{ fontSize: '10px', opacity: 0.4, marginBottom: '4px' }}>TOTAL BUDGET</p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}><span style={{ color: '#3b82f6', fontSize: '16px' }}>₦</span><span style={{ fontSize: '32px', fontWeight: '900' }}>{parseInt(basics.budget).toLocaleString()}</span></div>
                        </div>

                        <button
                            className="btn-primary"
                            onClick={step === 4 ? handleFinalConfirm : handleNext}
                            style={{ width: '100%', padding: '16px', borderRadius: '14px', fontWeight: 'bold' }}
                        >
                            {step === 3 ? 'Proceed to confirm' : step === 4 ? 'Confirm & Book' : 'Continue'} <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* STICKY ACTION BAR */}
            {step === 2 && (
                <div style={{ position: 'fixed', bottom: '24px', left: '300px', right: '32px', background: 'white', padding: '16px 32px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -10px 40px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 100 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}><ShoppingCart size={22} /></div>
                        <div><p style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedIds.length} Assets Staging</p><p style={{ fontSize: '12px', color: '#64748b' }}>Ready for scheduling</p></div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={handleBack} className="btn-outline">Back</button>
                        <button onClick={handleNext} className="btn-primary" style={{ padding: '12px 32px' }}>Finalize Selection</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignBuilder;