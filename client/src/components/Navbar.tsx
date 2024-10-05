import { Link } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();
  return (
    <>
      {!auth.user && (
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
      )}
    </>
  );
};

export default Navbar;
