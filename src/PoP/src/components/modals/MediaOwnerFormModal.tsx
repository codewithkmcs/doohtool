import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MediaOwnerFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingOwner?: string | null;
}

export const MediaOwnerFormModal = ({ open, onOpenChange, editingOwner }: MediaOwnerFormModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: editingOwner || "",
    contact: "",
    email: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: editingOwner ? "Media Owner Updated" : "Media Owner Added",
      description: `${formData.name} has been ${editingOwner ? 'updated' : 'added'} successfully.`,
    });
    onOpenChange(false);
    setFormData({ name: "", contact: "", email: "", notes: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingOwner ? "Edit Media Owner" : "Add Media Owner"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
              placeholder="e.g., CLEAR CHANNEL"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Person</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional information..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
              {editingOwner ? "Update Media Owner" : "Add Media Owner"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
