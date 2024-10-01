import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "src/context/userContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {!user && (
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
      )}
    </>
  );
};

export default Navbar;
