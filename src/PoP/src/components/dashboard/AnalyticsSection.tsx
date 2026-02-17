import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Calendar as CalendarIcon, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Badge } from "@/components/ui/badge";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

interface AnalyticsSectionProps {
  campaigns: any[];
  billboards: any[];
}

export const AnalyticsSection = ({ campaigns, billboards }: AnalyticsSectionProps) => {
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [compareStartDate, setCompareStartDate] = useState<Date>(subDays(new Date(), 60));
  const [compareEndDate, setCompareEndDate] = useState<Date>(subDays(new Date(), 31));
  const [isExporting, setIsExporting] = useState(false);

  // Calculate metrics for current period
  const currentMetrics = useMemo(() => {
    const filteredCampaigns = campaigns.filter(c => {
      const campaignStart = new Date(c.startDate);
      return campaignStart >= startDate && campaignStart <= endDate;
    });

    const activeCampaigns = filteredCampaigns.filter(c => c.status === "Active").length;
    const revenue = activeCampaigns * 5000; // Mock revenue per campaign
    const billboardsUsed = new Set(filteredCampaigns.flatMap(c => c.billboardIds)).size;
    const avgCampaignValue = filteredCampaigns.length > 0 ? revenue / filteredCampaigns.length : 0;

    return {
      campaigns: filteredCampaigns.length,
      activeCampaigns,
      revenue,
      billboardsUsed,
      avgCampaignValue,
    };
  }, [campaigns, startDate, endDate]);

  // Calculate metrics for comparison period
  const compareMetrics = useMemo(() => {
    const filteredCampaigns = campaigns.filter(c => {
      const campaignStart = new Date(c.startDate);
      return campaignStart >= compareStartDate && campaignStart <= compareEndDate;
    });

    const activeCampaigns = filteredCampaigns.filter(c => c.status === "Active").length;
    const revenue = activeCampaigns * 5000;
    const billboardsUsed = new Set(filteredCampaigns.flatMap(c => c.billboardIds)).size;

    return {
      campaigns: filteredCampaigns.length,
      activeCampaigns,
      revenue,
      billboardsUsed,
    };
  }, [campaigns, compareStartDate, compareEndDate]);

  // Calculate percentage changes
  const changes = useMemo(() => ({
    campaigns: compareMetrics.campaigns > 0 
      ? ((currentMetrics.campaigns - compareMetrics.campaigns) / compareMetrics.campaigns) * 100 
      : 0,
    revenue: compareMetrics.revenue > 0 
      ? ((currentMetrics.revenue - compareMetrics.revenue) / compareMetrics.revenue) * 100 
      : 0,
    billboards: compareMetrics.billboardsUsed > 0 
      ? ((currentMetrics.billboardsUsed - compareMetrics.billboardsUsed) / compareMetrics.billboardsUsed) * 100 
      : 0,
  }), [currentMetrics, compareMetrics]);

  // Generate daily revenue data for current period
  const dailyRevenueData = useMemo(() => {
    const days = differenceInDays(endDate, startDate);
    return Array.from({ length: Math.min(days, 30) }, (_, i) => {
      const date = addDays(startDate, i);
      const dayRevenue = Math.floor(Math.random() * 15000) + 5000;
      return {
        date: format(date, "MMM dd"),
        revenue: dayRevenue,
        campaigns: Math.floor(Math.random() * 5) + 1,
      };
    });
  }, [startDate, endDate]);

  // Generate revenue forecast data (next 30 days)
  const forecastData = useMemo(() => {
    const avgDailyRevenue = dailyRevenueData.reduce((sum, d) => sum + d.revenue, 0) / dailyRevenueData.length;
    const growthRate = 1.05; // 5% growth assumption
    
    return Array.from({ length: 30 }, (_, i) => {
      const date = addDays(endDate, i + 1);
      const baseRevenue = avgDailyRevenue * Math.pow(growthRate, i / 10);
      const variance = Math.random() * 0.2 - 0.1; // ±10% variance
      
      return {
        date: format(date, "MMM dd"),
        forecast: Math.floor(baseRevenue * (1 + variance)),
        lower: Math.floor(baseRevenue * 0.85),
        upper: Math.floor(baseRevenue * 1.15),
      };
    });
  }, [dailyRevenueData, endDate]);

  // Combined historical + forecast data
  const combinedRevenueData = useMemo(() => {
    return [
      ...dailyRevenueData.map(d => ({ ...d, type: 'actual' })),
      ...forecastData.map(d => ({ ...d, revenue: d.forecast, type: 'forecast' })),
    ];
  }, [dailyRevenueData, forecastData]);

  // Billboard performance data
  const billboardPerformanceData = useMemo(() => {
    return billboards.slice(0, 8).map((b, idx) => ({
      name: b.name.length > 15 ? b.name.substring(0, 15) + '...' : b.name,
      utilization: Math.floor(Math.random() * 40) + 60,
      revenue: Math.floor(Math.random() * 30000) + 10000,
    }));
  }, [billboards]);

  // Export to PDF
  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('analytics-export-content');
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
      pdf.save(`analytics-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
      
      toast.success("Analytics report exported successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const MetricCard = ({ title, value, change, prefix = "" }: { title: string; value: number; change: number; prefix?: string }) => (
    <Card className="shadow-card">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold">{prefix}{value.toLocaleString()}</p>
            <Badge 
              variant={change >= 0 ? "default" : "destructive"}
              className={cn(
                "flex items-center gap-1",
                change >= 0 ? "bg-success text-success-foreground" : ""
              )}
            >
              {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(change).toFixed(1)}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">vs previous period</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header with Date Pickers and Export */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Detailed Analytics</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Compare periods and forecast future performance
              </p>
            </div>
            <Button onClick={exportToPDF} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Generating..." : "Export PDF"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Period */}
            <div className="space-y-3">
              <h4 className="font-semibold">Current Period</h4>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(startDate, "MMM dd, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <span className="flex items-center">to</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(endDate, "MMM dd, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Compare Period */}
            <div className="space-y-3">
              <h4 className="font-semibold">Compare Period</h4>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(compareStartDate, "MMM dd, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={compareStartDate}
                      onSelect={(date) => date && setCompareStartDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <span className="flex items-center">to</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(compareEndDate, "MMM dd, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={compareEndDate}
                      onSelect={(date) => date && setCompareEndDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exportable Content */}
      <div id="analytics-export-content" className="space-y-6 bg-background p-6 rounded-lg">
        {/* Comparison Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Period Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Total Campaigns" 
              value={currentMetrics.campaigns} 
              change={changes.campaigns}
            />
            <MetricCard 
              title="Active Campaigns" 
              value={currentMetrics.activeCampaigns} 
              change={changes.campaigns}
            />
            <MetricCard 
              title="Total Revenue" 
              value={currentMetrics.revenue} 
              change={changes.revenue}
              prefix="$"
            />
            <MetricCard 
              title="Billboards Used" 
              value={currentMetrics.billboardsUsed} 
              change={changes.billboards}
            />
          </div>
        </div>

        {/* Revenue Trend & Forecast */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Trend & 30-Day Forecast</CardTitle>
              <Badge variant="outline" className="flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                5% projected growth
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={combinedRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Forecast Summary:</strong> Based on current trends, projected revenue for the next 30 days is 
                <span className="font-bold text-foreground"> ${(forecastData.reduce((sum, d) => sum + d.forecast, 0) / 1000).toFixed(1)}K</span>, 
                representing a <span className="font-bold text-success">5% growth</span> from the current period.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Daily Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Daily Revenue (Current Period)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Billboard Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={billboardPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 11 }}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                  <Bar dataKey="utilization" fill="hsl(var(--primary))" name="Utilization %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Summary Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Revenue Breakdown by Metric</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 pb-2 border-b font-semibold text-sm">
                <div>Metric</div>
                <div className="text-right">Current Period</div>
                <div className="text-right">Compare Period</div>
                <div className="text-right">Change</div>
              </div>
              <div className="grid grid-cols-4 gap-4 py-2">
                <div className="text-sm">Total Revenue</div>
                <div className="text-right font-bold">${currentMetrics.revenue.toLocaleString()}</div>
                <div className="text-right">${compareMetrics.revenue.toLocaleString()}</div>
                <div className="text-right">
                  <Badge variant={changes.revenue >= 0 ? "default" : "destructive"}>
                    {changes.revenue >= 0 ? "+" : ""}{changes.revenue.toFixed(1)}%
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 py-2">
                <div className="text-sm">Avg Campaign Value</div>
                <div className="text-right font-bold">${currentMetrics.avgCampaignValue.toLocaleString()}</div>
                <div className="text-right">${(compareMetrics.revenue / (compareMetrics.campaigns || 1)).toLocaleString()}</div>
                <div className="text-right">
                  <Badge variant="outline">N/A</Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 py-2">
                <div className="text-sm">Revenue per Billboard</div>
                <div className="text-right font-bold">
                  ${(currentMetrics.revenue / (currentMetrics.billboardsUsed || 1)).toFixed(0)}
                </div>
                <div className="text-right">
                  ${(compareMetrics.revenue / (compareMetrics.billboardsUsed || 1)).toFixed(0)}
                </div>
                <div className="text-right">
                  <Badge variant={changes.billboards >= 0 ? "default" : "destructive"}>
                    {changes.billboards >= 0 ? "+" : ""}{changes.billboards.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
