
import { BellRing, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useWeather } from "@/context/WeatherContext";
import { useState } from "react";
import { NotificationDialog } from "@/components/NotificationDialog";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { locationName, weatherData } = useWeather();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const { toast } = useToast();

  const handleLocationClick = () => {
    navigator.clipboard.writeText(`${weatherData?.location.lat}, ${weatherData?.location.lon}`);
    toast({
      title: "Coordonnées copiées",
      description: "Les coordonnées GPS ont été copiées dans le presse-papier",
    });
  };
  
  const displayName = locationName || (weatherData?.location.name ? `${weatherData.location.name}, ${weatherData.location.country}` : "Chargement...");

  return (
    <header className="frost-bg sticky top-0 z-50 h-16 flex items-center justify-between px-4 md:px-6 animate-fade-in border-b">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <h1 className="text-xl font-medium tracking-tight flex items-center">
          Météo Minder
        </h1>
      </div>
      
      <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <button 
          onClick={handleLocationClick}
          className="hover:text-foreground transition-colors"
        >
          {displayName}
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => setShowNotificationDialog(true)}
        >
          <BellRing className="h-5 w-5" />
        </Button>
        <ThemeToggle />
      </div>
      
      {/* Mobile menu */}
      {showMenu && (
        <div className="absolute top-16 left-0 right-0 frost-bg border-b shadow-lg p-4 flex flex-col gap-4 md:hidden animate-slide-in">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            <button onClick={handleLocationClick} className="text-muted-foreground hover:text-foreground transition-colors">
              {displayName}
            </button>
          </div>
        </div>
      )}
      
      <NotificationDialog 
        open={showNotificationDialog} 
        onOpenChange={setShowNotificationDialog} 
      />
    </header>
  );
}
