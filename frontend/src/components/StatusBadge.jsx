export default function StatusBadge({ status }) {
  const statusStyles = {
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",
    Submitted: "bg-sky-50 text-sky-700 border border-sky-200",
    Approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Under Review": "bg-indigo-50 text-indigo-700 border border-indigo-200",
    "Revision Required": "bg-rose-50 text-rose-700 border border-rose-200",
    Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Active: "bg-sky-50 text-sky-700 border border-sky-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
        statusStyles[status] || "bg-slate-100 text-slate-600 border border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}