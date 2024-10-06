import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import ChatWindow from "pages/ChatWindow";
import LoginForm from "./pages/LoginForm";
import axios from "axios";
import { AuthProvider } from "./hooks/useAuth";
import "assets/css/App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ChatWindow />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
