import React, { useState } from 'react';
import { INVENTORY, AVAILABILITY_DATA } from '../../data/mockData';
import { usePersona, PERSONAS } from '../../context/PersonaContext';
import BillboardImage from '../ui/BillboardImage';
import { Search, Filter, MapPin, Grid, List, X, Calendar, Clock, TrendingUp, Users, DollarSign, Layers, Info, ChevronRight, CheckCircle2, AlertCircle, UploadCloud, FileSpreadsheet } from 'lucide-react';

const InventoryList = () => {
    const { persona } = usePersona();

    // We need local state for inventory now so we can add to it via bulk upload
    const [localInventory, setLocalInventory] = useState(INVENTORY);

    const [view, setView] = useState('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBillboard, setSelectedBillboard] = useState(null);
    const [availabilityView, setAvailabilityView] = useState('daily');

    // Bulk Upload Modal State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success'

    const filteredInventory = localInventory.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const closeModal = () => setSelectedBillboard(null);

    // --- BULK UPLOAD HANDLERS ---
    const handleFileUpload = (e) => {
        // Prevent default behavior if dragged/dropped
        if (e) e.preventDefault();

        setUploadStatus('uploading');

        // Simulate network parsing time
        setTimeout(() => {
            // Create mock parsed data
            const newBillboards = [
                {
                    id: `bulk_${Date.now()}_1`,
                    name: 'Third Mainland Bridge LED North',
                    location: 'Third Mainland Bridge',
                    city: 'Lagos',
                    type: 'LED',
                    dailyImpressions: 450000,
                    baseCPM: 6500,
                    utilisation: 0,
                    status: 'Active',
                    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=600'
                },
                {
                    id: `bulk_${Date.now()}_2`,
                    name: 'Abuja Airport Road Static',
                    location: 'Airport Expressway',
                    city: 'Abuja',
                    type: 'Static',
                    dailyImpressions: 120000,
                    baseCPM: 3200,
                    utilisation: 0,
                    status: 'Active',
                    image: 'https://images.unsplash.com/photo-1559814421-2a106f212265?auto=format&fit=crop&q=80&w=600'
                }
            ];

            setLocalInventory(prev => [...newBillboards, ...prev]);
            setUploadStatus('success');

            // Close modal after showing success message briefly
            setTimeout(() => {
                setIsUploadModalOpen(false);
                setUploadStatus('idle');
            }, 2000);

        }, 1500);
    };

    const AvailabilityCalendar = ({ billboardId }) => {
        const data = AVAILABILITY_DATA[billboardId] || { blocked: [], hourly: [] };

        if (availabilityView === 'daily') {
            const days = Array.from({ length: 28 }, (_, i) => {
                const date = new Date(2026, 1, i + 1);
                const dateStr = date.toISOString().split('T')[0];
                return { date: dateStr, day: i + 1, isBlocked: data.blocked.includes(dateStr) };
            });

            return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginTop: '12px' }}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} style={{ textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: 'var(--text-muted)', paddingBottom: '4px' }}>{d}</div>
                    ))}
                    {days.map(d => (
                        <div
                            key={d.day}
                            style={{
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                borderRadius: '4px',
                                border: '1px solid #f1f5f9',
                                background: d.isBlocked ? '#fee2e2' : '#f0fdf4',
                                color: d.isBlocked ? '#991b1b' : '#166534',
                                cursor: 'default'
                            }}
                            title={d.isBlocked ? 'Blocked / Booked' : 'Available'}
                        >
                            {d.day}
                        </div>
                    ))}
                </div>
            );
        }

        if (availabilityView === 'hourly') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    {(data.hourly.length > 0 ? data.hourly : [
                        { hour: '08:00', slots: 6, blocked: 2 },
                        { hour: '12:00', slots: 6, blocked: 1 },
                        { hour: '18:00', slots: 6, blocked: 5 }
                    ]).map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '11px', fontWeight: '600', width: '40px' }}>{h.hour}</span>
                            <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ width: `${(h.blocked / h.slots) * 100}%`, height: '100%', background: '#ef4444' }}></div>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{h.slots - h.blocked} free</span>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                {['Feb 2026', 'Mar 2026', 'Apr 2026'].map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600' }}>{m}</span>
                        <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '20px', background: i === 0 ? '#ffedd5' : '#dcfce7', color: i === 0 ? '#9a3412' : '#166534' }}>
                            {i === 0 ? 'High Demand' : 'Available'}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Inventory Registry</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Explore and manage billboards across the network.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {/* Only show bulk upload to Media Owners */}
                    {persona === PERSONAS.MEDIA_OWNER && (
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}
                        >
                            <UploadCloud size={16} /> Bulk Upload CSV
                        </button>
                    )}

                    <div className="view-toggle" style={{ background: '#f1f5f9', padding: '4px', borderRadius: '8px', display: 'flex' }}>
                        <button
                            onClick={() => setView('table')}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: view === 'table' ? 'white' : 'transparent', color: view === 'table' ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', boxShadow: view === 'table' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                        >
                            <List size={16} /> Table
                        </button>
                        <button
                            onClick={() => setView('grid')}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: view === 'grid' ? 'white' : 'transparent', color: view === 'grid' ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', boxShadow: view === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                        >
                            <Grid size={16} /> Grid
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ position: 'relative', marginBottom: '24px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="Search by billboard name, location or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '10px', border: '1px solid var(--border)', fontSize: '14px', outline: 'none' }}
                />
            </div>

            {view === 'table' ? (
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                            <tr>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Billboard Image & Name</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>City</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Type</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Imps / Day</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Base CPM</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Utilisation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map(item => (
                                <tr
                                    key={item.id}
                                    onClick={() => setSelectedBillboard(item)}
                                    style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                                    className="hover-row"
                                >
                                    <td style={{ padding: '12px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <BillboardImage src={item.image} alt="" style={{ width: '48px', height: '32px', borderRadius: '4px' }} />
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 20px', fontSize: '13px' }}>{item.city}</td>
                                    <td style={{ padding: '12px 20px' }}>
                                        <span className={`badge ${item.type === 'LED' || item.type === 'Digital' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '10px' }}>{item.type}</span>
                                    </td>
                                    <td style={{ padding: '12px 20px', textAlign: 'right', fontSize: '13px' }}>{(item.dailyImpressions / 1000).toFixed(0)}k</td>
                                    <td style={{ padding: '12px 20px', textAlign: 'right', fontSize: '13px', fontWeight: '600' }}>₦ {item.baseCPM.toLocaleString()}</td>
                                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.utilisation}%</span>
                                            <div style={{ width: '40px', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}>
                                                <div style={{ width: `${item.utilisation}%`, height: '100%', background: item.utilisation > 80 ? 'var(--success)' : 'var(--primary)', borderRadius: '2px' }}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                    {filteredInventory.map(item => (
                        <div key={item.id} className="card" style={{ padding: '0', cursor: 'pointer', overflow: 'hidden' }} onClick={() => setSelectedBillboard(item)}>
                            <BillboardImage src={item.image} alt="" style={{ width: '100%', height: '140px' }} />
                            <div style={{ padding: '16px' }}>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>{item.name}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '11px', marginBottom: '12px' }}>
                                    <MapPin size={12} /> {item.city}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className={`badge ${item.type === 'LED' || item.type === 'Digital' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '10px' }}>{item.type}</span>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.utilisation}% Util.</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Detail Drawer */}
            {selectedBillboard && (
                <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }} onClick={closeModal}>
                    <div style={{ width: '500px', background: 'white', height: '100%', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ position: 'relative' }}>
                            <BillboardImage src={selectedBillboard.image} alt="" style={{ width: '100%', height: '250px' }} />
                            <button onClick={closeModal} style={{ position: 'absolute', top: '16px', right: '16px', borderRadius: '50%', background: 'white', border: 'none', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ padding: '32px' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{selectedBillboard.name}</h2>
                                    <span className={`badge ${selectedBillboard.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{selectedBillboard.status}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '14px' }}>
                                    <MapPin size={16} /> {selectedBillboard.location}, {selectedBillboard.city}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Daily Impressions</span>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>{selectedBillboard.dailyImpressions.toLocaleString()}</div>
                                </div>
                                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Base CPM</span>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>₦ {selectedBillboard.baseCPM.toLocaleString()}</div>
                                </div>
                            </div>

                            {/* AVAILABILITY CALENDAR */}
                            <div style={{ marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Calendar size={18} className="text-blue-500" /> Availability View
                                    </h3>
                                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '2px', borderRadius: '6px' }}>
                                        <button onClick={() => setAvailabilityView('hourly')} style={{ padding: '4px 8px', fontSize: '11px', border: 'none', background: availabilityView === 'hourly' ? 'white' : 'transparent', borderRadius: '4px', cursor: 'pointer' }}>Hourly</button>
                                        <button onClick={() => setAvailabilityView('daily')} style={{ padding: '4px 8px', fontSize: '11px', border: 'none', background: availabilityView === 'daily' ? 'white' : 'transparent', borderRadius: '4px', cursor: 'pointer' }}>Daily</button>
                                        <button onClick={() => setAvailabilityView('monthly')} style={{ padding: '4px 8px', fontSize: '11px', border: 'none', background: availabilityView === 'monthly' ? 'white' : 'transparent', borderRadius: '4px', cursor: 'pointer' }}>Monthly</button>
                                    </div>
                                </div>
                                <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '12px' }}>
                                    <AvailabilityCalendar billboardId={selectedBillboard.id} />
                                </div>
                            </div>

                            {/* Intelligence Breakdown */}
                            <div style={{ marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TrendingUp size={18} className="text-blue-500" /> Audience Insights
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '13px' }}>Reach Index</span>
                                        <span style={{ fontWeight: 'bold' }}>High (94/100)</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '13px' }}>Frequency Score</span>
                                        <span style={{ fontWeight: 'bold' }}>1.8x / Campaign</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '13px' }}>Dominant Segment</span>
                                        <span style={{ fontWeight: 'bold' }}>Office Commuters</span>
                                    </div>
                                </div>
                            </div>

                            {persona === PERSONAS.AGENCY ? (
                                <button className="btn-primary" style={{ width: '100%', padding: '14px' }}>Add to Plan</button>
                            ) : (
                                <button className="btn-outline" style={{ width: '100%', padding: '14px' }}>Manage Slots</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- BULK UPLOAD MODAL --- */}
            {isUploadModalOpen && (
                <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setIsUploadModalOpen(false)}>
                    <div style={{ width: '500px', background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} onClick={e => e.stopPropagation()}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Bulk Inventory Upload</h2>
                            <button onClick={() => setIsUploadModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>
                                <X size={20} />
                            </button>
                        </div>

                        {uploadStatus === 'idle' && (
                            <>
                                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                                    Upload a CSV or Excel file containing your network registry. Required columns: Name, Lat, Long, Type, Address, Base CPM.
                                </p>

                                <div
                                    style={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '8px',
                                        padding: '48px 24px',
                                        textAlign: 'center',
                                        backgroundColor: '#f8fafc',
                                        marginBottom: '24px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                >
                                    <input
                                        type="file"
                                        id="csv-upload"
                                        accept=".csv, .xlsx"
                                        style={{ display: 'none' }}
                                        onChange={handleFileUpload}
                                    />
                                    <label htmlFor="csv-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#4f46e5' }}>
                                            <FileSpreadsheet size={24} />
                                        </div>
                                        <span style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>Click to upload or drag and drop</span>
                                        <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>CSV, XLS, XLSX (Max 10MB)</span>
                                    </label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <a href="#" style={{ fontSize: '12px', color: '#2563eb', textDecoration: 'none' }}>Download Template</a>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button onClick={() => setIsUploadModalOpen(false)} style={{ padding: '8px 16px', border: '1px solid #cbd5e1', background: 'white', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
                                        <button onClick={() => handleFileUpload()} style={{ padding: '8px 16px', border: 'none', background: '#2563eb', color: 'white', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>Simulate Upload</button>
                                    </div>
                                </div>
                            </>
                        )}

                        {uploadStatus === 'uploading' && (
                            <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#2563eb', borderRadius: '50%', margin: '0 auto 24px auto', animation: 'spin 1s linear infinite' }}></div>
                                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Parsing Registry...</h3>
                                <p style={{ fontSize: '13px', color: '#64748b' }}>Extracting coordinates and formatting data.</p>
                            </div>
                        )}

                        {uploadStatus === 'success' && (
                            <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', color: '#16a34a' }}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#0f172a' }}>Upload Successful</h3>
                                <p style={{ fontSize: '13px', color: '#64748b' }}>2 new locations have been mapped and added to your registry.</p>
                            </div>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
};

export default InventoryList;