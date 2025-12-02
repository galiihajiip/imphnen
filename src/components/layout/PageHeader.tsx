interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        )}
      </div>
      {action && <div className="sm:ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
}
