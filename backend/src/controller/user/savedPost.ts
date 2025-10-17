import Post from "../../models/Doctor/Post";


 const saveOrUnsavePost = async (req: any, res: any) => {
  const { postId } = req.params;
   const userId = (req as any).user?.id;// depending on your auth setup

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadySaved = post.savedBy.includes(userId);

    if (alreadySaved) {
      post.savedBy = post.savedBy.filter((id) => id.toString() !== userId);
      await post.save();
      return res.status(200).json({ message: "Post unsaved successfully" });
    } else {
      post.savedBy.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post saved successfully" });
    }
  } catch (error) {
    console.error("Save/Unsave error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default saveOrUnsavePost;

