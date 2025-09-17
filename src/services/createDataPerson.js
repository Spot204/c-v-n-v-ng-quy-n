import axios from "axios";

export const createDataPerson = async(data) => {
    return await axios.post("http://localhost:3000/api/createDataPerson", data);
}
export const checkPerson = async(data)=>{
    return await axios.get(`http://localhost:3000/api/${data}`);
}