import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
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
  const [authing, setAuthing] = useState(true);
  // const [errors, setErrors] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  //const history = useHistory();

  useEffect(() => {
    axios.get("/api/me").then(({ data }) => {
      setUser(data);
      setAuthing(false);
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
    messageText: string
  ) => {
    try {
      const { data } = await axios.post("/api/send_message", {
        senderId,
        receiverId,
        messageText,
      });
      if (data.error) {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async (senderId: string, receiverId: string) => {
    try {
      const { data } = await axios.get("/api/get_messages", {
        params: {
          senderId,
          receiverId,
        },
      });
      if (data.error) {
        console.log(data.error);
      }
      return data.messages;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async (_id: string) => {
    try {
      const { data } = await axios.get("/api/get_user_data", {
        params: { _id },
      });
      if (data.error) {
        console.log(data.error);
      }
      return data.user;
    } catch (error) {
      console.log("getUserData error");
      console.log(error);
    }
  };

  const value = {
    user: user,
    authing: authing,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    sendMessage: sendMessage,
    getMessages: getMessages,
    getUserData: getUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
