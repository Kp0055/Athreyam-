import Post from "../../models/Doctor/Post";
import User from "../../models/User/user";


const postComments = async (req: any, res: any) => {
  try {
    const { content } = req.body;
    const { selectedPostId } = req.params; // ✅ Correctly extract postId

    const userId = (req as any).user?.id; // ✅ Assumes you have auth middleware

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // ✅ Fetch the user to get the name
    const userDoc = await User.findById(userId);
    const username = userDoc?.firstName || "Anonymous";

    // ✅ Find the post
    const post = await Post.findById(selectedPostId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Build and push the comment
    const newComment = {
      content,
      username,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).json({ message: "Error posting comment" });
  }
};

export default postComments;
