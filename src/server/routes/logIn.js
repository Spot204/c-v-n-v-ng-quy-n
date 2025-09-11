import express from "express";
import bcrypt from "bcryptjs";
import Account from "../model/Account.js";

const router = express.Router();

router.post("/logIn", async (req, res) => {
  const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const user = await Account.find({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user[0].passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;