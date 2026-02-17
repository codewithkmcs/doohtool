import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, Database, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} feature coming soon.`,
    });
  };

  const adminSections = [
    {
      title: "User Management",
      description: "Manage admin and member accounts",
      icon: Users,
      action: "Manage Users",
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      action: "View Settings",
    },
    {
      title: "Data Management",
      description: "Import/export and data maintenance",
      icon: Database,
      action: "Manage Data",
    },
    {
      title: "Security",
      description: "Access controls and permissions",
      icon: Shield,
      action: "Security Settings",
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">
            System administration and configuration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminSections.map((section) => (
            <Card key={section.title} className="shadow-card hover:shadow-hover transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full hover:bg-primary/10 hover:border-primary transition-all"
                  onClick={() => handleAction(section.action)}
                >
                  {section.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Admin;
