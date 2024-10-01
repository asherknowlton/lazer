import { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";

export const UserContext = createContext({});

interface Props {
  children: ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/api/me").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
