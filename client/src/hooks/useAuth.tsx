import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

//TODO: type this
const AuthContext = createContext<any | null>({ user: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  const [user, setUser] = useState(auth.user);
  const [authing, setAuthing] = useState(true);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/me", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const user = await response.json();
        console.log(user);
        setUser(user);
        setAuthing(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserToken();
  }, []);

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      response.ok && console.log(response);
    } catch (error) {
      //TODO: notify user of error
      console.log(error);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      response.ok && console.log(response);
    } catch (error) {
      //TODO: notify user of error
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
      const response = await fetch("http://localhost:8000/api/send_message", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: senderId,
          receiverId: receiverId,
          messageText: messageText,
        }),
      });
      //TODO: response.ok && do something
    } catch (error) {
      //TODO: notify user of error
      console.log(error);
    }
  };

  const getMessages = async (senderId: string, receiverId: string) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/get_messages?" +
          new URLSearchParams({
            senderId: senderId,
            receiverId: receiverId,
          }).toString(),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      return json.messages;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async (_id: string) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/get_user_data?" +
          new URLSearchParams({
            _id: _id,
          }).toString(),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      return json.user;
    } catch (error) {
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
