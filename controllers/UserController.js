// userController.js

import User from "../models/User.js";

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  try {
    const { idFirebase, nom, prenoms, email, rolesId, telephone } = req.body;

    // Vérifier si les champs requis sont fournis
    if (!idFirebase || !nom || !prenoms || !email || !rolesId || !telephone) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const nouvelUtilisateur = new User({
      idFirebase,
      nom,
      prenoms,
      email,
      rolesId,
      telephone,
    });
    const utilisateurEnregistre = await nouvelUtilisateur.save();
    res.status(201).json(utilisateurEnregistre);
  } catch (error) {
    console.log("Reçu:", req.body);
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const utilisateurs = await User.find();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un utilisateur par son ID
const getUserById = async (req, res) => {
  try {
    const utilisateur = await User.findOne({
      idFirebase: req.params.id,
    }).populate("roles");
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  try {
    const { idFirebase, nom, prenoms, email, roles, telephone } = req.body;

    // Vérifier si les champs requis sont fournis
    if (!idFirebase || !nom || !prenoms || !email || !roles || !telephone) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const utilisateur = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const utilisateur = await User.findByIdAndDelete(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
