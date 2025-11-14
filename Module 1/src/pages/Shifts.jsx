import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createShift, enrollShift, listShiftsByEvent } from "../api/vms";
import { useAuth } from "../state/auth";

export default function Shifts() {
    const { id: eventId } = useParams();
    const [shifts, setShifts] = useState([]);
    const [form, setForm] = useState({ startTime:"", endTime:"", capacity:1, requiredSkills:"" });
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");
    const { user } = useAuth();

    const load = async () => {
        try {
            const { data } = await listShiftsByEvent(eventId);
            setShifts(data);
        } catch (ex) {
            setErr(ex?.response?.data?.error || "Failed to load shifts");
        }
    };

    useEffect(() => { load(); }, [eventId]);

    const submit = async (e) => {
        e.preventDefault();
        setErr(""); setMsg("");
        try {
            await createShift(eventId, {
                startTime: form.startTime,
                endTime: form.endTime,
                capacity: Number(form.capacity),
                requiredSkills: form.requiredSkills || null,
            });
            setForm({ startTime:"", endTime:"", capacity:1, requiredSkills:"" });
            setMsg("Shift created");
            load();
        } catch (ex) {
            setErr(ex?.response?.data?.error || "Failed to create shift");
        }
    };

    const enroll = async (shiftId) => {
        setErr(""); setMsg("");
        try {
            await enrollShift(shiftId, user.id);
            setMsg("Enrolled");
            load();
        } catch (ex) {
            setErr(ex?.response?.data?.error || "Failed to enroll");
        }
    };

    return (
        <div className="grid gap-6">
            {msg && <div className="text-sm text-green-700">{msg}</div>}
            {err && <div className="text-sm text-red-600">{err}</div>}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shifts.map(s => (
                    <div key={s.id} className="bg-white border rounded-lg shadow p-4">
                        <div className="font-semibold">{s.startTime} — {s.endTime}</div>
                        <div className="text-sm text-slate-600">Capacity: {s.capacity}</div>
                        <div className="text-sm text-slate-600">Skills: {s.requiredSkills || "N/A"}</div>
                        {user && (
                            <button onClick={()=>enroll(s.id)}
                                    className="mt-3 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                                Enroll
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {user && user.role === "ADMIN" && (
                <div className="bg-white border rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-3">Create Shift</h2>
                    <form onSubmit={submit} className="grid gap-3">
                        <div>
                            <label className="block text-sm mb-1">Start (YYYY-MM-DDTHH:mm:ss)</label>
                            <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                   value={form.startTime} onChange={(e)=>setForm({...form, startTime:e.target.value})}
                                   placeholder="2025-10-20T09:00:00" required />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">End (YYYY-MM-DDTHH:mm:ss)</label>
                            <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                   value={form.endTime} onChange={(e)=>setForm({...form, endTime:e.target.value})}
                                   placeholder="2025-10-20T12:00:00" required />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Capacity</label>
                            <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                   type="number" min="1" value={form.capacity} onChange={(e)=>setForm({...form, capacity:e.target.value})} required />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Required Skills</label>
                            <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                   value={form.requiredSkills} onChange={(e)=>setForm({...form, requiredSkills:e.target.value})} />
                        </div>
                        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Create</button>
                    </form>
                </div>
            )}
        </div>
    );
}
