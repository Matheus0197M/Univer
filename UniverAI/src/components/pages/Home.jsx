import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Terminal 33</h1>
      <p>Uma plataforma simples para compartilhar suas ideias</p>

      {!isAuthenticated && (
        <div>
          <Link to="/register">Comecar Agora</Link>
          <Link to="/login">Ja tenho conta</Link>
        </div>
      )}
    </div>
  );
}
