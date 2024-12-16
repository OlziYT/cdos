import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useThemeStore } from "../../stores/theme";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
}: ConfirmDialogProps) => {
  const { isDark } = useThemeStore();
  const [progress, setProgress] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setIsEnabled(false);
      const duration = 5000; // 5 seconds
      const interval = 50; // Update every 50ms
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setProgress((currentStep / steps) * 100);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setIsEnabled(true);
        }
      }, interval);

      return () => {
        clearInterval(timer);
        setProgress(0);
        setIsEnabled(false);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
        </div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

        <div
          className={`inline-block transform overflow-hidden rounded-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle`}
        >
          <div className="sm:flex sm:items-start">
            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
              isDark ? 'bg-red-900' : 'bg-red-100'
            } sm:mx-0 sm:h-10 sm:w-10`}>
              <AlertTriangle className={`h-6 w-6 ${isDark ? 'text-red-300' : 'text-red-600'}`} />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className={`text-lg font-medium leading-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h3>
              <div className="mt-2">
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {message}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <div className="relative w-full sm:w-auto sm:ml-3">
              <Button
                variant="outline"
                className="w-full relative overflow-hidden bg-transparent hover:bg-transparent border-0 !ring-0 !outline-none shadow-none"
                onClick={() => {
                  if (isEnabled) {
                    onConfirm();
                    onClose();
                  }
                }}
                disabled={!isEnabled}
              >
                <span className={`relative z-10 transition-colors duration-200 ${
                  isEnabled ? 'text-white' : 'text-gray-400'
                }`}>
                  {confirmLabel}
                </span>
                <div 
                  className="absolute inset-0 transition-all duration-200"
                  style={{ 
                    clipPath: `inset(0 ${100 - progress}% 0 0)`,
                    backgroundColor: isEnabled 
                      ? '#ef4444' // red-500
                      : progress < 100 
                        ? '#4b5563' // gray-600
                        : '#ef4444' // red-500
                  }}
                />
              </Button>
            </div>
            <Button
              variant={isDark ? "outline-dark" : "outline"}
              className="mt-3 w-full sm:mt-0 sm:w-auto"
              onClick={onClose}
            >
              {cancelLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
