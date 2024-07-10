// roleController.js

import Role from "../models/Role.js";

// Créer un nouveau rôle
const createRole = async (req, res) => {
  try {
    const { nom } = req.body;

    // Vérifier si les champs requis sont fournis
    if (!nom) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const nouveauRole = new Role({ nom });
    const roleEnregistre = await nouveauRole.save();
    res.status(201).json(roleEnregistre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les rôles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createRole, getRoles };
