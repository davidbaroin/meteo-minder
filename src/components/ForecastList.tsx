
import { useWeather } from "@/context/WeatherContext";
import { ForecastCard } from "@/components/ForecastCard";

export const ForecastList = () => {
  const { weatherData } = useWeather();
  
  if (!weatherData) return null;
  
  const { forecast } = weatherData;
  
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex space-x-4 min-w-max px-1 pb-1">
        {forecast.daily.map((day, index) => (
          <div key={day.date} className="w-[140px] flex-shrink-0 animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
            <ForecastCard 
              forecast={day} 
              isToday={day.date === today}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
