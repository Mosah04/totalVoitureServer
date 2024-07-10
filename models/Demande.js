import mongoose from "mongoose";

const detailsVehiculeSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  annee: Number,
  chassis: String,
  etat: {
    // Spécifiez le statut ici
    type: String,
    enum: ["occasion", "neuf"],
    default: "occasion",
  },
});

const demandeSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      required: true,
      ref: "User",
    },
    detailsVehicule: {
      type: detailsVehiculeSchema,
      required: true,
    },
    paysDepart: {
      // Spécifiez la localisation actuelle ici
      type: String,
      required: true,
    },
    paysArrivee: {
      // Spécifiez la destination finale ici
      type: String,
      required: true,
    },
    message: {
      // Spécifiez la destination finale ici
      type: String,
      required: false,
    },
    statut: {
      // Spécifiez le statut ici
      type: String,
      enum: ["en attente", "rejeté", "traitement en cours", "finalisé"],
      default: "en attente",
    },
    idDevis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Devis",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

demandeSchema.virtual("user", {
  ref: "User",
  localField: "idUser",
  foreignField: "idFirebase",
  justOne: true,
});

// Appliquer la transformation de la propriété virtuelle lors de l'appel à toJSON ou toObject
demandeSchema.set("toJSON", { virtuals: true });
demandeSchema.set("toObject", { virtuals: true });

export default mongoose.model("Demande", demandeSchema);
