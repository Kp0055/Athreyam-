import { Request, Response } from "express";
import UserModule from "../../models/User/user";

const searchUsers = async (req: Request, res: Response) => {
  try {
    const { term } = req.query;

    if (!term) {
      res.status(400).json({ message: "Search term is required" });
      return;
    }

    const regex = new RegExp(term as string, "i");

    const users = await UserModule.find({
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex }
      ]
    }).select("firstName lastName _id image email");

    const results = users.map(user => ({
      _id: user._id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
      avatar: (user as any).image || "",
      type: 'user'
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default searchUsers;
