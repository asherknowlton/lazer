import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log("loginUser error");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          placeholder="enter email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="enter password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
