import { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem("vms_user");
        return raw ? JSON.parse(raw) : null;
    });

    const saveUser = (u) => {
        setUser(u);
        if (u) localStorage.setItem("vms_user", JSON.stringify(u));
        else localStorage.removeItem("vms_user");
    };

    return (
        <AuthCtx.Provider value={{ user, setUser: saveUser }}>
            {children}
        </AuthCtx.Provider>
    );
};

export const useAuth = () => useContext(AuthCtx);
