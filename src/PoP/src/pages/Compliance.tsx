import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    Info,
    ChevronRight,
    Search,
    ShieldCheck,
    Calendar,
    MapPin,
    Eye,
    Filter
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { billboardsData } from "@/data/billboards";

// Import sample images
import popImage1 from "@/assets/pop_samples/uploaded_image_0_1764345134801.jpg";
import popImage2 from "@/assets/pop_samples/uploaded_image_1_1764345134801.jpg";
import popImage3 from "@/assets/pop_samples/uploaded_image_2_1764345134801.png";
import popImage4 from "@/assets/pop_samples/uploaded_image_3_1764345134801.jpg";
import popImage5 from "@/assets/pop_samples/uploaded_image_4_1764345134801.jpg";

const POP_IMAGES = [popImage1, popImage2, popImage3, popImage4, popImage5];

// --- Mock Data Generation ---

// Helper to generate dates
const getDates = (days = 14) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates.reverse();
};

const DATES = getDates(10);

// Mock Campaigns based on Nigerian billboards (IDs 143-157)
const NIGERIAN_BILLBOARDS = billboardsData.filter(b => b.id >= 143 && b.id <= 157);

const MOCK_CAMPAIGNS = [
    {
        id: 1,
        name: "Jumia Black Friday 2024",
        status: "Active",
        complianceScore: 98.5,
        inventoryIds: [143, 144, 145, 146, 147, 148, 149, 150],
        startDate: "2024-11-01",
        endDate: "2024-11-30"
    },
    {
        id: 2,
        name: "Glo Unlimited Data",
        status: "Active",
        complianceScore: 88.2,
        inventoryIds: [148, 149, 150, 151, 152, 153],
        startDate: "2024-10-15",
        endDate: "2024-12-15"
    },
    {
        id: 3,
        name: "Access Bank 'More Than Banking'",
        status: "Active",
        complianceScore: 72.4,
        inventoryIds: [153, 154, 155, 156, 157, 143],
        startDate: "2024-11-10",
        endDate: "2025-01-10"
    },
    {
        id: 4,
        name: "MTN 5G Launch",
        status: "Completed",
        complianceScore: 95.0,
        inventoryIds: [143, 145, 148, 150, 157, 144, 146],
        startDate: "2024-09-01",
        endDate: "2024-10-31"
    }
];

// Generate daily status for each inventory in each campaign
const generateDailyStatus = (campaignId: number, inventoryId: number) => {
    const statusMap: Record<string, 'verified' | 'failed' | 'pending'> = {};

    // Deterministic seed for inventory-level behavior
    const inventorySeed = (campaignId * 1000 + inventoryId) % 100;

    // Determine inventory "reliability" type based on seed
    // 70% chance of being Perfect (Fully Verified)
    // 25% chance of being Good (Partially Verified - 1 or 2 fails)
    // 5% chance of being Bad (Not Verified or mostly failed)
    let reliabilityType = 'perfect';
    if (inventorySeed > 70) reliabilityType = 'good';
    if (inventorySeed > 95) reliabilityType = 'bad';

    // Adjust reliability slightly based on campaign to create variation
    if (campaignId === 3) { // Access Bank - slightly less perfect
        if (inventorySeed > 50) reliabilityType = 'good';
        if (inventorySeed > 90) reliabilityType = 'bad';
    }

    DATES.forEach((date, index) => {
        // Deterministic random for daily status
        const daySeed = (campaignId * 1000 + inventoryId * 100 + index) % 100;

        if (reliabilityType === 'perfect') {
            // 100% verified
            statusMap[date] = 'verified';
        } else if (reliabilityType === 'good') {
            // Mostly verified, occasional fail (e.g., if seed < 20)
            statusMap[date] = daySeed > 20 ? 'verified' : 'failed';
        } else {
            // Bad inventory - mostly failed or mixed
            statusMap[date] = daySeed > 80 ? 'verified' : 'failed';
        }

        // Make recent days pending for active campaigns only (simulate real-time lag)
        // Reduced lag to just 1 day or none for better demo visuals if preferred, 
        // but keeping index > 8 (last 1 day) as pending is realistic.
        if (campaignId !== 4 && index > 8) statusMap[date] = 'pending';
    });

    return statusMap;
};

// --- Components ---

const ComplianceScorecard = ({ campaign, inventories, dailyData }: any) => {
    // Calculate metrics
    let fullyVerified = 0;
    let partiallyVerified = 0;
    let notVerified = 0;

    inventories.forEach((inv: any) => {
        const statuses = Object.values(dailyData[inv.id] || {});
        // Filter out pending for calculation
        const activeStatuses = statuses.filter((s: any) => s !== 'pending');
        const verifiedCount = activeStatuses.filter((s: any) => s === 'verified').length;
        const totalActiveDays = activeStatuses.length;

        if (totalActiveDays === 0) {
            // If no data yet, count as not verified or handle separately
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="shadow-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Inventories</p>
                    <p className="text-3xl font-bold">{inventories.length}</p>
                </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-success">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        Fully Verified
                        <CheckCircle2 className="h-3 w-3 text-success" />
                    </p>
                    <p className="text-3xl font-bold text-success">{fullyVerified}</p>
                </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-warning">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center relative">
                    <div className="absolute top-2 right-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground/50" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">Partially means that only some days of the overall campaign has been validated</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        Partially Verified
                        <AlertCircle className="h-3 w-3 text-warning" />
                    </p>
                    <p className="text-3xl font-bold text-warning">{partiallyVerified}</p>
                </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-destructive">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        Not Verified
                        <XCircle className="h-3 w-3 text-destructive" />
                    </p>
                    <p className="text-3xl font-bold text-destructive">{notVerified}</p>
                </CardContent>
            </Card>
        </div>
    );
};

const Compliance = () => {
    const [selectedCampaignId, setSelectedCampaignId] = useState<number>(MOCK_CAMPAIGNS[0].id);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Active");
    const [showPoPModal, setShowPoPModal] = useState(false);
    const [selectedPoP, setSelectedPoP] = useState<{ date: string, inventory: string, image: string } | null>(null);

    const selectedCampaign = useMemo(() =>
        MOCK_CAMPAIGNS.find(c => c.id === selectedCampaignId),
        [selectedCampaignId]
    );

    const campaignInventories = useMemo(() => {
        if (!selectedCampaign) return [];
        return NIGERIAN_BILLBOARDS.filter(b => selectedCampaign.inventoryIds.includes(b.id));
    }, [selectedCampaign]);

    const dailyData = useMemo(() => {
        if (!selectedCampaign) return {};
        const data: Record<number, any> = {};
        campaignInventories.forEach(inv => {
            data[inv.id] = generateDailyStatus(selectedCampaign.id, inv.id);
        });
        return data;
    }, [selectedCampaign, campaignInventories]);

    const filteredCampaigns = MOCK_CAMPAIGNS.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handlePoPClick = (date: string, inventory: any) => {
        // Pick a random image from the samples based on inventory ID
        const imageIndex = (inventory.id + date.length) % POP_IMAGES.length;
        setSelectedPoP({
            date,
            inventory: inventory.name,
            image: POP_IMAGES[imageIndex]
        });
        setShowPoPModal(true);
    };

    return (
        <AppLayout>
            <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
                {/* Left Sidebar - Campaign List */}
                <div className="w-80 border-r bg-card flex flex-col">
                    <div className="p-4 border-b space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                Compliance
                            </h2>
                        </div>

                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Filter Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Campaigns</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search campaigns..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-3 space-y-2">
                            {filteredCampaigns.map(campaign => (
                                <button
                                    key={campaign.id}
                                    onClick={() => setSelectedCampaignId(campaign.id)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors border ${selectedCampaignId === campaign.id
                                        ? "bg-primary/5 border-primary/20"
                                        : "hover:bg-muted/50 border-transparent"
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium text-sm line-clamp-1">{campaign.name}</span>
                                        <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'} className="text-[10px] h-5">
                                            {campaign.status}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                                        <span>{campaign.inventoryIds.length} Inventories</span>
                                        <div className="flex items-center gap-1">
                                            <span className={`font-medium ${campaign.complianceScore >= 90 ? 'text-success' :
                                                campaign.complianceScore >= 70 ? 'text-warning' : 'text-destructive'
                                                }`}>
                                                {campaign.complianceScore}%
                                            </span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger onClick={(e) => e.stopPropagation()}>
                                                        <Info className="h-3 w-3 text-muted-foreground/50" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="text-xs">Score based on verified playouts vs expected</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {filteredCampaigns.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground text-sm">
                                    No campaigns found
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto bg-muted/10">
                    {selectedCampaign ? (
                        <div className="p-6 space-y-6">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-2xl font-bold">{selectedCampaign.name}</h1>
                                        <Badge variant="outline" className="text-sm">
                                            {selectedCampaign.complianceScore}% Compliance
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {selectedCampaign.startDate} — {selectedCampaign.endDate}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            Nigeria Region
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Scorecard */}
                            <ComplianceScorecard
                                campaign={selectedCampaign}
                                inventories={campaignInventories}
                                dailyData={dailyData}
                            />

                            {/* Inventory Grid */}
                            <Card className="shadow-card">
                                <CardHeader>
                                    <CardTitle>Daily Proof of Play Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[300px]">Inventory Details</th>
                                                    {DATES.map(date => (
                                                        <th key={date} className="text-center py-3 px-2 font-medium text-muted-foreground min-w-[60px]">
                                                            {date.split('-').slice(1).join('/')}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {campaignInventories.map(inventory => (
                                                    <tr key={inventory.id} className="border-b last:border-0 hover:bg-muted/30">
                                                        <td className="py-3 px-4">
                                                            <div className="font-medium">{inventory.name}</div>
                                                            <div className="text-xs text-muted-foreground">{inventory.mediaOwner}</div>
                                                            <div className="text-xs text-muted-foreground mt-0.5">{inventory.type}</div>
                                                        </td>
                                                        {DATES.map(date => {
                                                            const status = dailyData[inventory.id]?.[date];
                                                            return (
                                                                <td key={date} className="text-center py-3 px-2">
                                                                    <div className="flex justify-center">
                                                                        {status === 'verified' && (
                                                                            <button
                                                                                onClick={() => handlePoPClick(date, inventory)}
                                                                                className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center hover:bg-success/20 transition-colors group"
                                                                            >
                                                                                <CheckCircle2 className="h-5 w-5 text-success" />
                                                                            </button>
                                                                        )}
                                                                        {status === 'failed' && (
                                                                            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                                                                                <XCircle className="h-5 w-5 text-destructive" />
                                                                            </div>
                                                                        )}
                                                                        {status === 'pending' && (
                                                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                                                <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                            Select a campaign to view compliance details
                        </div>
                    )}
                </div>
            </div>

            {/* PoP Preview Modal */}
            <Dialog open={showPoPModal} onOpenChange={setShowPoPModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Proof of Play Verification</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center overflow-hidden relative">
                            {selectedPoP?.image && (
                                <img
                                    src={selectedPoP.image}
                                    alt="PoP Evidence"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                Verified by Camera 02
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Inventory</p>
                                <p className="font-medium">{selectedPoP?.inventory}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Date Verified</p>
                                <p className="font-medium">{selectedPoP?.date}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Time</p>
                                <p className="font-medium">14:32:45 UTC+1</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Status</p>
                                <Badge variant="default" className="bg-success hover:bg-success">Verified</Badge>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

export default Compliance;
