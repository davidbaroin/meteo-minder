
import React, { createContext, useContext, useState, useEffect } from "react";
import { WeatherData, NotificationSettings } from "@/types/weather";
import { mockWeatherData } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface WeatherContextType {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  location: {
    lat: number;
    lon: number;
  } | null;
  locationName: string;
  setLocationName: (name: string) => void;
  fetchWeatherData: (lat?: number, lon?: number) => Promise<void>;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  displayMode: "cards" | "graphs";
  setDisplayMode: (mode: "cards" | "graphs") => void;
  activeGraph: "temperature" | "rain" | "precipitation";
  setActiveGraph: (graph: "temperature" | "rain" | "precipitation") => void;
}

const defaultNotificationSettings: NotificationSettings = {
  tempMin: { enabled: false, threshold: 5 },
  tempMax: { enabled: false, threshold: 30 },
  rain: { enabled: false, threshold: 70 },
  enabled: false
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [displayMode, setDisplayMode] = useState<"cards" | "graphs">("cards");
  const [activeGraph, setActiveGraph] = useState<"temperature" | "rain" | "precipitation">("temperature");
  const { toast } = useToast();

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    const savedSettings = localStorage.getItem("notification-settings");
    return savedSettings ? JSON.parse(savedSettings) : defaultNotificationSettings;
  });

  // Save notification settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notification-settings", JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
  };

  const fetchWeatherData = async (lat?: number, lon?: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to a weather service
      // For this demo, we're using mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Using mock data for demonstration
      setWeatherData(mockWeatherData);
      
      if (lat && lon) {
        setLocation({ lat, lon });
      }
      
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setIsLoading(false);
      console.error("Error fetching weather data:", err);
    }
  };

  // Get user's location on initial load
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Unable to get your location. Please allow location access or search for a location.");
            // Fallback to default location
            fetchWeatherData();
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        // Fallback to default location
        fetchWeatherData();
      }
    };

    getLocation();
  }, []);

  // Check for weather alerts based on notification settings
  useEffect(() => {
    if (!weatherData || !notificationSettings.enabled) return;

    const checkAlerts = () => {
      const { daily } = weatherData.forecast;
      const tomorrow = daily[1]; // Tomorrow's forecast
      
      if (notificationSettings.tempMin.enabled && 
          tomorrow.temperatureMin < notificationSettings.tempMin.threshold) {
        toast({
          title: "Alerte température basse",
          description: `Demain, la température minimale sera de ${tomorrow.temperatureMin}°C (seuil: ${notificationSettings.tempMin.threshold}°C)`,
          variant: "destructive",
        });
      }
      
      if (notificationSettings.tempMax.enabled && 
          tomorrow.temperatureMax > notificationSettings.tempMax.threshold) {
        toast({
          title: "Alerte température élevée",
          description: `Demain, la température maximale sera de ${tomorrow.temperatureMax}°C (seuil: ${notificationSettings.tempMax.threshold}°C)`,
          variant: "destructive",
        });
      }
      
      if (notificationSettings.rain.enabled && 
          tomorrow.rainProbability > notificationSettings.rain.threshold) {
        toast({
          title: "Alerte risque de pluie",
          description: `Demain, la probabilité de pluie sera de ${tomorrow.rainProbability}% (seuil: ${notificationSettings.rain.threshold}%)`,
          variant: "destructive",
        });
      }
    };
    
    checkAlerts();
  }, [weatherData, notificationSettings, toast]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        isLoading,
        error,
        location,
        locationName,
        setLocationName,
        fetchWeatherData,
        notificationSettings,
        updateNotificationSettings,
        displayMode,
        setDisplayMode,
        activeGraph,
        setActiveGraph
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
