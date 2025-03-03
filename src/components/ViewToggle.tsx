
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";

export const ViewToggle = () => {
  const { displayMode, setDisplayMode } = useWeather();
  
  return (
    <div className="flex items-center justify-center gap-2 my-6 animate-fade-in">
      <Button
        variant={displayMode === "cards" ? "default" : "outline"}
        size="sm"
        className="rounded-full flex items-center gap-2 px-4 transition-all"
        onClick={() => setDisplayMode("cards")}
      >
        <Calendar className="h-4 w-4" />
        <span>Cartes</span>
      </Button>
      
      <Button
        variant={displayMode === "graphs" ? "default" : "outline"}
        size="sm"
        className="rounded-full flex items-center gap-2 px-4 transition-all"
        onClick={() => setDisplayMode("graphs")}
      >
        <BarChart3 className="h-4 w-4" />
        <span>Graphiques</span>
      </Button>
    </div>
  );
};
