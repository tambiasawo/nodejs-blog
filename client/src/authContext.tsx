import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getCurrentUser } from "./action";

// Define a User shape
interface User {
  name: string;
  email: string;
}

// Context value includes the current user or null, plus an updater
interface UserCtxType {
  user: User | null;
  updateUser: (user: User | null) => void;
}

// Create context with a sensible default
const UserCtx = createContext<UserCtxType>({
  user: null,
  updateUser: () => {},
});

// Custom hook to consume the auth context
const useAuth = () => useContext(UserCtx);

// Provider component wrapping your app
export const UserCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Expose a stable callback for updating user
  const updateUser = useCallback((newUser: User | null) => {
    setUser(newUser);
  }, []);

  // Fetch the current user from server on mount
  const fetchCurrentUser = useCallback(async () => {
    try {
      const data = await getCurrentUser();
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to fetch current user", err);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <UserCtx.Provider value={{ user, updateUser }}>{children}</UserCtx.Provider>
  );
};

export default useAuth;
