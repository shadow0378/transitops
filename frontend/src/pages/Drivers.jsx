import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import StatusBadge from "../components/StatusBadge";

const empty = {
  name: "",
  licenseNumber: "",
  licenseCategory: "LMV",
  licenseExpiryDate: "2028-12-31",
  contactNumber: "",
  safetyScore: 80,
  status: "Available"
};

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  async function load() {
    setDrivers(await api("/drivers"));
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await api("/drivers", { method: "POST", body: JSON.stringify(form) });
      setForm(empty);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-black">Drivers</h2>
      <form onSubmit={submit} className="panel grid gap-3 md:grid-cols-4">
        {["name", "licenseNumber", "licenseCategory", "licenseExpiryDate", "contactNumber", "safetyScore"].map((field) => (
          <input
            key={field}
            className="input"
            placeholder={field}
            type={field === "licenseExpiryDate" ? "date" : field === "safetyScore" ? "number" : "text"}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
          />
        ))}
        <button className="btn"><Plus size={18} /> Add Driver</button>
        {error && <p className="md:col-span-4 text-sm font-bold text-red-600">{error}</p>}
      </form>

      <div className="panel overflow-x-auto">
        <table className="table">
          <thead>
            <tr><th>Name</th><th>License</th><th>Category</th><th>Expiry</th><th>Contact</th><th>Safety</th><th>Status</th></tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d._id}>
                <td className="font-bold">{d.name}</td>
                <td>{d.licenseNumber}</td>
                <td>{d.licenseCategory}</td>
                <td>{new Date(d.licenseExpiryDate).toLocaleDateString()}</td>
                <td>{d.contactNumber}</td>
                <td>{d.safetyScore}</td>
                <td><StatusBadge value={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
