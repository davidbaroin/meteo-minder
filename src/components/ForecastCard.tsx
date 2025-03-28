
import { Card, CardContent } from "@/components/ui/card";
import { DailyForecast } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface ForecastCardProps {
  forecast: DailyForecast;
  isToday?: boolean;
  onClick?: () => void;
}

export const ForecastCard = ({ forecast, isToday = false, onClick }: ForecastCardProps) => {
  // Format date: "Mar 15" for example
  const formattedDate = new Date(forecast.date).toLocaleDateString('fr', {
    day: 'numeric',
    month: 'short'
  });

  // Determine rain probability color
  const getRainProbColor = (probability: number) => {
    if (probability < 30) return "text-blue-300";
    if (probability < 60) return "text-blue-500";
    return "text-blue-700";
  };

  return (
    <Card 
      className={cn(
        "glass-card transition-all hover:shadow-lg cursor-pointer hover:scale-105 transition-transform h-full",
        isToday ? "border-primary/50" : ""
      )}
      onClick={onClick}
    >
      <CardContent className="p-2 sm:p-4">
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium">
            {isToday ? "Aujourd'hui" : forecast.dayOfWeek}
          </div>
          <div className="text-xs text-muted-foreground mb-1 sm:mb-2">
            {formattedDate}
          </div>
          
          <WeatherIcon 
            condition={forecast.condition} 
            className="h-8 w-8 sm:h-10 sm:w-10 mb-1 sm:mb-2" 
          />
          
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <span className="font-medium">{forecast.temperatureMax}°</span>
            <span className="text-muted-foreground">{forecast.temperatureMin}°</span>
          </div>
          
          <div className="flex items-center mt-auto">
            <Droplets className={cn("h-3 w-3 sm:h-4 sm:w-4 mr-1", getRainProbColor(forecast.rainProbability))} />
            <span className="text-xs">{forecast.rainProbability}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
