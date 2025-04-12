import { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  action: string;
  description: string;
  time: string;
  icon: LucideIcon;
}

export function ActivityItem({
  action,
  description,
  time,
  icon: Icon,
}: ActivityItemProps) {
  return (
    <div className="flex items-start">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="ml-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{action}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
