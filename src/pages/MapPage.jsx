import React, { useState } from 'react';
import InventoryMap from '../components/map/InventoryMap';
import AudienceFilter from '../components/map/AudienceFilter';

const MapPage = () => {
    const [selectedSegment, setSelectedSegment] = useState(null);

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-950">
            <AudienceFilter
                selectedSegment={selectedSegment}
                onSelectSegment={setSelectedSegment}
            />
            <div className="flex-1 relative">
                <InventoryMap selectedSegment={selectedSegment} />
            </div>
        </div>
    );
};

export default MapPage;
