export default function StatusBadge({ value }) {
  const styles = {
    Available: "bg-emerald-100 text-emerald-800",
    "On Trip": "bg-blue-100 text-blue-800",
    "In Shop": "bg-amber-100 text-amber-800",
    Retired: "bg-zinc-200 text-zinc-700",
    Suspended: "bg-red-100 text-red-800",
    Draft: "bg-slate-100 text-slate-800",
    Dispatched: "bg-blue-100 text-blue-800",
    Completed: "bg-emerald-100 text-emerald-800",
    Cancelled: "bg-red-100 text-red-800",
    Active: "bg-amber-100 text-amber-800",
    Closed: "bg-emerald-100 text-emerald-800"
  };
  return <span className={`badge ${styles[value] || "bg-slate-100 text-slate-700"}`}>{value}</span>;
}
