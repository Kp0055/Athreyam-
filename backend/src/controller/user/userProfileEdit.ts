import user from "../../models/User/user";

const  profileEdit = async(req:any,res:any) =>{

    const { firstName, lastName, email, userName, gender, dob } = req.body;

    console.log(firstName, lastName, email, userName, gender,' edit cheyan vannu ')

      try {
    const updatedUser = await user.findByIdAndUpdate(
      req.user.id, // from auth middleware
      { firstName, lastName, email, userName, gender, dob },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error while updating profile" });
  }


}





export default profileEdit