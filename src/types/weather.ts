
export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: string;
  icon: string;
  pressure: number;
  uvIndex: number;
  visibility: number;
  updatedAt: string;
}

export interface Forecast {
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

export interface DailyForecast {
  date: string;
  dayOfWeek: string;
  temperatureMax: number;
  temperatureMin: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: string;
  icon: string;
  rainProbability: number;
  precipitation: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  icon: string;
  rainProbability: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface NotificationSettings {
  tempMin: {
    enabled: boolean;
    threshold: number;
  };
  tempMax: {
    enabled: boolean;
    threshold: number;
  };
  rain: {
    enabled: boolean;
    threshold: number;
  };
  enabled: boolean;
}
