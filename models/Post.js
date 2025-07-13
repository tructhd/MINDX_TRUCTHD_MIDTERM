import mongoose from "mongoose"


const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
    
});

export default mongoose.model('Post', postSchema);


