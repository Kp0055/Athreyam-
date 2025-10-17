import user from "../../models/User/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const profileUserData = await user.findOne({ email: trimmedEmail });

    if (!profileUserData) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!profileUserData.password) {
      return res.status(400).json({ message: "User has no password set" });
    }

    const isPasswordValid = await bcrypt.compare(password, profileUserData.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const tokenGenerate = jwt.sign(
      { id: profileUserData._id ,
        email:profileUserData.email,
        role: profileUserData.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // ✅ Send cookie and response in a single chain
    return res
      .cookie("token", tokenGenerate, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(200)
      .json({
        message: "Login successful",
        user: profileUserData,
        token: tokenGenerate,
        role:profileUserData.role
      });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default loginUser;
