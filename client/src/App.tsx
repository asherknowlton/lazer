import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import ChatWindow from "pages/ChatWindow";
import LoginForm from "./pages/LoginForm";
import axios from "axios";
import { AuthProvider } from "./hooks/useAuth";
import "assets/css/App.scss";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatWindow />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
