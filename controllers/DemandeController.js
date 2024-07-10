import Demande from "../models/Demande.js";

const createDemande = async (req, res) => {
  try {
    const { idUser } = req.headers;
    const {
      detailsVehicule: { marque, modele, annee, etat, chassis },
      paysDepart,
      paysArrivee,
      message,
    } = req.body;
    const nouvelleDemande = new Demande({
      idUser,
      detailsVehicule: { marque, modele, annee, etat, chassis },
      paysDepart,
      paysArrivee,
      message,
    });
    const demandeEnregistree = await nouvelleDemande.save();
    res.status(201).json(demandeEnregistree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDemandes = async (req, res) => {
  try {
    const demandes = await Demande.find();
    res.status(200).json(demandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandeById = async (req, res) => {
  try {
    const demande = await Demande.findById(req.params.id).populate("user");
    if (!demande) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }
    res.status(200).json(demande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandeByUserId = async (req, res) => {
  try {
    const demande = await Demande.find({ idUser: req.params.idUser });
    if (!demande) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }
    res.status(200).json(demande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDemande = async (req, res) => {
  try {
    const {
      detailsVehicule: { marque, modele, annee, etat, chassis },
      paysDepart,
      paysArrivee,
      message,
    } = req.body;
    const demande = await Demande.findByIdAndUpdate(
      req.params.id,
      {
        detailsVehicule: { marque, modele, annee, etat, chassis },
        paysDepart,
        paysArrivee,
        message,
      },
      {
        new: true,
      }
    );
    if (!demande) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }
    res.status(200).json(demande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDemande = async (req, res) => {
  try {
    const demande = await Demande.findByIdAndDelete(req.params.id);
    if (!demande) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }
    res.status(200).json({ message: "Demande supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createDemande,
  getDemandes,
  getDemandeById,
  getDemandeByUserId,
  updateDemande,
  deleteDemande,
};
