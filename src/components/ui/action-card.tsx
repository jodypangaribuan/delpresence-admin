import Link from "next/link";
import { Card } from "./card";

interface ActionCardProps {
  title: string;
  href: string;
  color: string;
  textColor: string;
}

export function ActionCard({ title, href, color, textColor }: ActionCardProps) {
  return (
    <Link href={href}>
      <Card
        className={`p-6 ${color} border border-gray-100 hover:shadow-sm transition-all rounded-lg`}
      >
        <div className="flex flex-col">
          <h3 className={`text-lg font-medium ${textColor}`}>{title}</h3>
        </div>
      </Card>
    </Link>
  );
}
