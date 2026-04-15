import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="h-10 w-10 text-destructive mb-3" />
      <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
