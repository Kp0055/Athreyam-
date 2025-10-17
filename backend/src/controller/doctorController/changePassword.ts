import bcrypt from "bcryptjs";
import Doctor from "../../models/Doctor/Doctor";

const changePassword = async (req: any, res: any) => {
  try {
    const doctorId = (req as any).user.id; // You can type `req.user` properly if using a custom middleware
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(confirmPassword, 10);

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default changePassword;
