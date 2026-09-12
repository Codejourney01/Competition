export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-xl text-slate-900 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-xs font-medium text-slate-400">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="rounded-xl bg-sky-50 p-3.5 text-sky-600 border border-sky-200">
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}