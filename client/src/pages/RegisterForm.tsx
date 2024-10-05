import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

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
    auth.registerUser(
      target.name.value,
      target.email.value,
      target.password.value
    );
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="enter name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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

export default RegisterForm;
