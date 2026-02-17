import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface Billboard {
  id: number;
  name: string;
  type: string;
  latitude: string;
  longitude: string;
  address: string;
  mediaOwner: string;
  image?: string;
  startTime?: string;
  endTime?: string;
  maxVideoSize?: string;
  cost?: number;
  currency?: string;
}

interface BillboardFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingBillboard?: Billboard | null;
  onSave?: (billboard: Billboard) => void;
}

export const BillboardFormModal = ({ open, onOpenChange, editingBillboard, onSave }: BillboardFormModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "Static",
    latitude: "",
    longitude: "",
    address: "",
    mediaOwner: "Allianz Media",
    image: "",
    startTime: "",
    endTime: "",
    maxVideoSize: "",
    cost: 0,
    currency: "GHS",
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (editingBillboard) {
      setFormData({
        name: editingBillboard.name,
        type: editingBillboard.type,
        latitude: editingBillboard.latitude,
        longitude: editingBillboard.longitude,
        address: editingBillboard.address,
        mediaOwner: editingBillboard.mediaOwner,
        image: editingBillboard.image || "",
        startTime: editingBillboard.startTime || "",
        endTime: editingBillboard.endTime || "",
        maxVideoSize: editingBillboard.maxVideoSize || "",
        cost: editingBillboard.cost || 0,
        currency: editingBillboard.currency || "GHS",
      });
      setImagePreview(editingBillboard.image || "");
    } else {
      setFormData({
        name: "",
        type: "Static",
        latitude: "",
        longitude: "",
        address: "",
        mediaOwner: "Allianz Media",
        image: "",
        startTime: "",
        endTime: "",
        maxVideoSize: "",
        cost: 0,
        currency: "GHS",
      });
      setImagePreview("");
    }
  }, [editingBillboard, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const billboardData: Billboard = {
      id: editingBillboard?.id || Date.now(),
      ...formData,
    };

    if (onSave) {
      onSave(billboardData);
    }

    toast({
      title: editingBillboard ? "Billboard Updated" : "Billboard Added",
      description: `${formData.name} has been ${editingBillboard ? "updated" : "added to the registry"}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingBillboard ? "Edit Billboard" : "Add New Billboard"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Billboard Image</Label>
            <div className="flex flex-col gap-2">
              {imagePreview && (
                <div className="relative w-full h-48 rounded-md overflow-hidden border border-border">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted/50 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">{imagePreview ? "Change Image" : "Upload Image"}</span>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Billboard Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Highway 101 North"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Static">Static</SelectItem>
                <SelectItem value="Digital">Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g., Ring Road Central, Accra, Ghana"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="37.7749"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="-122.4194"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mediaOwner">Media Owner</Label>
            <Input
              id="mediaOwner"
              value={formData.mediaOwner}
              onChange={(e) => setFormData({ ...formData, mediaOwner: e.target.value })}
              placeholder="e.g., Allianz Media"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost</Label>
              <Input
                id="cost"
                type="number"
                min="0"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                placeholder="e.g., 2500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GHS">GHS (Ghana Cedi)</SelectItem>
                  <SelectItem value="NGN">NGN (Nigerian Naira)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === "Digital" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    placeholder="06:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    placeholder="23:00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxVideoSize">Max Video File Size</Label>
                <Input
                  id="maxVideoSize"
                  value={formData.maxVideoSize}
                  onChange={(e) => setFormData({ ...formData, maxVideoSize: e.target.value })}
                  placeholder="e.g., 5 MB"
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
              {editingBillboard ? "Save Changes" : "Add Billboard"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
