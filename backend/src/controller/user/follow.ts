import user from "../../models/User/user";

const followingData = async(req:any, res:any)=>{

      try {
   const userId = (req as any).user?.id;  // Assuming user ID from auth middleware
    const doctorId = req.params.doctorId;

    if (userId.toString() === doctorId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const users = await user.findById(userId);
    if (!users) return res.status(404).json({ message: "User not found" });

    const isFollowing = users.following.includes(doctorId);

    if (isFollowing) {
      // Unfollow
      users.following = users.following.filter((id) => id.toString() !== doctorId);
    } else {
      // Follow
      users.following.push(doctorId);
    }

    await users.save();

    res.json({ following: users.following });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }


}

export default followingData;
