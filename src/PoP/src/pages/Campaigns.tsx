import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, DollarSign, TrendingUp, CheckCircle2, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns } from "@/contexts/CampaignContext";
import { useBillboards } from "@/contexts/BillboardContext";

const Campaigns = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { campaigns, updateCampaign, deleteCampaign } = useCampaigns();
  const { billboards } = useBillboards();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  const handleStatusChange = (id: number, newStatus: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      updateCampaign({ ...campaign, status: newStatus });
      toast({
        title: "Status Updated",
        description: "Campaign status has been updated successfully.",
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteCampaign(id);
    toast({
      title: "Campaign Deleted",
      description: "The campaign has been removed successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Completed": return "bg-muted text-muted-foreground";
      case "Planned": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  // Calculate scorecard metrics
  const metrics = {
    completed: campaigns.filter(c => c.status === "Completed").length,
    active: campaigns.filter(c => c.status === "Active").length,
    planned: campaigns.filter(c => c.status === "Planned").length,
    totalInventories: campaigns.reduce((sum, c) => sum + c.billboardIds.length, 0),
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalRevenue: campaigns.reduce((sum, c) => sum + c.revenue, 0),
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all advertising campaigns
            </p>
          </div>

          <Button
            className="bg-gradient-primary hover:opacity-90"
            onClick={() => navigate("/campaigns/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Scorecards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="shadow-card border-l-4 border-l-success">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold mt-1">{metrics.active}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-chart-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold mt-1">{metrics.completed}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-warning">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Planned</p>
                  <p className="text-2xl font-bold mt-1">{metrics.planned}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inventories</p>
                  <p className="text-2xl font-bold mt-1">{metrics.totalInventories}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-chart-3">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold mt-1">${(metrics.totalBudget / 1000).toFixed(0)}K</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-chart-3/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-chart-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-chart-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">${(metrics.totalRevenue / 1000).toFixed(0)}K</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-chart-1/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Tabs */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <Tabs defaultValue="active" className="w-full" onValueChange={(value) => setStatusFilter(value)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="active">
                  Active ({campaigns.filter(c => c.status === "Active").length})
                </TabsTrigger>
                <TabsTrigger value="planned">
                  Planned ({campaigns.filter(c => c.status === "Planned").length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({campaigns.filter(c => c.status === "Completed").length})
                </TabsTrigger>
              </TabsList>

              {/* Active Campaigns Tab */}
              <TabsContent value="active" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Billboards</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.filter(c => c.status === "Active" && c.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No active campaigns found
                          </TableCell>
                        </TableRow>
                      ) : (
                        campaigns
                          .filter(c => c.status === "Active" && c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((campaign) => (
                            <TableRow key={campaign.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="font-medium">{campaign.name}</TableCell>
                              <TableCell>{campaign.billboardIds.length}</TableCell>
                              <TableCell>{campaign.startDate}</TableCell>
                              <TableCell>{campaign.endDate}</TableCell>
                              <TableCell>
                                <Select
                                  value={campaign.status}
                                  onValueChange={(value) => handleStatusChange(campaign.id, value)}
                                >
                                  <SelectTrigger className="w-[130px] h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Planned">Planned</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate(`/campaigns/new?edit=${campaign.id}`)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(campaign.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Planned Campaigns Tab */}
              <TabsContent value="planned" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Billboards</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.filter(c => c.status === "Planned" && c.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No planned campaigns found
                          </TableCell>
                        </TableRow>
                      ) : (
                        campaigns
                          .filter(c => c.status === "Planned" && c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((campaign) => (
                            <TableRow key={campaign.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="font-medium">{campaign.name}</TableCell>
                              <TableCell>{campaign.billboardIds.length}</TableCell>
                              <TableCell>{campaign.startDate}</TableCell>
                              <TableCell>{campaign.endDate}</TableCell>
                              <TableCell>
                                <Select
                                  value={campaign.status}
                                  onValueChange={(value) => handleStatusChange(campaign.id, value)}
                                >
                                  <SelectTrigger className="w-[130px] h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Planned">Planned</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate(`/campaigns/new?edit=${campaign.id}`)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(campaign.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Completed Campaigns Tab */}
              <TabsContent value="completed" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Billboards</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.filter(c => c.status === "Completed" && c.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No completed campaigns found
                          </TableCell>
                        </TableRow>
                      ) : (
                        campaigns
                          .filter(c => c.status === "Completed" && c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((campaign) => (
                            <TableRow key={campaign.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="font-medium">{campaign.name}</TableCell>
                              <TableCell>{campaign.billboardIds.length}</TableCell>
                              <TableCell>{campaign.startDate}</TableCell>
                              <TableCell>{campaign.endDate}</TableCell>
                              <TableCell>
                                <Select
                                  value={campaign.status}
                                  onValueChange={(value) => handleStatusChange(campaign.id, value)}
                                >
                                  <SelectTrigger className="w-[130px] h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Planned">Planned</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate(`/campaigns/new?edit=${campaign.id}`)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(campaign.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Campaigns;
