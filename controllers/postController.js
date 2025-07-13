import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
    const {userId, content} = req.body;
    if (!userId || !content)
        return res.status(400).json({message: "Missing userId"});


    const post = await Post.create({ userId: req.user.id, userId, content });    
    await post.save();
    res.status(201).json(post);
};



export const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post record not found' });
    if (!post.userId.equals(req.user.id)) return res.status(403).json({ message: 'Not your post' });


    post.content = req.body.content || post.content;
    post.updatedAt = new Date();
    await post.save();


    res.json(post);
 
}