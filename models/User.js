import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  idFirebase: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenoms: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rolesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  telephone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

userSchema.virtual("roles", {
  ref: "Role",
  localField: "rolesId",
  foreignField: "_id",
  justOne: false,
  options: { select: "nom" },
});

// Appliquer la transformation de la propriété virtuelle lors de l'appel à toJSON ou toObject
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export default model("User", userSchema);
