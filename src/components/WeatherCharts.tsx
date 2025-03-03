
import { useWeather } from "@/context/WeatherContext";
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { GraphToggle } from "@/components/GraphToggle";

export const WeatherCharts = () => {
  const { weatherData, activeGraph } = useWeather();
  
  if (!weatherData) return null;
  
  const { forecast } = weatherData;
  
  // Format daily data for charts
  const dailyData = forecast.daily.map(day => ({
    name: new Date(day.date).toLocaleDateString('fr', { weekday: 'short', day: 'numeric' }),
    min: day.temperatureMin,
    max: day.temperatureMax,
    rainProbability: day.rainProbability,
    precipitation: day.precipitation
  }));
  
  return (
    <div className="animate-fade-in">
      <GraphToggle />
      
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-4">
          <div className="h-[300px] w-full">
            {activeGraph === "temperature" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dailyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7c43" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff7c43" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d91c0" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1d91c0" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis unit="°C" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value}°C`, '']}
                    labelFormatter={(label) => `Jour: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="max" 
                    stroke="#ff7c43" 
                    fillOpacity={1} 
                    fill="url(#colorMax)" 
                    name="Max"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="min" 
                    stroke="#1d91c0" 
                    fillOpacity={1} 
                    fill="url(#colorMin)" 
                    name="Min"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
            
            {activeGraph === "rain" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Probabilité']}
                    labelFormatter={(label) => `Jour: ${label}`}
                  />
                  <Bar 
                    dataKey="rainProbability" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]} 
                    name="Probabilité de pluie"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {activeGraph === "precipitation" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis unit="mm" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value} mm`, 'Précipitations']}
                    labelFormatter={(label) => `Jour: ${label}`}
                  />
                  <Bar 
                    dataKey="precipitation" 
                    fill="#60a5fa" 
                    radius={[4, 4, 0, 0]} 
                    name="Précipitations"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
