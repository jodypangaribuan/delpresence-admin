import { Card } from "./card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
  trend: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color,
  textColor,
  trend,
}: StatCardProps) {
  return (
    <Card className="p-6 bg-white border border-gray-100 hover:shadow-sm transition-all rounded-lg">
      <div className="flex flex-col">
        <div className="flex items-center mb-4">
          <div className={`p-2 ${color} rounded-lg`}>
            <Icon className={`h-5 w-5 ${textColor}`} />
          </div>
          <h3 className={`ml-3 text-lg font-medium ${textColor}`}>{title}</h3>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          <span className="ml-2 text-sm text-gray-500">{trend}</span>
        </div>
      </div>
    </Card>
  );
}
