import { Routes, Route } from "react-router-dom";

import Landing from "components/Landing";
import ChatWindow from "pages/ChatWindow";
import { AuthProvider } from "hooks/useAuth";
import "assets/css/App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<ChatWindow />} />
          <Route path="/register" element={<Landing />} />
          <Route path="/login" element={<Landing />} />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
