import Link from "next/link";
import { Card } from "./card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  textColor?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  href,
  textColor = "text-primary",
}: FeatureCardProps) {
  return (
    <Link href={href}>
      <Card className="p-6 bg-white border border-gray-100 hover:shadow-sm transition-all rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
            <h3 className={`ml-3 text-lg font-medium ${textColor}`}>{title}</h3>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </Card>
    </Link>
  );
}
