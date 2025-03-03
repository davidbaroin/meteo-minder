
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, SunDim } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  condition: string;
  className?: string;
}

export const WeatherIcon = ({ condition, className }: WeatherIconProps) => {
  let icon;
  let animationClass = "transition-all duration-300";

  switch (condition.toLowerCase()) {
    case "sunny":
    case "clear":
      icon = <Sun className={cn("text-amber-500 animate-pulse-gentle", animationClass, className)} />;
      break;
    case "partly cloudy":
    case "partly-cloudy":
      icon = <SunDim className={cn("text-amber-400 animate-pulse-gentle", animationClass, className)} />;
      break;
    case "cloudy":
      icon = <Cloud className={cn("text-gray-400 hover:scale-110 transition-transform", animationClass, className)} />;
      break;
    case "fog":
    case "mist":
      icon = <CloudFog className={cn("text-gray-400 hover:scale-110 transition-transform", animationClass, className)} />;
      break;
    case "light rain":
    case "light-rain":
    case "drizzle":
      icon = <CloudDrizzle className={cn("text-blue-400 animate-bounce", animationClass, className)} style={{ animationDuration: '3s' }} />;
      break;
    case "rain":
      icon = <CloudRain className={cn("text-blue-500 animate-bounce", animationClass, className)} style={{ animationDuration: '2s' }} />;
      break;
    case "heavy rain":
    case "heavy-rain":
      icon = <CloudRain className={cn("text-blue-600 animate-bounce", animationClass, className)} style={{ animationDuration: '1.5s' }} />;
      break;
    case "snow":
      icon = <CloudSnow className={cn("text-blue-200 animate-bounce", animationClass, className)} style={{ animationDuration: '3.5s' }} />;
      break;
    case "thunderstorm":
      icon = <CloudLightning className={cn("text-purple-500 animate-pulse", animationClass, className)} style={{ animationDuration: '0.8s' }} />;
      break;
    default:
      icon = <Sun className={cn("text-amber-500 animate-pulse-gentle", animationClass, className)} />;
  }

  return icon;
};
