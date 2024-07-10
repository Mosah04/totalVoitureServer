import mongoose from "mongoose";

const { Schema, model } = mongoose;

const service = new Schema({
  description: String,
  prix: Number,
  quantite: Number,
});

const devisSchema = new Schema(
  {
    idDemande: {
      type: Schema.Types.ObjectId,
      ref: "Demande", // Référence au modèle Demande
      required: true,
    },
    idTransitaire: {
      type: String,
      required: true,
      ref: "User",
    },
    cout: {
      type: Number,
      required: true,
    },
    delai: {
      type: Number,
      required: true,
    },
    services: {
      type: [service],
      required: true,
    },
    validationAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    statut: {
      type: String,
      enum: ["accepté", "en attente", "refusé"],
      default: "en attente",
    },
  },
  {
    timestamps: true, // Active la gestion automatique des timestamps
  }
);

devisSchema.virtual("user", {
  ref: "User",
  localField: "idTransitaire",
  foreignField: "idFirebase",
  justOne: true,
});

// Appliquer la transformation de la propriété virtuelle lors de l'appel à toJSON ou toObject
devisSchema.set("toJSON", { virtuals: true });
devisSchema.set("toObject", { virtuals: true });

export default model("Devis", devisSchema);
