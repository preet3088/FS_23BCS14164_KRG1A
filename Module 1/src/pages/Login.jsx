import { useState } from "react";
import { login } from "../api/vms";
import { useAuth } from "../state/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [err, setErr] = useState("");
    const { setUser } = useAuth();
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const { data } = await login(form);
            setUser({ id: data.userId, email: form.email, role: data.role });
            nav("/");
        } catch (ex) {
            setErr(ex?.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white border rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
                {err && <div className="mb-3 text-sm text-red-600">{err}</div>}
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            type="email"
                            value={form.email}
                            onChange={(e)=>setForm({...form, email:e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            type="password"
                            value={form.password}
                            onChange={(e)=>setForm({...form, password:e.target.value})}
                            required
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

