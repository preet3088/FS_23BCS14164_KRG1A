import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../api/vms";
import { useAuth } from "../state/auth";

export default function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await getMyProfile(user.id);
                setProfile(data);
            } catch (ex) {
                setErr(ex?.response?.data?.error || "Failed to load profile");
            }
        };
        if (user) load();
    }, [user]);

    const save = async (e) => {
        e.preventDefault();
        setMsg(""); setErr("");
        try {
            const { data } = await updateMyProfile(user.id, profile);
            setProfile(data);
            setMsg("Profile saved");
        } catch (ex) {
            setErr(ex?.response?.data?.error || "Failed to save");
        }
    };

    if (!user) return <div className="text-center">Please login.</div>;
    if (!profile) return <div className="text-center">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white border rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
                {msg && <div className="mb-3 text-sm text-green-700">{msg}</div>}
                {err && <div className="mb-3 text-sm text-red-600">{err}</div>}

                <form onSubmit={save} className="grid gap-4">
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                               value={profile.name || ""} onChange={(e)=>setProfile({...profile, name:e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Phone</label>
                        <input className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                               value={profile.phone || ""} onChange={(e)=>setProfile({...profile, phone:e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Skills</label>
                        <textarea className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                  value={profile.skills || ""} onChange={(e)=>setProfile({...profile, skills:e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Availability</label>
                        <textarea className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-600"
                                  value={profile.availabilityText || ""} onChange={(e)=>setProfile({...profile, availabilityText:e.target.value})} />
                    </div>
                    <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">Save</button>
                </form>
            </div>
        </div>
    );
}
