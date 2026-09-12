export default function StatusBadge({ status }) {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Submitted: "bg-blue-100 text-blue-700",
    Approved: "bg-green-100 text-green-700",
    "Under Review": "bg-purple-100 text-purple-700",
    "Revision Required": "bg-red-100 text-red-700",
    Completed: "bg-green-100 text-green-700",
    Active: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}