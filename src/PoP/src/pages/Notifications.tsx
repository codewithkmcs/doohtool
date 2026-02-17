import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Clock } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "proof_upload",
      billboard: "Highway 101 North",
      campaign: "Summer Brand Launch",
      mediaOwner: "CLEAR CHANNEL",
      timestamp: "2024-06-15 10:30",
      read: false,
    },
    {
      id: 2,
      type: "proof_upload",
      billboard: "Downtown Plaza",
      campaign: "City Transit Takeover",
      mediaOwner: "OUTFRONT MEDIA",
      timestamp: "2024-06-15 11:45",
      read: false,
    },
    {
      id: 3,
      type: "proof_upload",
      billboard: "Airport Boulevard",
      campaign: "Summer Brand Launch",
      mediaOwner: "LAMAR ADVERTISING",
      timestamp: "2024-06-15 14:20",
      read: true,
    },
    {
      id: 4,
      type: "proof_upload",
      billboard: "Main Street Corner",
      campaign: "Regional Awareness Drive",
      mediaOwner: "CLEAR CHANNEL",
      timestamp: "2024-06-16 09:15",
      read: true,
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Real-time updates on proof-of-play uploads
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">New Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {notifications.filter(n => !n.read).length}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{notifications.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Read</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-muted-foreground">
                {notifications.filter(n => n.read).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`shadow-card hover:shadow-hover transition-all cursor-pointer ${
                !notification.read ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Camera className="h-5 w-5 text-primary" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          New proof-of-play uploaded
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">{notification.billboard}</span> for campaign{" "}
                          <span className="font-medium">{notification.campaign}</span>
                        </p>
                      </div>
                      {!notification.read && (
                        <Badge className="bg-primary text-primary-foreground">New</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="font-semibold">{notification.mediaOwner}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
