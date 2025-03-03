import React, { createContext, useContext, useState, useEffect } from "react";
import { WeatherData, NotificationSettings } from "@/types/weather";
import { useToast } from "@/hooks/use-toast";

// Import de l'API Meteociel
import MeteocielAPI from "meteociel_api";

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
  fetchWeatherData: (lat?: number, lon?: number, cityName?: string) => Promise<void>;
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

// Initialisation de l'API Meteociel
const meteocielAPI = new MeteocielAPI();

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

  // Convertir les données Meteociel au format de notre application
  const transformMeteocielData = (meteocielData: any, cityName: string): WeatherData => {
    // Définir la localisation à partir des données
    const location = {
      name: cityName || meteocielData.city || "Paris",
      country: "France", // Supposons que c'est toujours en France
      lat: meteocielData.lat || 48.8566,
      lon: meteocielData.lon || 2.3522
    };

    // Obtenir les données actuelles
    const currentData = meteocielData.current || {};
    const current = {
      temperature: currentData.temperature || 0,
      feelsLike: currentData.feelsLike || 0,
      humidity: currentData.humidity || 0,
      windSpeed: currentData.windSpeed || 0,
      windDirection: currentData.windDirection || "N",
      condition: currentData.condition || "Unknown",
      icon: mapConditionToIcon(currentData.condition || ""),
      pressure: currentData.pressure || 1013,
      uvIndex: currentData.uvIndex || 0,
      visibility: currentData.visibility || 10,
      updatedAt: new Date().toISOString()
    };

    // Transformer les prévisions quotidiennes
    const dailyForecasts = (meteocielData.forecasts || []).map((day: any, index: number) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
      
      return {
        date: date.toISOString().split('T')[0],
        dayOfWeek: dayNames[date.getDay()],
        temperatureMax: day.temperatureMax || 0,
        temperatureMin: day.temperatureMin || 0,
        humidity: day.humidity || 0,
        windSpeed: day.windSpeed || 0,
        windDirection: day.windDirection || "N",
        condition: day.condition || "Unknown",
        icon: mapConditionToIcon(day.condition || ""),
        rainProbability: day.rainProbability || 0,
        precipitation: day.precipitation || 0,
        sunrise: day.sunrise || "06:45",
        sunset: day.sunset || "20:15"
      };
    });

    // Si les prévisions horaires ne sont pas disponibles, on en crée de factices
    const hourlyForecasts = (meteocielData.hourly || []).map((hour: any, index: number) => {
      const time = new Date();
      time.setHours(time.getHours() + index);
      
      return {
        time: time.toISOString(),
        temperature: hour.temperature || 0,
        feelsLike: hour.feelsLike || 0,
        condition: hour.condition || "Unknown",
        icon: mapConditionToIcon(hour.condition || ""),
        rainProbability: hour.rainProbability || 0,
        precipitation: hour.precipitation || 0,
        humidity: hour.humidity || 0,
        windSpeed: hour.windSpeed || 0
      };
    });

    // S'assurer qu'on a au moins 15 jours de prévisions
    while (dailyForecasts.length < 15) {
      const lastIndex = dailyForecasts.length;
      const date = new Date();
      date.setDate(date.getDate() + lastIndex);
      const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
      
      dailyForecasts.push({
        date: date.toISOString().split('T')[0],
        dayOfWeek: dayNames[date.getDay()],
        temperatureMax: 0,
        temperatureMin: 0,
        humidity: 0,
        windSpeed: 0,
        windDirection: "N",
        condition: "Unknown",
        icon: "cloudy",
        rainProbability: 0,
        precipitation: 0,
        sunrise: "06:45",
        sunset: "20:15"
      });
    }

    // S'assurer qu'on a au moins 24 heures de prévisions
    while (hourlyForecasts.length < 24) {
      const lastIndex = hourlyForecasts.length;
      const time = new Date();
      time.setHours(time.getHours() + lastIndex);
      
      hourlyForecasts.push({
        time: time.toISOString(),
        temperature: 0,
        feelsLike: 0,
        condition: "Unknown",
        icon: "cloudy",
        rainProbability: 0,
        precipitation: 0,
        humidity: 0,
        windSpeed: 0
      });
    }

    return {
      location,
      current,
      forecast: {
        daily: dailyForecasts,
        hourly: hourlyForecasts
      }
    };
  };

  // Mapper les conditions météo de Meteociel aux icônes de notre application
  const mapConditionToIcon = (condition: string): string => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes("soleil") || conditionLower.includes("ensoleillé")) return "sunny";
    if (conditionLower.includes("nuag")) return "partly-cloudy";
    if (conditionLower.includes("couvert")) return "cloudy";
    if (conditionLower.includes("pluie légère") || conditionLower.includes("bruine")) return "light-rain";
    if (conditionLower.includes("pluie")) return "rain";
    if (conditionLower.includes("forte pluie") || conditionLower.includes("averse")) return "heavy-rain";
    if (conditionLower.includes("orage")) return "thunderstorm";
    if (conditionLower.includes("neige")) return "snow";
    
    return "partly-cloudy"; // Fallback icon
  };

  const fetchWeatherData = async (lat?: number, lon?: number, cityName?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let result;
      
      if (cityName) {
        // Recherche par nom de ville
        result = await meteocielAPI.getWeatherByCityName(cityName);
        if (result.lat && result.lon) {
          setLocation({ lat: result.lat, lon: result.lon });
          setLocationName(cityName);
        }
      } else if (lat && lon) {
        // Recherche par coordonnées
        result = await meteocielAPI.getWeatherByCoordinates(lat, lon);
        setLocation({ lat, lon });
        // Essayer de récupérer le nom de la ville à partir des résultats
        if (result.city) {
          setLocationName(result.city);
        }
      } else {
        // Fallback sur Paris si aucune information n'est fournie
        result = await meteocielAPI.getWeatherByCityName("Paris");
        setLocationName("Paris");
        if (result.lat && result.lon) {
          setLocation({ lat: result.lat, lon: result.lon });
        }
      }

      // Transformer les données au format attendu par notre application
      const formattedData = transformMeteocielData(result, cityName || result.city || "");
      setWeatherData(formattedData);
      
      setIsLoading(false);
    } catch (err) {
      setError("Échec de récupération des données météo depuis Meteociel. Veuillez réessayer.");
      setIsLoading(false);
      console.error("Erreur lors de la récupération des données météo:", err);
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
            setError("Impossible d'obtenir votre localisation. Veuillez autoriser l'accès à la localisation ou rechercher une ville.");
            // Fallback to default location (Paris)
            fetchWeatherData(undefined, undefined, "Paris");
          }
        );
      } else {
        setError("La géolocalisation n'est pas prise en charge par votre navigateur.");
        // Fallback to default location (Paris)
        fetchWeatherData(undefined, undefined, "Paris");
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
