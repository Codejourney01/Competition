export default function DashboardHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-gray-500 md:text-base">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}