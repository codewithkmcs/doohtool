import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBillboards } from "@/contexts/BillboardContext";
import { useCampaigns } from "@/contexts/CampaignContext";
import type { Campaign } from "@/data/campaigns";

const CampaignCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { billboards } = useBillboards();
  const { campaigns, addCampaign, updateCampaign } = useCampaigns();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  
  const [campaignName, setCampaignName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Planned");
  const [selectedBillboards, setSelectedBillboards] = useState<number[]>([]);

  useEffect(() => {
    if (editId) {
      const campaign = campaigns.find(c => c.id === Number(editId));
      if (campaign) {
        setCampaignName(campaign.name);
        setStartDate(campaign.startDate);
        setEndDate(campaign.endDate);
        setStatus(campaign.status);
        setSelectedBillboards(campaign.billboardIds);
      }
    }
  }, [editId, campaigns]);

  const handleBillboardToggle = (id: number) => {
    setSelectedBillboards(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName || !startDate || !endDate || selectedBillboards.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and select at least one billboard.",
        variant: "destructive",
      });
      return;
    }

    const campaignData: Campaign = {
      id: editId ? Number(editId) : Date.now(),
      name: campaignName,
      startDate,
      endDate,
      status,
      billboardIds: selectedBillboards,
    };

    if (editId) {
      updateCampaign(campaignData);
    } else {
      addCampaign(campaignData);
    }

    toast({
      title: editId ? "Campaign Updated" : "Campaign Created",
      description: `${campaignName} has been successfully ${editId ? 'updated' : 'created'} with ${selectedBillboards.length} billboards.`,
    });

    setTimeout(() => navigate("/campaigns"), 1500);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/campaigns")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {editId ? "Edit Campaign" : "Create New Campaign"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {editId ? "Update campaign details" : "Set up a new advertising campaign"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Summer Brand Launch"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planned">Planned</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Select Billboards * ({selectedBillboards.length} selected)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {billboards.map((billboard) => (
                      <div
                        key={billboard.id}
                        className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <Checkbox
                          id={`billboard-${billboard.id}`}
                          checked={selectedBillboards.includes(billboard.id)}
                          onCheckedChange={() => handleBillboardToggle(billboard.id)}
                        />
                        <img 
                          src={billboard.image} 
                          alt={billboard.name} 
                          className="w-16 h-10 object-cover rounded"
                        />
                        <label
                          htmlFor={`billboard-${billboard.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <p className="font-medium">{billboard.name}</p>
                          <p className="text-sm text-muted-foreground">{billboard.mediaOwner} • {billboard.address}</p>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-card sticky top-6">
                <CardHeader>
                  <CardTitle>Campaign Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Campaign Name</p>
                    <p className="font-semibold">{campaignName || "—"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">
                      {startDate && endDate
                        ? `${startDate} to ${endDate}`
                        : "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold">{status}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Selected Billboards</p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedBillboards.length}
                    </p>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      {editId ? "Update Campaign" : "Create Campaign"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/campaigns")}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CampaignCreate;
