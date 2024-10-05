import { useState, SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

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
    auth.loginUser(target.email.value, target.password.value).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="enter email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="enter password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
