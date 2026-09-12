export default function ProgressBar({
  value = 0,
  showPercentage = true,
}) {
  return (
    <div className="w-full">
      {showPercentage && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Progress</span>
          <span className="font-semibold text-gray-800">
            {value}%
          </span>
        </div>
      )}

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}