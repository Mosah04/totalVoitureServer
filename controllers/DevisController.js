import Devis from "../models/Devis.js"; // Importez votre modèle Devis
import Demande from "../models/Demande.js"; // Importez votre modèle Demande si nécessaire
import User from "../models/User.js";

// Créer un devis
export const createDevis = async (req, res) => {
  const { idDemande, cout, delai, services } = req.body;

  try {
    // Vérifier si la demande existe
    const demande = await Demande.findById(idDemande);
    if (!demande) {
      return res.status(404).json({ message: "Demande not found" });
    }

    const newDevis = new Devis({
      idDemande,
      idTransitaire: req.headers.idUser,
      cout,
      delai,
      services,
    });

    await newDevis.save();
    res.status(201).json(newDevis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lire un devis par ID
export const getDevis = async (req, res) => {
  try {
    const devis = await Devis.find()
      .sort({ idDemande: 1, createdAt: 1 }) // Tri par idDemande puis par createdAt
      .exec();
    if (!devis) {
      return res.status(404).json({ message: "Devis not found" });
    }
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lire un devis par ID
export const getDevisById = async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id)
      .populate("idDemande")
      .populate("user");
    if (!devis) {
      return res.status(404).json({ message: "Devis not found" });
    }
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDevisByUserId = async (req, res) => {
  try {
    const utilisateur = await User.findOne({
      idFirebase: req.params.idUser,
    });
    if (!utilisateur) throw new Error("Inexistant user");
    if (utilisateur.isAdmin) return res.redirect("/devis");

    const devis = await Devis.find({ idTransitaire: req.params.idUser })
      .sort({ idDemande: -1, createdAt: 1 })
      .exec();
    if (!devis) {
      return res.status(404).json({ message: "Devis not found" });
    }
    return res.status(200).json(devis);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getDevisByDemandeId = async (req, res) => {
  try {
    const devis = await Devis.find({
      idDemande: req.params.idDemande,
      validationAdmin: true,
    }).populate("user");
    if (!devis) {
      return res.status(404).json({ message: "Devis not found" });
    }
    return res.status(200).json(devis);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const validateDevis = async (req, res) => {
  const { idUser } = req.headers;
  try {
    const utilisateur = await User.findOne({
      idFirebase: idUser,
    });
    if (!utilisateur) throw new Error("Inexistant user");
    if (utilisateur.isAdmin) {
      const { id } = req.params;
      const devis = await Devis.findById(id);
      if (!devis) {
        return res.status(404).json({ message: "Devis not found" });
      }
      devis.validationAdmin = devis.validationAdmin ? false : true;

      if (!devis.validationAdmin) devis.statut = "refusé";
      else devis.statut = "en attente";

      devis.save();
      return res.status(200).json({ message: "Action effectuée" });
    } else {
      return res.status(403).json({ message: "Non autorisé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const chooseDevis = async (req, res) => {
  const { idUser } = req.headers;
  try {
    const utilisateur = await User.findOne({
      idFirebase: idUser,
    });
    if (!utilisateur) throw new Error("Inexistant user");

    const { id } = req.params;
    const devis = await Devis.findById(id);
    if (!devis) {
      return res.status(404).json({ message: "Devis not found" });
    }

    const demande = await Demande.findById(devis.idDemande);
    if (!demande) throw new Error("Inexistant user");

    if (idUser === demande.idUser) {
      const allDevis = await Devis.find({ idDemande: demande._id });
      allDevis.map((devi) => {
        devi.statut = "refusé";
        devi.save();
      });
      devis.statut = "accepté";
      devis.save();

      demande.idDevis = devis._id;
      demande.save();

      return res.status(200).json({ message: "Action effectuée" });
    } else {
      return res.status(403).json({ message: "Non autorisé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un devis
export const updateDevis = async (req, res) => {
  const { id } = req.params;
  const { idDemande, idTransitaire, cout, delai, services, statut } = req.body;

  try {
    const updatedDevis = await Devis.findByIdAndUpdate(
      id,
      { idDemande, idTransitaire, cout, delai, services, statut },
      { new: true }
    );

    if (!updatedDevis) {
      return res.status(404).json({ message: "Devis not found" });
    }

    res.status(200).json(updatedDevis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un devis
export const deleteDevis = async (req, res) => {
  try {
    const deletedDevis = await Devis.findByIdAndDelete(req.params.id);
    if (!deletedDevis) {
      return res.status(404).json({ message: "Devis not found" });
    }
    res.status(200).json({ message: "Devis deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
