import express from 'express';
import axios from 'axios';

const router =  express.Router();

router.post('/calculator-ahp', async (req, res)=>{
    try{
        const inputData = req.body;

        const reponse = await axios.post('http://localhost:5000/api/ahp', inputData);

        res.json(reponse.data);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

export default router;