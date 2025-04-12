interface StatusItemProps {
  title: string;
  status: string;
  lastUpdate: string;
  detail: string;
}

export function StatusItem({
  title,
  status,
  lastUpdate,
  detail,
}: StatusItemProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <span
            className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
              status === "operational"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>
        <span className="text-xs text-gray-500 mt-1">{detail}</span>
      </div>
      <span className="text-xs text-gray-500">{lastUpdate}</span>
    </div>
  );
}
