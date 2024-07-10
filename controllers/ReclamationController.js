import Reclamation from "../models/Reclamation.js";

const createReclamation = async (req, res) => {
  try {
    const nouvelleReclamation = new Reclamation(req.body);
    const reclamationEnregistree = await nouvelleReclamation.save();
    res.status(201).json(reclamationEnregistree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReclamationById = async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ message: "Réclamation non trouvée" });
    }
    res.status(200).json(reclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReclamation = async (req, res) => {
  try {
    const reclamation = await Reclamation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reclamation) {
      return res.status(404).json({ message: "Réclamation non trouvée" });
    }
    res.status(200).json(reclamation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReclamation = async (req, res) => {
  try {
    const reclamation = await Reclamation.findByIdAndDelete(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ message: "Réclamation non trouvée" });
    }
    res.status(200).json({ message: "Réclamation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createReclamation,
  getReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation,
};
