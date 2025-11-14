import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./state/auth.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Shifts from "./pages/Shifts.jsx";
import "./index.css";

const Shell = ({ children }) => {
    const { user, setUser } = useAuth();
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b bg-white">
                <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
                    <Link to="/" className="text-xl font-semibold">VMS</Link>
                    <nav className="flex items-center gap-3 ml-auto">
                        <Link to="/" className="text-blue-600 hover:underline">Events</Link>
                        {user && <Link to="/profile" className="text-blue-600 hover:underline">My Profile</Link>}
                        {!user && <Link to="/login" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Login</Link>}
                        {!user && <Link to="/register" className="px-3 py-1 rounded text-blue-600 border border-blue-600 hover:bg-blue-50">Register</Link>}
                        {user && (
                            <button
                                onClick={() => setUser(null)}
                                className="px-3 py-1 rounded text-blue-600 border border-blue-600 hover:bg-blue-50"
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                </div>
            </header>
            <main className="max-w-5xl mx-auto px-4 py-6">
                {children}
            </main>
            <footer className="border-t">
                <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-slate-500">
                    © {new Date().getFullYear()} VMS
                </div>
            </footer>
        </div>
    );
};

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <Shell>
                <Routes>
                    <Route path="/" element={<Events />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/events/:id/shifts" element={<Shifts />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Shell>
        </BrowserRouter>
    </AuthProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
