
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DailyForecast } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Droplets, Sunrise, Sunset, Wind, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

interface ForecastDetailDialogProps {
  forecast: DailyForecast | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ForecastDetailDialog = ({
  forecast,
  isOpen,
  onOpenChange,
}: ForecastDetailDialogProps) => {
  if (!forecast) return null;

  // Format date: "Monday, March 15" for example
  const formattedDate = new Date(forecast.date).toLocaleDateString('fr', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  // First letter uppercase
  const formattedDateCapitalized = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  // Determine rain probability color
  const getRainProbColor = (probability: number) => {
    if (probability < 30) return "text-blue-300";
    if (probability < 60) return "text-blue-500";
    return "text-blue-700";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <WeatherIcon condition={forecast.condition} className="h-8 w-8" />
            <span>{formattedDateCapitalized}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-2">
          <div className="flex justify-center items-center gap-6 text-2xl font-medium my-4">
            <div className="flex flex-col items-center text-center">
              <Thermometer className="h-6 w-6 text-red-500 mb-1" />
              <div>Max: {forecast.temperatureMax}°C</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Thermometer className="h-6 w-6 text-blue-500 mb-1" />
              <div>Min: {forecast.temperatureMin}°C</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/50 p-3 rounded-lg flex items-center gap-2">
              <Droplets className={cn("h-5 w-5", getRainProbColor(forecast.rainProbability))} />
              <span>Pluie: {forecast.rainProbability}%</span>
            </div>
            
            <div className="bg-background/50 p-3 rounded-lg flex items-center gap-2">
              <Wind className="h-5 w-5 text-gray-500" />
              <span>Vent: {forecast.windSpeed} km/h</span>
            </div>
            
            <div className="bg-background/50 p-3 rounded-lg flex items-center gap-2">
              <Sunrise className="h-5 w-5 text-amber-500" />
              <span>Lever: {forecast.sunrise}</span>
            </div>
            
            <div className="bg-background/50 p-3 rounded-lg flex items-center gap-2">
              <Sunset className="h-5 w-5 text-orange-500" />
              <span>Coucher: {forecast.sunset}</span>
            </div>
          </div>

          <div className="bg-background/50 p-3 rounded-lg mt-4">
            <div className="font-medium mb-1">Précipitations</div>
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span>{forecast.precipitation} mm</span>
            </div>
          </div>

          <div className="text-center text-muted-foreground text-sm mt-2">
            {forecast.condition}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
