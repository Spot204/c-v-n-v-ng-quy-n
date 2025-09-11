import mongoose from "mongoose";

const personDateSchema = new mongoose.Schema({
    idperson: { type: String, required: true, unique: true },
    thunhap: { type: String, required: true },
    chitieu: { type: String, required: true },
    tietkiem: { type: String, required: true },
    giaitri: { type: String, required: true },
    ngu: { type: String, required: true },
    taptheduc: { type: String, required: true },
    stress: { type: String, required: true },
    sk: { type: String, required: true },
    hoctap: { type: String, required: true },
    hdxahoi: { type: String, required: true },
    lamviec: { type: String, required: true },
    tgranh: { type: String, required: true }
});

const PersonData = mongoose.model("PersonData", personDateSchema);

export default PersonData;