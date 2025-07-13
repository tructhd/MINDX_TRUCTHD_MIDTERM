import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: String,
    email: { type: String, unique: true },
    password: String,
    apiKey: String
    
});


export default mongoose.model('User', userSchema);
