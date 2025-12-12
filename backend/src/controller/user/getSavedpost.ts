import Post from "../../models/Doctor/Post"
// Fetch saved posts for the current user
const getSavedPosts = async (req: any, res: any) => {
  try {
  const userId = (req as any).user?.id; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find posts where `savedBy` includes this user
    const savedPosts = await Post.find({ savedBy: userId })
      .sort({ createdAt: -1 })  // newest first
      .select("doctorId docName content image createdAt")  // select what you need
      .lean();  // optional: gives plain JS objects

      console.log(savedPosts,' njjn eivde keri ')

    return res.status(200).json({ savedPosts });
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getSavedPosts;
