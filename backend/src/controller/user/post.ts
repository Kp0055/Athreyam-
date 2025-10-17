import Post from "../../models/Doctor/Post";

const allPost = async (req: any, res: any) => {
  try {
    const fetchallpost = await Post.find({});

    if (!fetchallpost) {
      res.status(400).json({ message: "fetching failed" });
    } else {
      res.status(200).json(fetchallpost);
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export default allPost;
