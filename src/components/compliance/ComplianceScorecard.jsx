import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

const ComplianceScorecard = ({ campaign, inventories, dailyData }) => {
    // Calculate metrics
    let fullyVerified = 0;
    let partiallyVerified = 0;
    let notVerified = 0;

    inventories.forEach(inv => {
        const statuses = Object.values(dailyData[inv.id] || {});
        // Filter out pending for calculation
        const activeStatuses = statuses.filter(s => s !== 'pending');
        const verifiedCount = activeStatuses.filter(s => s === 'verified').length;
        const totalActiveDays = activeStatuses.length;

        if (totalActiveDays === 0) {
            notVerified++;
        } else if (verifiedCount === totalActiveDays) {
            fullyVerified++;
        } else if (verifiedCount > 0) {
            partiallyVerified++;
        } else {
            notVerified++;
        }
    });

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {/* Total Inventories */}
            <div className="card" style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Total Inventories</p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{inventories.length}</p>
            </div>

            {/* Fully Verified */}
            <div className="card" style={{ borderLeft: '4px solid #10b981', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    Fully Verified
                    <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', margin: 0 }}>{fullyVerified}</p>
            </div>

            {/* Partially Verified */}
            <div className="card" style={{ borderLeft: '4px solid #f59e0b', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <Info size={16} style={{ color: '#94a3b8', cursor: 'help' }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '100%',
                            right: 0,
                            marginBottom: '8px',
                            display: 'none',
                            width: '256px',
                            padding: '8px',
                            background: '#1e293b',
                            color: 'white',
                            fontSize: '12px',
                            borderRadius: '6px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            zIndex: 10
                        }} className="tooltip-content">
                            Partially means that only some days of the overall campaign has been validated
                        </div>
                    </div>
                </div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    Partially Verified
                    <AlertCircle size={14} style={{ color: '#f59e0b' }} />
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', margin: 0 }}>{partiallyVerified}</p>
            </div>

            {/* Not Verified */}
            <div className="card" style={{ borderLeft: '4px solid #ef4444', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    Not Verified
                    <XCircle size={14} style={{ color: '#ef4444' }} />
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#ef4444', margin: 0 }}>{notVerified}</p>
            </div>
        </div>
    );
};

export default ComplianceScorecard;
