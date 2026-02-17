import React, { useMemo } from 'react';
import { MOCK_BILLBOARDS, MOCK_POP_LOGS, MOCK_CAMPAIGN_ID } from '../../data/mockData';
import ComplianceCard from './ComplianceCard';
import { BarChart3, ShieldCheck, AlertTriangle } from 'lucide-react';

const ComplianceDashboard = () => {
    // Aggregate logs by inventory
    const inventoryLogs = useMemo(() => {
        const logsByInv = {};
        MOCK_POP_LOGS.forEach(log => {
            if (!logsByInv[log.inventoryId]) {
                logsByInv[log.inventoryId] = [];
            }
            logsByInv[log.inventoryId].push(log);
        });
        return logsByInv;
    }, []);

    // Calculate Overall Campaign Health
    const totalLogs = MOCK_POP_LOGS.length;
    const successfulLogs = MOCK_POP_LOGS.filter(l => l.status === 'Success').length;
    const campaignHealth = Math.round((successfulLogs / totalLogs) * 100);

    // Inventories participating in this campaign (filtered from mocks)
    const participatingInventories = MOCK_BILLBOARDS.filter(b => inventoryLogs[b.id]);

    return (
        <div className="p-6 bg-slate-950 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Proof of Play Compliance</h1>
                        <p className="text-slate-400">Campaign ID: <span className="font-mono text-blue-400">{MOCK_CAMPAIGN_ID}</span></p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs uppercase font-bold">Campaign Health</p>
                                <p className="text-2xl font-bold text-white">{campaignHealth}%</p>
                            </div>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs uppercase font-bold">Total Playouts</p>
                                <p className="text-2xl font-bold text-white">{successfulLogs.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters / Status Bar */}
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <AlertTriangle size={16} />
                    <span>Showing {participatingInventories.length} active inventories requiring validation.</span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {participatingInventories.map(inventory => (
                        <ComplianceCard
                            key={inventory.id}
                            inventory={inventory}
                            logs={inventoryLogs[inventory.id] || []}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ComplianceDashboard;
