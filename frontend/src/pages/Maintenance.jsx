import { CheckCircle2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import StatusBadge from "../components/StatusBadge";

export default function Maintenance() {
  const [records, setRecords] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ vehicle: "", title: "", description: "", cost: 0 });
  const [error, setError] = useState("");

  async function load() {
    const [recordRows, vehicleRows] = await Promise.all([api("/maintenance"), api("/vehicles")]);
    setRecords(recordRows);
    setVehicles(vehicleRows.filter((v) => v.status !== "On Trip" && v.status !== "Retired"));
    setForm((prev) => ({ ...prev, vehicle: prev.vehicle || vehicleRows[0]?._id || "" }));
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await api("/maintenance", { method: "POST", body: JSON.stringify(form) });
      setForm({ vehicle: "", title: "", description: "", cost: 0 });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function close(id) {
    await api(`/maintenance/${id}/close`, { method: "POST", body: "{}" });
    load();
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-black">Maintenance</h2>
      <form onSubmit={submit} className="panel grid gap-3 md:grid-cols-4">
        <select className="input" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} required>
          <option value="">Vehicle</option>
          {vehicles.map((v) => <option key={v._id} value={v._id}>{v.registrationNumber} - {v.name}</option>)}
        </select>
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="input" type="number" placeholder="Cost" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />
        <button className="btn"><Plus size={18} /> Open Maintenance</button>
        {error && <p className="md:col-span-4 text-sm font-bold text-red-600">{error}</p>}
      </form>

      <div className="panel overflow-x-auto">
        <table className="table">
          <thead>
            <tr><th>Vehicle</th><th>Title</th><th>Cost</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td className="font-bold">{r.vehicle?.registrationNumber}</td>
                <td>{r.title}</td>
                <td>Rs {r.cost}</td>
                <td><StatusBadge value={r.status} /></td>
                <td>{r.status === "Active" && <button className="btn-secondary" onClick={() => close(r._id)}><CheckCircle2 size={16} /> Close</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
