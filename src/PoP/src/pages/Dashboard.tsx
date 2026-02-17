import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, CheckCircle2, Plus, DollarSign, Building2, Download, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBillboards } from "@/contexts/BillboardContext";
import { useCampaigns } from "@/contexts/CampaignContext";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ComposedChart, Area } from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { billboards, updateBillboardStatuses } = useBillboards();
  const { campaigns } = useCampaigns();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Update billboard statuses based on active campaigns
  useEffect(() => {
    const activeCampaigns = campaigns.filter(c => c.status === "Active");
    updateBillboardStatuses(activeCampaigns);
  }, [campaigns, updateBillboardStatuses]);

  const [activeCampaignsPage, setActiveCampaignsPage] = useState(1);
  const [topCampaignsPage, setTopCampaignsPage] = useState(1);
  const [mediaOwnerPage, setMediaOwnerPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Calculate metrics
  const metrics = useMemo(() => {
    const now = new Date();
    const activeCampaigns = campaigns.filter(c => c.status === "Active");
    const plannedCampaigns = campaigns.filter(c => c.status === "Planned");
    const completedCampaigns = campaigns.filter(c => c.status === "Completed");

    // Calculate billboard occupancy based on actual status
    const occupiedBillboards = billboards.filter(b => b.status === "Occupied").length;
    const availableBillboards = billboards.filter(b => b.status === "Available").length;
    const serviceBillboards = billboards.filter(b => b.status === "Needs Service").length;
    const occupancyRate = billboards.length > 0
      ? (occupiedBillboards / billboards.length) * 100
      : 0;

    // Calculate monthly revenue based on actual active campaigns
    const revenuePerCampaign = 5000;
    const monthlyRevenue = activeCampaigns.reduce((sum, campaign) => {
      return sum + (campaign.billboardIds.length * revenuePerCampaign);
    }, 0);

    // Billboard utilization - how many different billboards are used
    const usedBillboardIds = new Set(activeCampaigns.flatMap(c => c.billboardIds));
    const utilizationRate = billboards.length > 0
      ? (usedBillboardIds.size / billboards.length) * 100
      : 0;

    return {
      activeCampaigns: activeCampaigns.length,
      plannedCampaigns: plannedCampaigns.length,
      completedCampaigns: completedCampaigns.length,
      totalBillboards: billboards.length,
      occupancyRate,
      occupiedBillboards,
      availableBillboards,
      serviceBillboards,
      monthlyRevenue,
      utilizationRate,
    };
  }, [billboards, campaigns]);




  // Media Owner Analytics
  const mediaOwnerAnalytics = useMemo(() => {
    // Get unique media owners
    const mediaOwners = Array.from(new Set(billboards.map(b => b.mediaOwner)));

    return mediaOwners.map(owner => {
      const ownerBillboards = billboards.filter(b => b.mediaOwner === owner);
      const totalBillboards = ownerBillboards.length;

      // Calculate compliance (billboards that are not "Needs Service")
      const compliantBillboards = ownerBillboards.filter(b => b.status !== "Needs Service").length;
      const complianceRate = totalBillboards > 0 ? (compliantBillboards / totalBillboards) * 100 : 0;

      // Calculate proof of play (occupied billboards / total billboards)
      const occupiedBillboards = ownerBillboards.filter(b => b.status === "Occupied").length;
      const proofOfPlayRate = totalBillboards > 0 ? (occupiedBillboards / totalBillboards) * 100 : 0;

      // Calculate revenue (based on occupied billboards)
      const revenue = occupiedBillboards * 5000; // Mock revenue per billboard

      return {
        owner,
        totalBillboards,
        compliantBillboards,
        complianceRate,
        occupiedBillboards,
        proofOfPlayRate,
        revenue,
      };
    }).sort((a, b) => b.revenue - a.revenue); // Sort by revenue descending
  }, [billboards]);

  // Campaign Analytics - Proof of Play Verification
  const campaignAnalytics = useMemo(() => {
    const activeCampaigns = campaigns.filter(c => c.status === "Active");

    return activeCampaigns.map(campaign => {
      const campaignBillboards = billboards.filter(b =>
        campaign.billboardIds.includes(b.id)
      );

      const totalInventories = campaignBillboards.length;
      // PoP Verified = Occupied billboards (actively showing content)
      const popVerified = campaignBillboards.filter(b => b.status === "Occupied").length;
      const popUnverified = totalInventories - popVerified;
      const verificationRate = totalInventories > 0 ? (popVerified / totalInventories) * 100 : 0;

      // Calculate revenue based on verified billboards
      const revenue = popVerified * 5000; // $5K per verified billboard

      return {
        id: campaign.id,
        name: campaign.name,
        totalInventories,
        popVerified,
        popUnverified,
        verificationRate,
        revenue,
      };
    });
  }, [campaigns, billboards]);

  // Top 10 Campaigns by Revenue (all statuses)
  const topCampaignsByRevenue = useMemo(() => {
    return campaigns.map(campaign => {
      const campaignBillboards = billboards.filter(b =>
        campaign.billboardIds.includes(b.id)
      );

      const totalInventories = campaignBillboards.length;
      const occupiedBillboards = campaignBillboards.filter(b => b.status === "Occupied").length;
      const revenue = occupiedBillboards * 5000; // $5K per occupied billboard

      return {
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        totalInventories,
        occupiedBillboards,
        revenue,
      };
    })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10); // Top 10
  }, [campaigns, billboards]);



  // Export to PDF
  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const element = dashboardRef.current;
      if (!element) {
        toast.error("Unable to generate PDF");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`dashboard-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);

      toast.success("Dashboard report exported successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsExporting(false);
    }
  };

  // Mock data for Revenue Trend (Jan-Dec 2025)
  const revenueTrendData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, index) => {
      // Base revenue + growth trend + seasonality
      const baseRevenue = 150000;
      const growth = index * 15000;
      const seasonality = Math.sin(index / 2) * 20000;
      const revenue = baseRevenue + growth + seasonality;

      // Campaign count correlates somewhat with revenue
      const campaigns = Math.floor(15 + (index * 1.5) + (Math.random() * 5));

      return {
        month,
        revenue: Math.round(revenue),
        campaigns
      };
    });
  }, []);

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of campaigns, billboards, and performance metrics
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={exportToPDF} disabled={isExporting} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Generating..." : "Export PDF"}
            </Button>
          </div>
        </div>

        {/* Exportable Content */}
        <div ref={dashboardRef} className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card border-l-4 border-l-chart-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Campaigns</p>
                    <p className="text-3xl font-bold mt-2">{metrics.activeCampaigns}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.plannedCampaigns} planned
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center">
                    <Megaphone className="h-6 w-6 text-chart-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-success">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Billboards</p>
                    <p className="text-3xl font-bold mt-2">{metrics.totalBillboards}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.availableBillboards} available
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                    <p className="text-3xl font-bold mt-2">{metrics.occupancyRate.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.occupiedBillboards} occupied
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-chart-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-3xl font-bold mt-2">${(metrics.monthlyRevenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.utilizationRate.toFixed(0)}% utilization
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-chart-2/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-chart-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend Chart */}
          <Card className="shadow-card mb-6">
            <CardHeader>
              <CardTitle>Monthly Revenue & Campaign Trend (2025)</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Revenue growth vs number of active campaigns
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px"
                      }}
                      formatter={(value: number, name: string) => [
                        name === "Revenue" ? `$${(value / 1000).toFixed(1)}k` : value,
                        name
                      ]}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.1}
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="campaigns"
                      name="Campaigns"
                      fill="hsl(var(--chart-2))"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Media Owner Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Proof of Play Compliance by Media Owner */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Proof of Play Compliance by Media Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={mediaOwnerAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="owner"
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px"
                      }}
                      formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
                    />
                    <Legend />
                    <Bar dataKey="complianceRate" fill="hsl(var(--success))" name="Compliance Rate %" />
                    <Bar dataKey="proofOfPlayRate" fill="hsl(var(--primary))" name="Proof of Play %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Compliance:</strong> Billboards in good working condition (not needing service).
                    <strong className="ml-2">Proof of Play:</strong> Billboards currently occupied with active campaigns.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown by Media Owner */}
            <Card className="shadow-card h-full flex flex-col">
              <CardHeader>
                <CardTitle>Revenue Breakdown by Media Owner</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {mediaOwnerAnalytics.slice((mediaOwnerPage - 1) * ITEMS_PER_PAGE, mediaOwnerPage * ITEMS_PER_PAGE).map((owner, idx) => (
                    <div key={owner.owner} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: idx % 3 === 0 ? 'hsl(var(--chart-1))' :
                                idx % 3 === 1 ? 'hsl(var(--chart-2))' :
                                  'hsl(var(--chart-3))'
                            }}
                          />
                          <span className="text-sm font-medium">{owner.owner}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">${(owner.revenue / 1000).toFixed(1)}K</p>
                          <p className="text-xs text-muted-foreground">{owner.occupiedBillboards}/{owner.totalBillboards} billboards</p>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all"
                          style={{
                            width: `${owner.proofOfPlayRate}%`,
                            backgroundColor: idx % 3 === 0 ? 'hsl(var(--chart-1))' :
                              idx % 3 === 1 ? 'hsl(var(--chart-2))' :
                                'hsl(var(--chart-3))'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t space-y-4">
                  {/* Pagination Controls */}
                  {mediaOwnerAnalytics.length > ITEMS_PER_PAGE && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Page {mediaOwnerPage} of {Math.ceil(mediaOwnerAnalytics.length / ITEMS_PER_PAGE)}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => setMediaOwnerPage(p => Math.max(1, p - 1))}
                          disabled={mediaOwnerPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => setMediaOwnerPage(p => Math.min(Math.ceil(mediaOwnerAnalytics.length / ITEMS_PER_PAGE), p + 1))}
                          disabled={mediaOwnerPage === Math.ceil(mediaOwnerAnalytics.length / ITEMS_PER_PAGE)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Total Revenue</span>
                    <span className="text-lg font-bold">
                      ${(mediaOwnerAnalytics.reduce((sum, o) => sum + o.revenue, 0) / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Analytics - Proof of Play Verification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card h-full flex flex-col">
              <CardHeader>
                <CardTitle>Active Campaigns - PoP Verification</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Proof of Play verification status
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                {campaignAnalytics.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Megaphone className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No active campaigns</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {campaignAnalytics.slice((activeCampaignsPage - 1) * ITEMS_PER_PAGE, activeCampaignsPage * ITEMS_PER_PAGE).map((campaign) => (
                        <div key={campaign.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm truncate">{campaign.name}</h5>
                            <p className="text-xs text-muted-foreground">
                              {campaign.totalInventories} inventories
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-center px-2 py-1 rounded bg-success/10">
                              <div className="text-sm font-bold text-success">{campaign.popVerified}</div>
                              <div className="text-[10px] text-muted-foreground">Verified</div>
                            </div>
                            <div className="text-center px-2 py-1 rounded bg-warning/10">
                              <div className="text-sm font-bold text-warning">{campaign.popUnverified}</div>
                              <div className="text-[10px] text-muted-foreground">Pending</div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-success">{campaign.verificationRate.toFixed(0)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {campaignAnalytics.length > ITEMS_PER_PAGE && (
                      <div className="flex items-center justify-between text-xs mt-4 pt-4 border-t">
                        <span className="text-muted-foreground">
                          Page {activeCampaignsPage} of {Math.ceil(campaignAnalytics.length / ITEMS_PER_PAGE)}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => setActiveCampaignsPage(p => Math.max(1, p - 1))}
                            disabled={activeCampaignsPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => setActiveCampaignsPage(p => Math.min(Math.ceil(campaignAnalytics.length / ITEMS_PER_PAGE), p + 1))}
                            disabled={activeCampaignsPage === Math.ceil(campaignAnalytics.length / ITEMS_PER_PAGE)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Top 10 Campaigns by Revenue */}
            <Card className="shadow-card h-full flex flex-col">
              <CardHeader>
                <CardTitle>Top 10 Campaigns by Revenue</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Highest revenue generating campaigns
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {topCampaignsByRevenue.slice((topCampaignsPage - 1) * ITEMS_PER_PAGE, topCampaignsPage * ITEMS_PER_PAGE).map((campaign, idx) => (
                    <div key={campaign.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">#{((topCampaignsPage - 1) * ITEMS_PER_PAGE) + idx + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm truncate">{campaign.name}</h5>
                        <p className="text-xs text-muted-foreground">
                          {campaign.occupiedBillboards}/{campaign.totalInventories} billboards •
                          <span className={`ml-1 ${campaign.status === 'Active' ? 'text-success' :
                            campaign.status === 'Planned' ? 'text-primary' :
                              'text-muted-foreground'
                            }`}>
                            {campaign.status}
                          </span>
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold">${(campaign.revenue / 1000).toFixed(0)}K</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {topCampaignsByRevenue.length > ITEMS_PER_PAGE && (
                  <div className="flex items-center justify-between text-xs mt-4 pt-4 border-t">
                    <span className="text-muted-foreground">
                      Page {topCampaignsPage} of {Math.ceil(topCampaignsByRevenue.length / ITEMS_PER_PAGE)}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => setTopCampaignsPage(p => Math.max(1, p - 1))}
                        disabled={topCampaignsPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => setTopCampaignsPage(p => Math.min(Math.ceil(topCampaignsByRevenue.length / ITEMS_PER_PAGE), p + 1))}
                        disabled={topCampaignsPage === Math.ceil(topCampaignsByRevenue.length / ITEMS_PER_PAGE)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
