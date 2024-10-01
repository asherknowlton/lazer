import { useState, useContext, createContext, ReactNode } from "react";
import axios from "axios";

const authContext = createContext(null);

interface Props {
  children: ReactNode;
}
export function ProvideAuth({ children }: Props) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const history = useHistory();

  const autoSignIn = axios.get("/api/me").then(({ data }) => {
    setUser(data);
  });
}
