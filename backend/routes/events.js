const express = require("express");
const jwt = require("jsonwebtoken");
const Event = require("../models/Event");

const router = express.Router();

// Middleware auth
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token manquant" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
}

// Création événement
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const event = new Event({ ...req.body, userId: req.user.id });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: "Erreur création événement" });
  }
});

// Liste événements
router.get("/", authMiddleware, async (req, res) => {
  const events = await Event.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(events);
});

// Mettre à jour un événement
router.put("/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, date } = req.body;
  
      const event = await Event.findOneAndUpdate(
        { _id: id, userId: req.user.id }, // ✅ req.user.id
        { title, description, date },
        { new: true }
      );
  
      if (!event) return res.status(404).json({ error: "Événement introuvable ou non autorisé" });
      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Erreur mise à jour" });
    }
  });
  
  
  // Supprimer un événement
  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
  
      const event = await Event.findOneAndDelete({ _id: id, userId: req.user.id }); // ✅ req.user.id
      if (!event) return res.status(404).json({ error: "Événement introuvable ou non autorisé" });
  
      res.json({ message: "Événement supprimé avec succès" });
    } catch (err) {
      res.status(400).json({ error: "Erreur suppression" });
    }
  });
  

module.exports = router;
