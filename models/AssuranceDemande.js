import mongoose from "mongoose";

const { Schema, model } = mongoose;

const assuranceDemandeSchema = new Schema(
  {
    idUser: {
      type: String,
      ref: "User",
      required: true,
    },
    idInfosClient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "InfosClient",
    },
    status: {
      type: String,
      enum: ["en attente", "proposé"],
      default: "en attente",
    },
  },
  {
    timestamps: true,
  }
);

export default model("AssuranceDemande", assuranceDemandeSchema);
