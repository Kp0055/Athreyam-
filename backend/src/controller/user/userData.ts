 import user from "../../models/User/user"; 
 
 const getProfileDetails = async (req:any, res: any) => {
    try {
      const userData = await user.findById(req.user!.id);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };

  export  default getProfileDetails;
