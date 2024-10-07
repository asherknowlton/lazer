import { useState, SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import "assets/css/Landing.scss";

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement & {
      email: { value: string };
      password: { value: string };
    };
    await auth.loginUser(target.email.value, target.password.value).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <div className="auth-input">
          <label>EMAIL</label>
          <input
            type="email"
            name="email"
            placeholder="ENTER EMAIL"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="auth-input">
          <label>PASSWORD</label>
          <input
            type="password"
            name="password"
            placeholder="ENTER PASSWORD"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button type="submit" className="auth-button">
          ESTABLISH UPLINK
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
