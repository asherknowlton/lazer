import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "pages/Register";
import ChatWindow from "pages/ChatWindow";
import Login from "pages/Login";
import axios from "axios";
import UserContextProvider from "./context/userContext";
import "assets/css/App.scss";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatWindow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
