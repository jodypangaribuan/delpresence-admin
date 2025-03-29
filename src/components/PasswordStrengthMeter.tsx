"use client";

import { useEffect, useState } from "react";

interface PasswordStrengthMeterProps {
  password: string;
  onChange?: (strength: number) => void;
}

export function PasswordStrengthMeter({
  password,
  onChange,
}: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const calculateStrength = () => {
      if (!password) {
        const newStrength = 0;
        setStrength(newStrength);
        onChange?.(newStrength);
        return;
      }

      let score = 0;

      // Length check
      if (password.length >= 8) score += 1;
      if (password.length >= 12) score += 1;

      // Character type checks
      if (/[A-Z]/.test(password)) score += 1; // Has uppercase
      if (/[a-z]/.test(password)) score += 1; // Has lowercase
      if (/[0-9]/.test(password)) score += 1; // Has number
      if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char

      // Normalize to 0-4 scale
      const normalizedScore = Math.min(4, Math.floor(score / 1.5));
      setStrength(normalizedScore);
      onChange?.(normalizedScore);
    };

    calculateStrength();
  }, [password, onChange]);

  const getStrengthText = (): string => {
    switch (strength) {
      case 0:
        return "Terlalu lemah";
      case 1:
        return "Lemah";
      case 2:
        return "Sedang";
      case 3:
        return "Kuat";
      case 4:
        return "Sangat kuat";
      default:
        return "";
    }
  };

  const getStrengthColor = (): string => {
    switch (strength) {
      case 0:
        return "bg-gray-200";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-green-600";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="mt-1 space-y-1">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`h-full w-1/4 ${
              index < strength ? getStrengthColor() : "bg-gray-200"
            } ${index > 0 ? "ml-1" : ""}`}
          />
        ))}
      </div>

      {password && (
        <p
          className={`text-xs ${
            strength === 0
              ? "text-gray-500"
              : strength === 1
              ? "text-red-500"
              : strength === 2
              ? "text-orange-500"
              : "text-green-600"
          }`}
        >
          {getStrengthText()}
        </p>
      )}
    </div>
  );
}
