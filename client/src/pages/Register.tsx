import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("registered!");
        navigate("/login");
      }
    } catch (error) {
      console.log("registerUser error:");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type="text"
          placeholder="enter name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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

export default Register;
