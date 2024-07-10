import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reclamationSchema = new Schema(
  {
    idClient: {
      type: String,
      required: true,
    },
    detailsAccident: {
      // Spécifiez les détails de l'accident ici
      type: String,
      required: true,
    },
    photos: [
      {
        // Spécifiez les photos de l'accident ici (tableau de chaînes)
        type: String,
        required: true,
      },
    ],
    constatPolice: {
      // Spécifiez le constat de police ici
      type: String,
    },
    statut: {
      // Spécifiez le statut de la réclamation ici
      type: String,
      enum: ["en attente", "rejetée", "validée"],
      default: "en attente",
      required: true,
    },
    traitementAssurance: {
      // Spécifiez le traitement de la réclamation ici
      enum: ["en cours", "rejetée", "finalisé"],
      default: "en cours",
      required: true,
      type: String,
    },
  },
  {
    timestamps: true, // Active la gestion automatique des timestamps
  }
);

export default model("Reclamation", reclamationSchema);
