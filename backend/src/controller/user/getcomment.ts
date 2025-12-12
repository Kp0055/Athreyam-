import Post from "../../models/Doctor/Post";


const getComment = async (req: any, res: any) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Return only the comments array
    return res.status(200).json({ comments: post.comments });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getComment;
