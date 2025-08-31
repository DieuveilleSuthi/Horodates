import React, { useState } from "react";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://horodates.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de connexion");
  
      // ⚡ Sauvegarde du token
      localStorage.setItem("token", data.token);
  
      // Passe l’utilisateur et le token au parent
      onLogin(data.user, data.token);
    } catch (e) {
      setError(e.message);
    }
  }
  

  return (
    <form className="card" onSubmit={handleLogin}>
      <h3 className="card-title">Connexion</h3>
      <input
        type="email"
        placeholder="Email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-primary">Se connecter</button>
      <button type="button" className="btn-link" onClick={onSwitch}>
        Pas encore de compte ? S'inscrire
      </button>
    </form>
  );
}
