import Assurance from "../models/Assurance.js";
import AssuranceDemande from "../models/AssuranceDemande.js";
import AssuranceOffre from "../models/AssuranceOffre.js";
import InfosClient from "../models/InfosClient.js";
import User from "../models/User.js";

const createAssurance = async (req, res) => {
  try {
    const nouvelleAssurance = new Assurance(req.body);
    const assuranceEnregistree = await nouvelleAssurance.save();
    res.status(201).json(assuranceEnregistree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAssurances = async (req, res) => {
  try {
    const assurances = await Assurance.find();
    res.status(200).json(assurances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssuranceById = async (req, res) => {
  try {
    const assurance = await Assurance.findById(req.params.id);
    if (!assurance) {
      return res.status(404).json({ message: "Assurance non trouvée" });
    }
    res.status(200).json(assurance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssuranceOfferOrRequest = async (req, res) => {
  try {
    const user = await User.findOne({ idFirebase: req.params.idUser });
    if (!user) throw new Error({ message: "Utilisateur inexistant" });

    if (user.isAdmin) {
      return res.redirect("/assurances/request");
    }

    const infosClient = await InfosClient.findOne({
      idUser: req.params.idUser,
    });

    if (!infosClient) {
      return res.status(428).json({
        needsVehicleInfos: true,
        message: "Informations du véhicules requises",
      });
    }

    const demande = await AssuranceDemande.findOne({
      idUser: req.params.idUser,
    });
    if (!demande) throw new Error("Erreur de demande d'assurance");

    const offresAssurance = await AssuranceOffre.find({
      assuranceDemandeId: demande._id,
    });

    res.status(200).json(offresAssurance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAssuranceDemandes = async (req, res) => {
  try {
    const demandesAssurances = await AssuranceDemande.find().populate(
      "idInfosClient"
    );
    console.log("AAAA");
    res.status(200).json(demandesAssurances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAssuranceOffer = async (req, res) => {
  const {
    assuranceDemandeId,
    compagnie,
    typeCouverture,
    optionsPaiement,
    description,
  } = req.body;
  try {
    // Vérifier si la demande existe
    const demande = await AssuranceDemande.findById(assuranceDemandeId);
    if (!demande) {
      return res
        .status(404)
        .json({ message: "Demande d'assurance inexistante, champion" });
    }

    const newOffer = new AssuranceOffre({
      assuranceDemandeId,
      compagnie,
      typeCouverture,
      optionsPaiement,
      description,
      adminId: req.headers.idUser,
    });

    const savedOffer = await newOffer.save();

    demande.status = "proposé";
    await demande.save();

    return res.status(201).json(savedOffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateAssurance = async (req, res) => {
  try {
    const assurance = await Assurance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!assurance) {
      return res.status(404).json({ message: "Assurance non trouvée" });
    }
    res.status(200).json(assurance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAssurance = async (req, res) => {
  try {
    const assurance = await Assurance.findByIdAndDelete(req.params.id);
    if (!assurance) {
      return res.status(404).json({ message: "Assurance non trouvée" });
    }
    res.status(200).json({ message: "Assurance supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createAssurance,
  getAssurances,
  getAssuranceById,
  updateAssurance,
  deleteAssurance,
  getAssuranceOfferOrRequest,
  getAssuranceDemandes,
  createAssuranceOffer,
};
