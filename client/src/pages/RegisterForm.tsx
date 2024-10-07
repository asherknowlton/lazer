import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import "assets/css/Landing.scss";

const RegisterForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };
    await auth
      .registerUser(
        target.name.value,
        target.email.value,
        target.password.value
      )
      .then(() => {
        console.log("notify user of success");
        navigate("/login");
      });
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <div className="auth-input">
          <label>NAME</label>
          <input
            type="text"
            name="name"
            placeholder="ENTER NAME"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
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
          GENERATE NEW USER
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
