import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MOCK_BILLBOARDS, MALAYSIA_POIS } from '../../data/mockData';

// Custom concentration icons
const createConcentrationIcon = (tier, isSelected) => {
    const color = tier === 'High' ? '#10b981' : tier === 'Medium' ? '#f59e0b' : '#94a3b8';
    const size = isSelected ? 30 : 24;

    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
            background-color: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            font-weight: bold;
            ${isSelected ? 'transform: scale(1.2);' : ''}
        ">
            ${isSelected ? '✓' : ''}
        </div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
    });
};

const poiIcon = (poi) => L.divIcon({
    className: 'poi-div-icon',
    html: `<div style="font-size: 18px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5))">${poi.icon}</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

// Component to fly to location when selected
const MapFlyTo = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 13);
    }, [center, map]);
    return null;
};

const InventoryMap = ({ billboards = MOCK_BILLBOARDS, onSelect, selectedIds = [] }) => {
    const center = { lat: 3.147271, lng: 101.699535 }; // KL Center

    return (
        <div className="rounded-lg overflow-hidden border border-slate-700 shadow-xl relative z-0" style={{ height: '100%', width: '100%' }}>
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Dark mode filter for map tiles */}
                <style>
                    {`
                .leaflet-layer {
                    filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
                }
                .custom-div-icon {
                    background: none !important;
                    border: none !important;
                }
                .poi-div-icon {
                    background: none !important;
                    border: none !important;
                }
            `}
                </style>

                {/* POI Layer */}
                {MALAYSIA_POIS.map(poi => (
                    <Marker
                        key={poi.id}
                        position={[poi.lat, poi.lng]}
                        icon={poiIcon(poi)}
                    >
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px' }}>{poi.icon}</div>
                                <h4 style={{ fontWeight: 'bold' }}>{poi.name}</h4>
                                <p style={{ fontSize: '12px', color: '#64748b' }}>{poi.type}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Billboard Layer */}
                {billboards.map(billboard => {
                    const isSelected = selectedIds.includes(billboard.id);
                    const tier = billboard.concentrationTier || 'Low';

                    return (
                        <Marker
                            key={billboard.id}
                            position={[billboard.lat, billboard.lng]}
                            icon={createConcentrationIcon(tier, isSelected)}
                            eventHandlers={{
                                click: () => onSelect && onSelect(billboard.id),
                            }}
                        >
                            <Popup>
                                <div className="min-w-[220px]">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg">{billboard.name}</h3>
                                        {isSelected && <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Selected</span>}
                                    </div>
                                    <p className="text-sm text-gray-600">{billboard.address}</p>

                                    <div style={{
                                        marginTop: '8px',
                                        padding: '8px',
                                        background: '#f8fafc',
                                        borderRadius: '8px',
                                        border: `1px solid ${tier === 'High' ? '#10b981' : tier === 'Medium' ? '#f59e0b' : '#e2e8f0'}`
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Concentration Match:</span>
                                            <span style={{
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                color: tier === 'High' ? '#10b981' : tier === 'Medium' ? '#f59e0b' : '#94a3b8'
                                            }}>{(billboard.concentrationScore * 100).toFixed(0)}%</span>
                                        </div>
                                    </div>

                                    <div className="mt-3 pt-2 border-t border-gray-100">
                                        <button
                                            className={`w-full py-2 text-xs font-bold rounded ${isSelected ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-600 text-white'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelect && onSelect(billboard.id);
                                            }}
                                        >
                                            {isSelected ? 'Remove from Plan' : 'Add to Plan'}
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                <MapFlyTo center={[center.lat, center.lng]} />
            </MapContainer>

            <div className="absolute bottom-4 right-4 bg-slate-800/90 p-3 rounded-lg backdrop-blur-md border border-slate-600 z-[1000] text-[10px] text-slate-300">
                <p className="font-bold mb-2 uppercase opacity-50">Marker Legend</p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} /> High Match
                    </div>
                    <div className="flex items-center gap-2">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} /> Medium Match
                    </div>
                    <div className="flex items-center gap-2">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }} /> Low Match
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryMap;
