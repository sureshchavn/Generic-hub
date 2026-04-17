import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback
} from "react";
import { User } from "../types";
import API from "@/src/api";

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string, rememberMe: boolean) => Promise<boolean>;
  register: (userData: Omit<User, "role">, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Load user on refresh
  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // ✅ LOGIN (FIXED)
  const login = useCallback(async (identifier: string, password: string, rememberMe: boolean) => {
    try {
      const res = await API.post("/auth/login", {
        usernameOrEmail: identifier, // 🔥 FIXED
        password
      });

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("token", res.data.token);
      storage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, []);

  // ✅ REGISTER
  const register = useCallback(async (userData: Omit<User, "role">, password: string) => {
    try {
      await API.post("/auth/register", {
        ...userData,
        password
      });

      return { success: true, message: "Account created successfully!" };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.msg || "Registration failed"
      };
    }
  }, []);

  // ✅ LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};