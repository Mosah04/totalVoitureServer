import mongoose from "mongoose";

const { Schema, model } = mongoose;

const detailsVehiculeSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  annee: Number,
  places: Number,
  transmission: String,
  photos: [String],
  pieces: {
    carteGrise: [String],
    visiteTechnique: [String],
    TVM: [String],
    contratAssurance: [String],
  },
});

const annonceSchema = new Schema(
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
    prixVehicule: {
      type: Number,
      required: true,
    },
    regularisation: {
      type: Boolean,
      required: true,
    },
    datePublication: {
      type: Date,
      required: false,
    },
    validationAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

annonceSchema.virtual("user", {
  ref: "User",
  localField: "idUser",
  foreignField: "idFirebase",
  justOne: true,
});

// Appliquer la transformation de la propriété virtuelle lors de l'appel à toJSON ou toObject
annonceSchema.set("toJSON", { virtuals: true });
annonceSchema.set("toObject", { virtuals: true });

export default model("Annonce", annonceSchema);
