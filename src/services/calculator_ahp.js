import axios from "axios";

export const calculatorAHP = async(data) =>{
    return await axios.post("http://localhost:3000/api/calculator-ahp")
}