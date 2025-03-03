
import { WeatherData } from "@/types/weather";

// Mock data to use during development
export const mockWeatherData: WeatherData = {
  location: {
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522
  },
  current: {
    temperature: 18,
    feelsLike: 16,
    humidity: 65,
    windSpeed: 15,
    windDirection: "NE",
    condition: "Partly Cloudy",
    icon: "partly-cloudy",
    pressure: 1014,
    uvIndex: 4,
    visibility: 10,
    updatedAt: new Date().toISOString()
  },
  forecast: {
    daily: Array.from({ length: 15 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
      
      return {
        date: date.toISOString().split('T')[0],
        dayOfWeek: dayNames[date.getDay()],
        temperatureMax: Math.round(18 + Math.random() * 10),
        temperatureMin: Math.round(10 + Math.random() * 5),
        humidity: Math.round(50 + Math.random() * 40),
        windSpeed: Math.round(5 + Math.random() * 20),
        windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
        condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Rain", "Heavy Rain", "Thunderstorm"][Math.floor(Math.random() * 7)],
        icon: ["sunny", "partly-cloudy", "cloudy", "light-rain", "rain", "heavy-rain", "thunderstorm"][Math.floor(Math.random() * 7)],
        rainProbability: Math.round(Math.random() * 100),
        precipitation: Math.round(Math.random() * 10 * 10) / 10,
        sunrise: "06:45",
        sunset: "20:15"
      };
    }),
    hourly: Array.from({ length: 24 }, (_, i) => {
      const time = new Date();
      time.setHours(time.getHours() + i);
      
      return {
        time: time.toISOString(),
        temperature: Math.round(15 + Math.random() * 10),
        feelsLike: Math.round(13 + Math.random() * 10),
        condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Rain"][Math.floor(Math.random() * 5)],
        icon: ["sunny", "partly-cloudy", "cloudy", "light-rain", "rain"][Math.floor(Math.random() * 5)],
        rainProbability: Math.round(Math.random() * 100),
        precipitation: Math.round(Math.random() * 5 * 10) / 10,
        humidity: Math.round(50 + Math.random() * 40),
        windSpeed: Math.round(5 + Math.random() * 15)
      };
    })
  }
};
