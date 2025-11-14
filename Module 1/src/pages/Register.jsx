import { useState } from "react";
import { register } from "../api/vms";
import { useAuth } from "../state/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ name:"", email:"", password:"", phone:"" });
    const [err, setErr] = useState("");
    const { setUser } = useAuth();
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const { data } = await register(form);
            setUser({ id: data.userId, email: form.email, role: data.role });
            nav("/profile");
        } catch (ex) {
            const server = ex?.response?.data;
            setErr(server?.fields ? "Fix form errors" : server?.error || "Registration failed");
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <div className="bg-white border rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold mb-4">Create account</h1>
                {err && <div className="mb-3 text-sm text-red-600">{err}</div>}
                <form onSubmit={submit} className="grid gap-4">
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                               value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                               type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                               type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} required />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Phone</label>
                        <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                               value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
                    </div>
                    <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
