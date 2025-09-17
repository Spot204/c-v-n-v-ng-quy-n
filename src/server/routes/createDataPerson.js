import express from "express";
import PersonData from "../model/PersonData.js";

const router = express.Router();

router.post("/createDataPerson", async (req, res) => {
  const {
    idperson,
    thunhap,
    chitieu,
    tietkiem,
    giaitri,
    ngu,
    taptheduc,
    stress,
    sk,
    hoctap,
    hdxahoi,
    lamviec,
    tgranh,
  } = req.body;
  try {
    const newPersonData = new PersonData({
      idperson,
      thunhap,
      chitieu,
      tietkiem,
      giaitri,
      ngu,
      taptheduc,
      stress,
      sk,
      hoctap,
      hdxahoi,
      lamviec,
      tgranh,
    });
    await newPersonData.save();
    res.status(201).json({ message: "Register successful" });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:idperson", async (req, res) => {
  const { idperson } = req.params;
  try {
    const existing = await PersonData.findOne({ idperson });
    if (existing) {
      res.status(200).json({ exists: true ,
        data: existing
      });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking person:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
