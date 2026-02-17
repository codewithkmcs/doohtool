import React from 'react';
import { AUDIENCE_SEGMENTS } from '../../data/mockData';
import { Monitor, Users, Briefcase, Zap } from 'lucide-react';

const AudienceFilter = ({ selectedSegment, onSelectSegment }) => {

    // Group segments by category
    const categories = {
        'Demographics': AUDIENCE_SEGMENTS.filter(s => s.category === 'Demographics'),
        'Interests': AUDIENCE_SEGMENTS.filter(s => s.category === 'Interests'),
        'Behavior': AUDIENCE_SEGMENTS.filter(s => s.category === 'Behavior'),
    };

    const getIcon = (cat) => {
        switch (cat) {
            case 'Demographics': return <Users size={16} />;
            case 'Interests': return <Zap size={16} />;
            case 'Behavior': return <Briefcase size={16} />;
            default: return <Monitor size={16} />;
        }
    };

    return (
        <div className="h-full bg-slate-900 border-r border-slate-700 flex flex-col w-80">
            <div className="p-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Monitor className="text-blue-500" />
                    Audience Layers
                </h2>
                <p className="text-slate-400 text-xs mt-1">Select a segment to filter map</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {Object.entries(categories).map(([category, segments]) => (
                    <div key={category}>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            {getIcon(category)} {category}
                        </h3>
                        <div className="space-y-2">
                            {segments.map(segment => {
                                const isSelected = selectedSegment?.id === segment.id;
                                return (
                                    <button
                                        key={segment.id}
                                        onClick={() => onSelectSegment(isSelected ? null : segment)}
                                        className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm flex items-center justify-between group ${isSelected
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                            }`}
                                    >
                                        <span className="truncate">{segment.name}</span>
                                        <div
                                            className={`w-2 h-2 rounded-full transition-transform ${isSelected ? 'scale-125' : 'scale-100 group-hover:scale-110'}`}
                                            style={{ backgroundColor: segment.color }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {selectedSegment && (
                <div className="p-4 border-t border-slate-700 bg-slate-800/50">
                    <button
                        onClick={() => onSelectSegment(null)}
                        className="w-full py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-md transition-colors"
                    >
                        Clear Selection
                    </button>
                </div>
            )}
        </div>
    );
};

export default AudienceFilter;
