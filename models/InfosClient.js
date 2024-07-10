import mongoose from "mongoose";

const { Schema, model } = mongoose;

const infosClientSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    carteGriseVoiture: {
      type: String,
      required: true,
    },
    carteIdentite: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("InfosClient", infosClientSchema);
