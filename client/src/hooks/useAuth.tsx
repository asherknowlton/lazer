import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
  SyntheticEvent,
} from "react";
import axios from "axios";

//TODO: type this
const AuthContext = createContext<any | null>({ user: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  const [user, setUser] = useState(auth.user);
  // const [errors, setErrors] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  //const history = useHistory();

  useEffect(() => {
    axios.get("/api/me").then(({ data }) => {
      setUser(data);
    });
  }, []);

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("registered!");
      }
    } catch (error) {
      console.log("registerUser error:");
      console.log(error);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      if (data.error) {
        console.log(data.error);
      }
    } catch (error) {
      console.log("loginUser error");
      console.log(error);
    }
  };

  const logoutUser = () => {
    document.cookie =
      "USER_SESSION=; expires:Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  };

  const sendMessage = async (
    senderId: string,
    receiverId: string,
    message: string
  ) => {
    try {
      const { data } = await axios.post("/api/send_message", {
        senderId,
        receiverId,
        message,
      });
      if (data.error) {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user: user,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    sendMessage: sendMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
