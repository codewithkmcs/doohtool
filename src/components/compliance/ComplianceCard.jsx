import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const ComplianceCard = ({ inventory, logs }) => {
    // Calculate compliance for this inventory
    const daysTracked = 15;
    const successfulLogs = logs.filter(l => l.status === 'Success').length;
    const complianceScore = Math.round((successfulLogs / daysTracked) * 100);

    // Sort logs by date (newest first)
    const sortedLogs = [...logs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Fill in missing days if any (mock logic assumes continuous logs provided or missing means fail)
    // For this visual, we just map the logs we have, assuming they cover the period.

    const getStatusColor = (score) => {
        if (score >= 95) return 'text-emerald-500';
        if (score >= 80) return 'text-amber-500';
        return 'text-rose-500';
    };

    const getStatusBadge = (score) => {
        if (score >= 95) return <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">Validated</span>;
        if (score >= 80) return <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium border border-amber-500/20">Warning</span>;
        return <span className="px-2 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-medium border border-rose-500/20">Issue Detected</span>;
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 shadow-lg flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-white font-semibold truncate w-48" title={inventory.name}>{inventory.name}</h3>
                    <p className="text-slate-400 text-xs">{inventory.id}</p>
                </div>
                {getStatusBadge(complianceScore)}
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Health Score</p>
                    <p className={`text-3xl font-bold ${getStatusColor(complianceScore)}`}>{complianceScore}%</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-400 text-xs">{successfulLogs}/{daysTracked} Days</p>
                </div>
            </div>

            {/* Calendar Strip Visualization */}
            <div className="space-y-2">
                <p className="text-xs text-slate-500">Last 15 Days Performance</p>
                <div className="flex justify-between gap-1">
                    {/* We want to show 15 dots. If logs are missing, we assume failure or just show gray */}
                    {Array.from({ length: 15 }).map((_, i) => {
                        const log = sortedLogs[14 - i]; // Reverse order to show timeline left-to-right (old to new)

                        let StatusIcon = <div className="w-4 h-4 rounded-full bg-slate-700" title="No Data" />;

                        if (log) {
                            if (log.status === 'Success') {
                                StatusIcon = <CheckCircle2 size={16} className="text-emerald-500" />;
                            } else {
                                StatusIcon = <XCircle size={16} className="text-rose-500" />;
                            }
                        }

                        return (
                            <div key={i} className="flex flex-col items-center gap-1">
                                {StatusIcon}
                                {/* Simple tick mark for day, maybe just show date on hover */}
                            </div>
                        );
                    })}
                </div>
            </div>

            {complianceScore < 100 && (
                <div className="mt-2 p-2 bg-rose-500/10 border border-rose-500/20 rounded text-xs text-rose-200 flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{daysTracked - successfulLogs} playback failures detected.</span>
                </div>
            )}
        </div>
    );
};

export default ComplianceCard;
