"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface ToastContextType {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

function ToastList({
  toasts,
  dismiss,
}: {
  toasts: Toast[];
  dismiss: (id: string) => void;
}) {
  if (!toasts.length) return null;

  return createPortal(
    <div className="fixed top-0 right-0 z-50 flex flex-col items-end p-4 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "p-4 rounded-lg shadow-lg border flex items-start gap-3 transition-all duration-300 translate-x-0 opacity-100 w-full",
            toast.variant === "destructive"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-white border-gray-200"
          )}
        >
          <div className="flex-1">
            {toast.title && <h3 className="font-medium mb-1">{toast.title}</h3>}
            {toast.description && (
              <p className="text-sm">{toast.description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="shrink-0 text-gray-400 hover:text-gray-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toast = ({
    title,
    description,
    variant = "default",
  }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {mounted && <ToastList toasts={toasts} dismiss={dismiss} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
