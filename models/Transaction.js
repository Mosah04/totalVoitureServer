import mongoose from "mongoose";

const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    typeTransaction: {
      type: String,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
    montant: {
      type: Number,
      required: true,
    },
    statut: {
      type: String,
      enum: ["en cours", "finalisée"],
      default: "en cours",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Transaction", transactionSchema);
