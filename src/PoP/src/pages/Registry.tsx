import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Upload, Edit, Trash2, MapPin, Filter } from "lucide-react";
import { BillboardFormModal } from "@/components/modals/BillboardFormModal";
import { MediaOwnerFormModal } from "@/components/modals/MediaOwnerFormModal";
import { useToast } from "@/hooks/use-toast";
import { useBillboards } from "@/contexts/BillboardContext";
import type { Billboard } from "@/data/billboards";

const Registry = () => {
  const { toast } = useToast();
  const { billboards, addBillboard, updateBillboard, deleteBillboard } = useBillboards();
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaOwnerFilter, setMediaOwnerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showBillboardModal, setShowBillboardModal] = useState(false);
  const [showMediaOwnerModal, setShowMediaOwnerModal] = useState(false);
  const [editingOwner, setEditingOwner] = useState<string | null>(null);
  const [editingBillboard, setEditingBillboard] = useState<Billboard | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Get unique media owners
  const mediaOwners = Array.from(new Set(billboards.map(b => b.mediaOwner)));

  const filteredBillboards = billboards.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.mediaOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMediaOwner = mediaOwnerFilter === "all" || b.mediaOwner === mediaOwnerFilter;
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesType = typeFilter === "all" || b.type === typeFilter;

    return matchesSearch && matchesMediaOwner && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBillboards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBillboards = filteredBillboards.slice(startIndex, endIndex);

  const handleSaveBillboard = (billboard: Billboard) => {
    if (editingBillboard) {
      updateBillboard(billboard);
    } else {
      addBillboard(billboard);
    }
    setEditingBillboard(null);
  };

  const handleEditBillboard = (billboard: Billboard) => {
    setEditingBillboard(billboard);
    setShowBillboardModal(true);
  };

  const handleDeleteBillboard = (id: number) => {
    deleteBillboard(id);
    toast({
      title: "Billboard Deleted",
      description: "The billboard has been removed from the registry.",
    });
  };

  const handleViewImage = (image: string) => {
    setSelectedImage(image);
    setShowImageDialog(true);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Billboard Registry</h1>
            <p className="text-muted-foreground mt-1">
              Manage billboard inventory and media owners
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Billboard Data</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-muted-foreground">
                    Upload a CSV file with billboard information
                  </p>
                  <Input type="file" accept=".csv" />
                  <Button className="w-full bg-gradient-primary">Upload</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button className="bg-gradient-primary hover:opacity-90" onClick={() => {
              setEditingBillboard(null);
              setShowBillboardModal(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Billboard
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search billboards by name, address or media owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Filters:</span>
                </div>

                <Select value={mediaOwnerFilter} onValueChange={setMediaOwnerFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Media Owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Media Owners</SelectItem>
                    {mediaOwners.map(owner => (
                      <SelectItem key={owner} value={owner}>{owner}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Occupied">Occupied</SelectItem>
                    <SelectItem value="Needs Service">Needs Service</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Digital">Digital</SelectItem>
                    <SelectItem value="Static">Static</SelectItem>
                  </SelectContent>
                </Select>

                {(mediaOwnerFilter !== "all" || statusFilter !== "all" || typeFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMediaOwnerFilter("all");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billboards Table */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Billboard Inventory ({filteredBillboards.length})</CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredBillboards.length)} of {filteredBillboards.length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Billboard Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Coordinates</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Media Owner</TableHead>
                    <TableHead>Operating Times</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBillboards.map((billboard) => (
                    <TableRow key={billboard.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <img
                          src={billboard.image}
                          alt={billboard.name}
                          className="w-20 h-12 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleViewImage(billboard.image)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{billboard.name}</TableCell>
                      <TableCell>
                        <Badge variant={billboard.type === "Digital" ? "default" : "secondary"}>
                          {billboard.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Badge
                            variant="outline"
                            className={
                              billboard.status === "Available" ? "bg-success/10 text-success border-success/20" :
                                billboard.status === "Occupied" ? "bg-chart-1/10 border-chart-1/20" :
                                  "bg-warning/10 text-warning border-warning/20"
                            }
                          >
                            {billboard.status || "Available"}
                          </Badge>
                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={billboard.needsService || false}
                              onChange={(e) => {
                                updateBillboard({
                                  ...billboard,
                                  needsService: e.target.checked,
                                  status: e.target.checked ? "Needs Service" : "Available"
                                });
                              }}
                              className="rounded"
                            />
                            <span className="text-muted-foreground">Needs Service</span>
                          </label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-1 max-w-xs">
                          <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground line-clamp-2">{billboard.address}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {billboard.latitude}, {billboard.longitude}
                      </TableCell>
                      <TableCell className="font-medium">
                        {billboard.currency || "GHS"} {billboard.cost?.toLocaleString() || "0"}
                      </TableCell>
                      <TableCell className="font-semibold text-xs">{billboard.mediaOwner}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {billboard.type === "Digital" && billboard.startTime && billboard.endTime ? (
                          <div className="space-y-1">
                            <div>{billboard.startTime}–{billboard.endTime}</div>
                            {billboard.maxVideoSize && (
                              <div className="text-[10px]">Max: {billboard.maxVideoSize}</div>
                            )}
                          </div>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditBillboard(billboard)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteBillboard(billboard.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Image Preview Dialog */}
        <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Billboard Image</DialogTitle>
            </DialogHeader>
            <div className="w-full">
              <img src={selectedImage} alt="Billboard" className="w-full h-auto rounded-lg" />
            </div>
          </DialogContent>
        </Dialog>

        {/* Modals */}
        <BillboardFormModal
          open={showBillboardModal}
          onOpenChange={(open) => {
            setShowBillboardModal(open);
            if (!open) setEditingBillboard(null);
          }}
          editingBillboard={editingBillboard}
          onSave={handleSaveBillboard}
        />
        <MediaOwnerFormModal
          open={showMediaOwnerModal}
          onOpenChange={(open) => {
            setShowMediaOwnerModal(open);
            if (!open) setEditingOwner(null);
          }}
          editingOwner={editingOwner}
        />
      </div>
    </AppLayout>
  );
};

export default Registry;
