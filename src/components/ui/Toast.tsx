'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-400',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-400',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-400',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-400',
};

export default function Toast({ message, type = 'info', duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const Icon = icons[type];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-lg border shadow-lg transition-all duration-300 ${
        colors[type]
      } ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={() => {
              setIsAnimating(false);
              setTimeout(() => {
                setIsVisible(false);
                onClose();
              }, 300);
            }}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-current"
            aria-label="Fechar notificação"
            type="button"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

// Hook para gerenciar toasts
export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const ToastComponent = toast ? (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={hideToast}
    />
  ) : null;

  return { showToast, hideToast, ToastComponent };
}
