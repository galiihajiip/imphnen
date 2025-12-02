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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-400 truncate">{label}</p>
          <p className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-semibold text-white break-words">
            {value}
          </p>
        </div>
        {icon && (
          <div className="text-xl sm:text-2xl opacity-50 flex-shrink-0">{icon}</div>
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
