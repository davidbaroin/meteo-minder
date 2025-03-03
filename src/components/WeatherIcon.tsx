
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, SunDim } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  condition: string;
  className?: string;
}

export const WeatherIcon = ({ condition, className }: WeatherIconProps) => {
  let icon;

  switch (condition.toLowerCase()) {
    case "sunny":
    case "clear":
      icon = <Sun className={cn("text-amber-500", className)} />;
      break;
    case "partly cloudy":
    case "partly-cloudy":
      icon = <SunDim className={cn("text-amber-400", className)} />;
      break;
    case "cloudy":
      icon = <Cloud className={cn("text-gray-400", className)} />;
      break;
    case "fog":
    case "mist":
      icon = <CloudFog className={cn("text-gray-400", className)} />;
      break;
    case "light rain":
    case "light-rain":
    case "drizzle":
      icon = <CloudDrizzle className={cn("text-blue-400", className)} />;
      break;
    case "rain":
      icon = <CloudRain className={cn("text-blue-500", className)} />;
      break;
    case "heavy rain":
    case "heavy-rain":
      icon = <CloudRain className={cn("text-blue-600", className)} />;
      break;
    case "snow":
      icon = <CloudSnow className={cn("text-blue-200", className)} />;
      break;
    case "thunderstorm":
      icon = <CloudLightning className={cn("text-purple-500", className)} />;
      break;
    default:
      icon = <Sun className={cn("text-amber-500", className)} />;
  }

  return icon;
};
