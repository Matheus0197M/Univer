import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas nao coincidem");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Criar Conta</h2>

      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Confirmar Senha</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Criando conta..." : "Cadastrar"}
        </button>
      </form>

      <p>
        Ja tem conta? <Link to="/login">Faca login</Link>
      </p>
    </div>
  );
}
