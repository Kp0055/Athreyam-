import Post from "../../models/Doctor/Post";

const postLike = async (req: any, res: any) => {
  const postId = req.params.postId;
  const docId = (req as any).user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const hasLiked = post.likes.includes(docId);

    if (hasLiked) {
      post.likes = post.likes.filter((id: any) => id.toString() !== docId);
    } else {
      post.likes.push(docId);
    }

    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Like/unlike error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default postLike;
