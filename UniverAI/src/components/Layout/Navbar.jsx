import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <Link to="/">MeuApp</Link>
      </div>

      <div>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span>{user?.user_metadata?.full_name || user?.email}</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  );
}
