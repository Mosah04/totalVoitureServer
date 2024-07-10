import Annonce from "../models/Annonce.js";
import path, { dirname } from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import User from "../models/User.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Fonction pour supprimer un fichier
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Erreur lors de la suppression du fichier: ${err}`);
      return;
    }
    console.log(`Fichier supprimé: ${filePath}`);
  });
};

// Créer une nouvelle annonce
const createAnnonce = async (req, res) => {
  try {
    const { idUser } = req.headers;
    const {
      prixVehicule,
      anneeVehicule: annee,
      marqueVehicule: marque,
      modeleVehicule: modele,
      placesVehicule: places,
      transmissionVehicule: transmission,
      description,
      photos,
      TVM,
      carteGrise,
      contratAssurance,
      visiteTechnique,
    } = req.body;
    const regularisation = Object.keys(req.body).includes("regularisation");
    console.log("BBB", req.body);
    // Vérifier si les champs requis sont fournis
    if (
      !idUser ||
      !prixVehicule ||
      !description ||
      !photos ||
      !transmission ||
      !TVM ||
      !modele
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const nouvelleAnnonce = new Annonce({
      idUser,
      detailsVehicule: {
        annee,
        marque,
        modele,
        transmission,
        places,
        photos,
        pieces: {
          TVM,
          carteGrise,
          contratAssurance,
          visiteTechnique,
        },
      },
      prixVehicule,
      regularisation,
      description,
    });
    const annonceEnregistree = await nouvelleAnnonce.save();
    return res.status(201).json(annonceEnregistree);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les annonces
const getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une annonce par ID
const getAnnonceById = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id).populate("user");
    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    return res.status(200).json(annonce);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAnnoncesByUserId = async (req, res) => {
  try {
    const utilisateur = await User.findOne({
      idFirebase: req.params.idUser,
    });
    if (!utilisateur) throw new Error("Inexistant user");
    if (utilisateur.isAdmin) return res.redirect("/annonces");

    const annonces = await Annonce.find({ idUser: req.params.idUser });
    if (!annonces) {
      return res.status(404).json({ message: "Aucune annonce trouvée" });
    }
    return res.status(200).json(annonces);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une annonce
const updateAnnonce = async (req, res) => {
  try {
    const { idUser } = req.headers;
    const {
      prixVehicule,
      anneeVehicule: annee,
      marqueVehicule: marque,
      modeleVehicule: modele,
      placesVehicule: places,
      transmissionVehicule: transmission,
      description,
      photos,
    } = req.body;
    const regularisation = Object.keys(req.body).includes("regularisation");

    // Vérifier si les champs requis sont fournis
    console.log("REQUEST", req.body);
    console.log("FILES", req.files);
    console.log("FILE", req.file);
    if (
      !idUser ||
      !prixVehicule ||
      !description ||
      !photos ||
      !transmission ||
      !modele
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }
    const annonceOld = await Annonce.findById(req.params.id);
    if (!annonceOld) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    annonceOld.prixVehicule = prixVehicule;
    annonceOld.detailsVehicule.marque = marque;
    annonceOld.detailsVehicule.annee = annee;
    annonceOld.detailsVehicule.modele = modele;
    annonceOld.detailsVehicule.places = places;
    annonceOld.detailsVehicule.transmission = transmission;
    annonceOld.description = description;
    annonceOld.regularisation = regularisation;
    annonceOld.detailsVehicule.photos = annonceOld.detailsVehicule.photos.map(
      (photo, index) => {
        if (photos[index]) {
          const filePath = path.join(
            __dirname,
            "..",
            "uploads/photosVoitures",
            photo
          );
          deleteFile(filePath);
          return photos[index];
        }
        return photo;
      }
    );
    for (const [pathEnd, files] of Object.entries(
      annonceOld.detailsVehicule.pieces
    )) {
      if (req.body[pathEnd].length > 0) {
        for (const file of files) {
          const filePath = path.join(
            __dirname,
            "..",
            `uploads/${pathEnd}`,
            file
          );
          deleteFile(filePath);
        }
        annonceOld.detailsVehicule.pieces[pathEnd] = req.body[pathEnd];
      }
    }
    annonceOld.save();
    return res.status(200).json(annonceOld);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

// Supprimer une annonce
const deleteAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);
    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    annonce.detailsVehicule.photos.forEach((file) => {
      const filePath = path.join(
        __dirname,
        "..",
        "uploads/photosVoitures",
        file
      ); // Ajustez le chemin selon votre structure de projet
      deleteFile(filePath);
    });
    if (annonce.regularisation) {
      for (const [pathEnd, files] of Object.entries(
        annonce.detailsVehicule.pieces
      )) {
        for (const file of files) {
          const filePath = path.join(
            __dirname,
            "..",
            `uploads/${pathEnd}`,
            file
          );
          deleteFile(filePath);
        }
      }
    }
    await Annonce.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const validateAnnonce = async (req, res) => {
  const { idUser } = req.headers;
  try {
    const utilisateur = await User.findOne({
      idFirebase: idUser,
    });
    if (!utilisateur) throw new Error("Inexistant user");
    if (utilisateur.isAdmin) {
      const { id } = req.params;
      const annonce = await Annonce.findById(id);
      if (!annonce) {
        return res.status(404).json({ message: "Annonce not found" });
      }
      annonce.validationAdmin = !annonce.validationAdmin;

      annonce.save();
      return res.status(200).json({ message: "Action effectuée" });
    } else {
      return res.status(403).json({ message: "Non autorisé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  getAnnoncesByUserId,
  updateAnnonce,
  deleteAnnonce,
  validateAnnonce,
};
