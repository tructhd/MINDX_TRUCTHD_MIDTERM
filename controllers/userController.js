import bcrypt from 'bcrypt'
import crypto from 'crypto';
import User from '../models/User.js';


export const register = async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password)
        return res.status(400).json({ message: 'Missing fields' });


    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, password: hashedPassword });


    res.status(201).json(user);
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password' });


    const randomString = crypto.randomUUID();
    user.apiKey = randomString;
    await user.save();


    const apiKey = `mern-$${user.id}$-$${user.email}$-$${randomString}$`;
    res.json({ apiKey });
};


