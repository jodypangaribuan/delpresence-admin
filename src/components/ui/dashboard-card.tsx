import Link from "next/link";
import { Card } from "./card";

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
}

export function DashboardCard({
  icon,
  title,
  subtitle,
  href,
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <Card className="p-6 bg-white border border-gray-100 hover:shadow-sm transition-all rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
            <h3 className="ml-3 text-lg font-medium text-primary">{title}</h3>
          </div>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </Card>
    </Link>
  );
}
