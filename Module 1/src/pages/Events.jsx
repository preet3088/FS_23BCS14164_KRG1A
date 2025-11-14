import { useEffect, useState } from "react";
import { createEvent, listEvents } from "../api/vms";
import { Link } from "react-router-dom";
import { useAuth } from "../state/auth";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ title:"", description:"", location:"", startDate:"", endDate:"" });
    const [err, setErr] = useState("");
    const { user } = useAuth();

    const load = async () => {
        try {
            const { data } = await listEvents();
            setEvents(data);
        } catch (ex) {
            setErr(ex?.response?.data?.error || "Failed to load events");
        }
    };
    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            await createEvent({ ...form, startDate: form.startDate || null, endDate: form.endDate || null });
            setForm({ title:"", description:"", location:"", startDate:"", endDate:"" });
            load();
        } catch (ex) {
            setErr(ex?.response?.data?.error || "Failed to create event");
        }
    };

    return (
        <div className="grid gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Events</h1>
            </div>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map(ev => (
                    <div key={ev.id} className="bg-white border rounded-lg shadow p-4">
                        <div className="text-lg font-semibold">{ev.title}</div>
                        <div className="text-sm text-slate-600">{ev.location || "N/A"}</div>
                        <div className="text-sm text-slate-600">{ev.startDate} to {ev.endDate}</div>
                        <Link to={`/events/${ev.id}/shifts`} className="inline-block mt-3 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                            View Shifts
                        </Link>
                    </div>
                ))}
            </div>

            {user && user.role === "ADMIN" && (
                <div className="bg-white border rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-3">Create Event</h2>
                    <form onSubmit={submit} className="grid gap-3">
                        <div>
                            <label className="block text-sm mb-1">Title</label>
                            <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                   value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Description</label>
                            <textarea className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                      value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Location</label>
                            <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                   value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm mb-1">Start Date</label>
                                <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                       type="date" value={form.startDate} onChange={(e)=>setForm({...form, startDate:e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">End Date</label>
                                <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                       type="date" value={form.endDate} onChange={(e)=>setForm({...form, endDate:e.target.value})} required />
                            </div>
                        </div>
                        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Create</button>
                    </form>
                </div>
            )}
        </div>
    );
}
