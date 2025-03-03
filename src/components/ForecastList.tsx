
import { useState } from "react";
import { useWeather } from "@/context/WeatherContext";
import { ForecastCard } from "@/components/ForecastCard";
import { ForecastDetailDialog } from "@/components/ForecastDetailDialog";
import { DailyForecast } from "@/types/weather";

export const ForecastList = () => {
  const { weatherData } = useWeather();
  const [selectedForecast, setSelectedForecast] = useState<DailyForecast | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  if (!weatherData) return null;
  
  const { forecast } = weatherData;
  
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleForecastClick = (day: DailyForecast) => {
    setSelectedForecast(day);
    setIsDetailOpen(true);
  };
  
  return (
    <div className="w-full py-2 animate-fade-in">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {forecast.daily.map((day, index) => (
          <div key={day.date} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
            <ForecastCard 
              forecast={day} 
              isToday={day.date === today}
              onClick={() => handleForecastClick(day)}
            />
          </div>
        ))}
      </div>

      <ForecastDetailDialog 
        forecast={selectedForecast}
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
};
