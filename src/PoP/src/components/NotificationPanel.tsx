import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
  {
    id: 1,
    billboard: "Highway 101 North",
    campaign: "Summer Brand Launch",
    mediaOwner: "CLEAR CHANNEL",
    timestamp: "2024-06-15 10:30",
    read: false,
  },
  {
    id: 2,
    billboard: "Downtown Plaza",
    campaign: "City Transit Takeover",
    mediaOwner: "OUTFRONT MEDIA",
    timestamp: "2024-06-15 11:45",
    read: false,
  },
  {
    id: 3,
    billboard: "Airport Boulevard",
    campaign: "Summer Brand Launch",
    mediaOwner: "LAMAR ADVERTISING",
    timestamp: "2024-06-15 14:20",
    read: true,
  },
];

export const NotificationPanel = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="w-80 shadow-lg border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="p-2 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                !notification.read ? "bg-primary/5" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <Camera className="h-4 w-4 text-primary" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    New proof-of-play
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">{notification.billboard}</span>
                    <br />
                    {notification.campaign}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
