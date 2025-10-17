import Post from "../../models/Doctor/Post";
import Doctor from '../../models/Doctor/Doctor'

// ✅ Get all posts by a specific doctor
export const getDoctorPosts = async (req:any, res:any) => {
  try {
    const { doctorId } = req.params;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Find all posts from that doctor, sorted by latest first
    const posts = await Post.find({ doctorId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching doctor posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};
