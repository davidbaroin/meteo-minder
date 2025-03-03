
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastList } from "@/components/ForecastList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useWeather } from "@/context/WeatherContext";
import { WeatherCharts } from "@/components/WeatherCharts";
import { ViewToggle } from "@/components/ViewToggle";

const Index = () => {
  const { weatherData, isLoading, error, displayMode } = useWeather();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Simulate page loading for a smoother UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Préparation de l'application météo..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      <main className="container max-w-5xl px-4 py-6 mx-auto">
        {isLoading ? (
          <LoadingSpinner message="Récupération des données météo..." />
        ) : error ? (
          <div className="my-10 text-center text-destructive">
            <p className="text-lg font-medium">{error}</p>
            <p className="mt-2 text-muted-foreground">Veuillez vérifier votre connexion et réessayer.</p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <CurrentWeather />
            
            <h2 className="text-xl font-medium mt-8 mb-4">
              Prévisions sur 15 jours
            </h2>
            
            <ViewToggle />
            
            {displayMode === "cards" ? (
              <ForecastList />
            ) : (
              <WeatherCharts />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
