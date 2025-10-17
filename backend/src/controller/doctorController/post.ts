import { Request, Response } from "express";
import Post from "../../models/Doctor/Post";
import Doctor from "../../models/Doctor/Doctor";



const createPost = async (req: any, res: any) => {
  try {
    const { content } = req.body;
    const doctorId = req.user?.id;

    const fetchDocName = await Doctor.findOne({_id:doctorId});

    
  
    

    if (!content && !req.file) {
      return res.status(400).json({ message: "Post content or image required." });
    }

    const newPost = new Post({
      doctorId,
      docName:fetchDocName?.firstName,
      content,
      image: req.file ? `${req.file.filename}` : '',
      likes: [],
    });

    await newPost.save();

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// Export both functions (named exports)
export { createPost, getPosts };
