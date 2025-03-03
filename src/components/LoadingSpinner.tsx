
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = "Chargement..." }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] animate-fade-in">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
