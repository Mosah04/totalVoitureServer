import mongoose from "mongoose";

const { Schema, model } = mongoose;

const assuranceSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
      ref: "User",
    },
    idOffre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssuranceOffre",
      required: true,
    },
    idOptionPaiement: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    typeCouverture: {
      type: String,
      required: true,
    },
    dateDebut: {
      type: Date,
      required: true,
    },
    dateExpiration: {
      type: Date,
      required: true,
    },
    statut: {
      type: String,
      enum: ["valide", "expiré"],
      default: "valide",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Assurance", assuranceSchema);
