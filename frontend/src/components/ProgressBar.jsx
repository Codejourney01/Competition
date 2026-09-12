export default function ProgressBar({
  value = 0,
  showPercentage = true,
}) {
  return (
    <div className="w-full text-card-foreground">
      {showPercentage && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold text-foreground">
            {value}%
          </span>
        </div>
      )}

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}