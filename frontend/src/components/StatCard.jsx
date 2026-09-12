export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}