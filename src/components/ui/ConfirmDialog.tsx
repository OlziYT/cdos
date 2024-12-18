import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { useThemeStore } from "../../stores/theme";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmDialogProps) => {
  const { isDark } = useThemeStore();
  const [progress, setProgress] = useState(0);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setCanDelete(false);
      
      const startTime = Date.now();
      const duration = 3000;
      
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (elapsed >= duration) {
          setCanDelete(true);
          clearInterval(timer);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCanDelete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full max-w-md rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
          } p-6 shadow-xl`}
        >
          <h3
            className={`text-lg font-medium leading-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
            {message}
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant={isDark ? "outline-dark" : "outline"}
              onClick={onClose}
            >
              Annuler
            </Button>
            <div className="relative">
              <div className={`relative overflow-hidden ${!canDelete ? 'cursor-not-allowed' : ''}`}>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (canDelete) {
                      onConfirm();
                      onClose();
                    }
                  }}
                  disabled={!canDelete}
                  className="relative z-10"
                >
                  Supprimer
                </Button>
                {!canDelete && (
                  <div 
                    className="absolute inset-0 bg-red-800/50"
                    style={{
                      clipPath: `inset(0 ${100 - progress}% 0 0)`,
                      transition: 'clip-path 0.1s linear'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
