
import { Droplets, Thermometer, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useWeather } from "@/context/WeatherContext";
import { WeatherIcon } from "@/components/WeatherIcon";

export const CurrentWeather = () => {
  const { weatherData } = useWeather();
  
  if (!weatherData) return null;
  
  const { current, location } = weatherData;
  
  return (
    <Card className="glass-card overflow-hidden animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium mb-1">Météo actuelle</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Mise à jour {new Date(current.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            
            <div className="flex items-center mb-4">
              <WeatherIcon condition={current.condition} className="w-16 h-16 mr-4" />
              <div>
                <div className="text-4xl font-semibold">{current.temperature}°C</div>
                <div className="text-muted-foreground">{current.condition}</div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Ressenti: {current.feelsLike}°C
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Thermometer className="text-red-400 mr-3 h-5 w-5" />
              <div>
                <div className="text-sm text-muted-foreground">Humidité</div>
                <div className="font-medium">{current.humidity}%</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Wind className="text-blue-400 mr-3 h-5 w-5" />
              <div>
                <div className="text-sm text-muted-foreground">Vent</div>
                <div className="font-medium">{current.windSpeed} km/h {current.windDirection}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Droplets className="text-blue-500 mr-3 h-5 w-5" />
              <div>
                <div className="text-sm text-muted-foreground">Pression</div>
                <div className="font-medium">{current.pressure} hPa</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-yellow-400 rounded-full w-5 h-5 mr-3 flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-900">UV</span>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Index UV</div>
                <div className="font-medium">{current.uvIndex}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
