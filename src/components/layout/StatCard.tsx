interface StatCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  icon?: string;
}

export function StatCard({ label, value, trend, icon }: StatCardProps) {
  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-gray-400",
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        {icon && (
          <div className="text-2xl opacity-50">{icon}</div>
        )}
      </div>
      {trend && (
        <div className={`mt-2 text-xs font-medium ${trendColors[trend]}`}>
          {trend === "up" && "↗ Naik"}
          {trend === "down" && "↘ Turun"}
          {trend === "neutral" && "→ Stabil"}
        </div>
      )}
    </div>
  );
}
