import mongoose from "mongoose";

const { Schema, model } = mongoose;

const optionPaiementSchema = new Schema({
  dureeMois: { type: Number, required: true },
  prime: { type: Number, required: true },
});

const offreAssuranceSchema = new Schema(
  {
    assuranceDemandeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssuranceDemande",
      required: true,
    },
    adminId: {
      type: String,
      required: true,
      ref: "User",
    },
    compagnie: {
      type: String,
      required: true,
    },
    typeCouverture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    optionsPaiement: {
      type: [optionPaiementSchema],
      required: true,
    },
    statut: {
      type: String,
      enum: ["non souscrit", "souscrit"],
      default: "non souscrit",
    },
  },
  { timestamps: true }
);

export default model("OffreAssurance", offreAssuranceSchema);
