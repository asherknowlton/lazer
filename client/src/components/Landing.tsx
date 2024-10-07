import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import "assets/css/Landing.scss";
import RegisterForm from "src/pages/RegisterForm";
import LoginForm from "src/pages/LoginForm";

const Landing = () => {
  const auth = useAuth();
  let location = useLocation();

  return (
    <>
      {!auth.user && (
        <nav className="nav">
          <div className="auth-form">
            <Link to="/register">REGISTER</Link>
            {location.pathname === "/register" && <RegisterForm />}
          </div>
          <div className="auth-form">
            <Link to="/login">LOGIN</Link>
            {location.pathname === "/login" && <LoginForm />}
          </div>
        </nav>
      )}
    </>
  );
};

export default Landing;
