import Doctor from "../../models/Doctor/Doctor";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const doctorLogin = async (req: any, res: any) => {
  const { email, password } = req.body;
 
  try {
    if (!email || !password) {
      return  res.status(404).json({ message: "username or password notfound" });
    }
    const response = await Doctor.findOne({ email: email });

    if (!response || !response.password) {
      return res.status(404).json({ message: "username not found" });
    }

    const verifiedPassword = await bcrypt.compare(password, response.password);

    if (!verifiedPassword) {
      return  res.status(404).json({ message: "password incorrect" });
    }

    const jwtSecert = process.env.JWT_SECRET as string;

    const token = jwt.sign(
      {
        id: response.id,
        email: response.email,
        role:response.role
      },
      jwtSecert,
      { expiresIn: "1d" }
    );


    res.cookie("token", token, {
      httponly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or "strict" depending on use case
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

   return res.status(200).json({ message: "loggin sucessful" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export default doctorLogin;
