
import { Bell, BellOff, ThermometerSun, ThermometerSnowflake, Umbrella } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useWeather } from "@/context/WeatherContext";
import { toast } from "@/hooks/use-toast";

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationDialog = ({ open, onOpenChange }: NotificationDialogProps) => {
  const { notificationSettings, updateNotificationSettings } = useWeather();
  
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Notifications non supportées",
        description: "Votre navigateur ne supporte pas les notifications",
        variant: "destructive"
      });
      return;
    }
    
    const permission = await Notification.requestPermission();
    
    if (permission === "granted") {
      updateNotificationSettings({ enabled: true });
      toast({
        title: "Notifications activées",
        description: "Vous recevrez des alertes météo selon vos paramètres"
      });
    } else {
      toast({
        title: "Notifications refusées",
        description: "Vous ne recevrez pas de notifications",
        variant: "destructive"
      });
    }
  };
  
  const toggleNotifications = () => {
    if (!notificationSettings.enabled) {
      requestNotificationPermission();
    } else {
      updateNotificationSettings({ enabled: false });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Paramètres de notifications
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center justify-between py-4 space-x-2">
          <div className="flex items-center gap-2">
            {notificationSettings.enabled ? (
              <Bell className="h-5 w-5 text-primary" />
            ) : (
              <BellOff className="h-5 w-5 text-muted-foreground" />
            )}
            <Label htmlFor="notifications">Activer les notifications</Label>
          </div>
          <Switch 
            id="notifications"
            checked={notificationSettings.enabled}
            onCheckedChange={toggleNotifications}
          />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThermometerSnowflake className="h-5 w-5 text-blue-500" />
                <Label htmlFor="temp-min">Alerte température minimale</Label>
              </div>
              <Switch 
                id="temp-min"
                checked={notificationSettings.tempMin.enabled}
                onCheckedChange={(checked) => {
                  updateNotificationSettings({
                    tempMin: { ...notificationSettings.tempMin, enabled: checked }
                  });
                }}
                disabled={!notificationSettings.enabled}
              />
            </div>
            <div className="pt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Seuil: {notificationSettings.tempMin.threshold}°C</span>
              </div>
              <Slider 
                defaultValue={[notificationSettings.tempMin.threshold]} 
                min={-20} 
                max={15} 
                step={1}
                onValueChange={(values) => {
                  updateNotificationSettings({
                    tempMin: { ...notificationSettings.tempMin, threshold: values[0] }
                  });
                }}
                disabled={!notificationSettings.enabled || !notificationSettings.tempMin.enabled}
                className="my-4"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-amber-500" />
                <Label htmlFor="temp-max">Alerte température maximale</Label>
              </div>
              <Switch 
                id="temp-max"
                checked={notificationSettings.tempMax.enabled}
                onCheckedChange={(checked) => {
                  updateNotificationSettings({
                    tempMax: { ...notificationSettings.tempMax, enabled: checked }
                  });
                }}
                disabled={!notificationSettings.enabled}
              />
            </div>
            <div className="pt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Seuil: {notificationSettings.tempMax.threshold}°C</span>
              </div>
              <Slider 
                defaultValue={[notificationSettings.tempMax.threshold]} 
                min={20} 
                max={45} 
                step={1}
                onValueChange={(values) => {
                  updateNotificationSettings({
                    tempMax: { ...notificationSettings.tempMax, threshold: values[0] }
                  });
                }}
                disabled={!notificationSettings.enabled || !notificationSettings.tempMax.enabled}
                className="my-4"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Umbrella className="h-5 w-5 text-blue-500" />
                <Label htmlFor="rain">Alerte risque de pluie</Label>
              </div>
              <Switch 
                id="rain"
                checked={notificationSettings.rain.enabled}
                onCheckedChange={(checked) => {
                  updateNotificationSettings({
                    rain: { ...notificationSettings.rain, enabled: checked }
                  });
                }}
                disabled={!notificationSettings.enabled}
              />
            </div>
            <div className="pt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Seuil: {notificationSettings.rain.threshold}%</span>
              </div>
              <Slider 
                defaultValue={[notificationSettings.rain.threshold]} 
                min={10} 
                max={100} 
                step={5}
                onValueChange={(values) => {
                  updateNotificationSettings({
                    rain: { ...notificationSettings.rain, threshold: values[0] }
                  });
                }}
                disabled={!notificationSettings.enabled || !notificationSettings.rain.enabled}
                className="my-4"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
