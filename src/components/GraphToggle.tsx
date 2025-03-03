
import { Button } from "@/components/ui/button";
import { Droplets, Thermometer, Umbrella } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";

export const GraphToggle = () => {
  const { activeGraph, setActiveGraph } = useWeather();
  
  return (
    <div className="flex items-center justify-center gap-2 my-6 animate-fade-in">
      <Button
        variant={activeGraph === "temperature" ? "default" : "outline"}
        size="sm"
        className="rounded-full flex items-center gap-2 px-4 transition-all"
        onClick={() => setActiveGraph("temperature")}
      >
        <Thermometer className="h-4 w-4" />
        <span>Température</span>
      </Button>
      
      <Button
        variant={activeGraph === "rain" ? "default" : "outline"}
        size="sm"
        className="rounded-full flex items-center gap-2 px-4 transition-all"
        onClick={() => setActiveGraph("rain")}
      >
        <Umbrella className="h-4 w-4" />
        <span>Probabilité</span>
      </Button>
      
      <Button
        variant={activeGraph === "precipitation" ? "default" : "outline"}
        size="sm"
        className="rounded-full flex items-center gap-2 px-4 transition-all"
        onClick={() => setActiveGraph("precipitation")}
      >
        <Droplets className="h-4 w-4" />
        <span>Précipitations</span>
      </Button>
    </div>
  );
};
