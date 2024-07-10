import AssuranceDemande from "../models/AssuranceDemande.js";
import InfosClient from "../models/InfosClient.js";

const createInfosClient = async (req, res) => {
  try {
    const { idUser } = req.headers;
    const { carteGrise: carteGriseVoiture, carteIdentite } = req.body;

    const infosClient = new InfosClient({
      idUser,
      carteGriseVoiture,
      carteIdentite,
    });
    const infosClientEnregistree = await infosClient.save();

    const demande = new AssuranceDemande({
      idUser,
      idInfosClient: infosClientEnregistree._id,
    });
    demande.save();

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { createInfosClient };
