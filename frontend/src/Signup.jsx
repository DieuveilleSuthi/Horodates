import React, { useState } from "react";

export default function Signup({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur d'inscription");
      alert("Compte créé ! Connecte-toi maintenant.");
      onSwitch();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <form className="card" onSubmit={handleSignup}>
      <h3 className="card-title">Inscription</h3>
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
      <button type="submit" className="btn btn-primary">S'inscrire</button>
      <button type="button" className="btn-link" onClick={onSwitch}>
        Déjà un compte ? Se connecter
      </button>
    </form>
  );
}
