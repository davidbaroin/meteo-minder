
import { Card, CardContent } from "@/components/ui/card";
import { DailyForecast } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface ForecastCardProps {
  forecast: DailyForecast;
  isToday?: boolean;
}

export const ForecastCard = ({ forecast, isToday = false }: ForecastCardProps) => {
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
    <Card className={cn(
      "glass-card transition-all hover:shadow-lg",
      isToday ? "border-primary/50" : ""
    )}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">
            {isToday ? "Aujourd'hui" : forecast.dayOfWeek}
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            {formattedDate}
          </div>
          
          <WeatherIcon 
            condition={forecast.condition} 
            className="h-10 w-10 mb-3" 
          />
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="font-medium">{forecast.temperatureMax}°</span>
            <span className="text-muted-foreground">{forecast.temperatureMin}°</span>
          </div>
          
          <div className="flex items-center mt-auto">
            <Droplets className={cn("h-4 w-4 mr-1", getRainProbColor(forecast.rainProbability))} />
            <span className="text-xs">{forecast.rainProbability}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
