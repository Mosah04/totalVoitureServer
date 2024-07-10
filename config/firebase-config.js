import admin from "firebase-admin";

import serviceAccount from "./serviceAccount.js";

// console.log("AAAAAAAAAAAAAAAAAAA", serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
