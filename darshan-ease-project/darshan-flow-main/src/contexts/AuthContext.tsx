import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, age: number, role: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("darshan_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("darshan_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password) as User;
    setUser(data);
    localStorage.setItem("darshan_user", JSON.stringify(data));
  };

  const register = async (name: string, email: string, password: string, age: number, role: string) => {
    const data = await authApi.register(name, email, password, age, role) as User;
    setUser(data);
    localStorage.setItem("darshan_user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("darshan_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};
