const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Inscription
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(400).json({ error: "Erreur inscription" });
  }
});

// Connexion
// Connexion
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Utilisateur introuvable" });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: "Mot de passe incorrect" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      // ⚡ On renvoie aussi l'utilisateur (sans le mot de passe)
      res.json({ 
        token, 
        user: { id: user._id, email: user.email } 
      });
    } catch (err) {
      res.status(400).json({ error: "Erreur connexion" });
    }
  });
  

module.exports = router;
